import { createContext, type ReactNode, useContext, useEffect, useState } from 'react'
import { STEP_COUNT, initialQuoteForm, type QuoteFormData, type QuoteFormPrefill } from './types'
import { useSubmitQuote } from './useSubmitQuote'
import { validateStep } from './validation'

interface QuoteFormContextValue {
  drawerOpen: boolean
  showTooltip: boolean
  showBadge: boolean
  step: number
  form: QuoteFormData
  stepError: string | null
  isSubmitting: boolean
  isSubmitError: boolean
  submitErrorMessage: string | null
  submitted: boolean

  openDrawer: (prefill?: QuoteFormPrefill) => void
  closeDrawer: () => void
  toggleDrawer: () => void
  setField: <K extends keyof QuoteFormData>(key: K, value: QuoteFormData[K]) => void
  addAttachments: (files: File[]) => void
  removeAttachment: (index: number) => void
  goNext: () => void
  goBack: () => void
  goToStep: (step: number) => void
  submit: () => void
  startNewRequest: () => void
}

const QuoteFormContext = createContext<QuoteFormContextValue | null>(null)

export function QuoteFormProvider({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [showBadge, setShowBadge] = useState(true)
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<QuoteFormData>(initialQuoteForm)
  const [sourcePage, setSourcePage] = useState<string | undefined>(undefined)
  const [stepError, setStepError] = useState<string | null>(null)

  const mutation = useSubmitQuote()

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 1400)
    return () => clearTimeout(timer)
  }, [])

  function openDrawer(prefill?: QuoteFormPrefill) {
    if (prefill) {
      setForm((f) => ({
        ...f,
        opType: prefill.opType ?? f.opType,
        category: prefill.category ?? f.category,
        description: prefill.description ?? f.description,
      }))
      if (prefill.sourcePage) setSourcePage(prefill.sourcePage)
    }
    setDrawerOpen(true)
    setShowTooltip(false)
    setShowBadge(false)
  }

  function closeDrawer() {
    setDrawerOpen(false)
  }

  function toggleDrawer() {
    setDrawerOpen((open) => !open)
    setShowTooltip(false)
    setShowBadge(false)
  }

  function setField<K extends keyof QuoteFormData>(key: K, value: QuoteFormData[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function addAttachments(files: File[]) {
    setForm((f) => {
      const existingKeys = new Set(f.attachments.map((file) => `${file.name}-${file.size}`))
      const newFiles = files.filter((file) => !existingKeys.has(`${file.name}-${file.size}`))
      return { ...f, attachments: [...f.attachments, ...newFiles] }
    })
  }

  function removeAttachment(index: number) {
    setForm((f) => ({ ...f, attachments: f.attachments.filter((_, i) => i !== index) }))
  }

  function goNext() {
    const error = validateStep(step, form)
    if (error) {
      setStepError(error)
      return
    }
    setStepError(null)
    setStep((s) => Math.min(s + 1, STEP_COUNT))
  }

  function goBack() {
    setStepError(null)
    setStep((s) => Math.max(s - 1, 1))
  }

  function goToStep(target: number) {
    setStepError(null)
    setStep(Math.min(Math.max(target, 1), STEP_COUNT))
  }

  function submit() {
    mutation.mutate({ ...form, sourcePage })
  }

  function startNewRequest() {
    setForm(initialQuoteForm)
    setSourcePage(undefined)
    setStep(1)
    setStepError(null)
    mutation.reset()
  }

  return (
    <QuoteFormContext.Provider
      value={{
        drawerOpen,
        showTooltip: showTooltip && !drawerOpen,
        showBadge: showBadge && !drawerOpen,
        step,
        form,
        stepError,
        isSubmitting: mutation.isPending,
        isSubmitError: mutation.isError,
        submitErrorMessage: mutation.error instanceof Error ? mutation.error.message : null,
        submitted: mutation.isSuccess,
        openDrawer,
        closeDrawer,
        toggleDrawer,
        setField,
        addAttachments,
        removeAttachment,
        goNext,
        goBack,
        goToStep,
        submit,
        startNewRequest,
      }}
    >
      {children}
    </QuoteFormContext.Provider>
  )
}

export function useQuoteForm() {
  const ctx = useContext(QuoteFormContext)
  if (!ctx) throw new Error('useQuoteForm must be used within a QuoteFormProvider')
  return ctx
}
