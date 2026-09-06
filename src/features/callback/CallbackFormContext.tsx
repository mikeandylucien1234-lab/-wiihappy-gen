import { createContext, type ReactNode, useContext, useState } from 'react'
import { initialCallbackForm, type CallbackFormData } from './types'
import { useSubmitCallback } from './useSubmitCallback'
import { validateCallbackForm } from './validation'

interface CallbackFormContextValue {
  drawerOpen: boolean
  form: CallbackFormData
  formError: string | null
  isSubmitting: boolean
  isSubmitError: boolean
  submitErrorMessage: string | null
  submitted: boolean

  openDrawer: () => void
  closeDrawer: () => void
  setField: <K extends keyof CallbackFormData>(key: K, value: CallbackFormData[K]) => void
  submit: () => void
  startNewRequest: () => void
}

const CallbackFormContext = createContext<CallbackFormContextValue | null>(null)

export function CallbackFormProvider({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [form, setForm] = useState<CallbackFormData>(initialCallbackForm)
  const [formError, setFormError] = useState<string | null>(null)

  const mutation = useSubmitCallback()

  function openDrawer() {
    setDrawerOpen(true)
  }

  function closeDrawer() {
    setDrawerOpen(false)
  }

  function setField<K extends keyof CallbackFormData>(key: K, value: CallbackFormData[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function submit() {
    const error = validateCallbackForm(form)
    if (error) {
      setFormError(error)
      return
    }
    setFormError(null)
    mutation.mutate(form)
  }

  function startNewRequest() {
    setForm(initialCallbackForm)
    setFormError(null)
    mutation.reset()
  }

  return (
    <CallbackFormContext.Provider
      value={{
        drawerOpen,
        form,
        formError,
        isSubmitting: mutation.isPending,
        isSubmitError: mutation.isError,
        submitErrorMessage: mutation.error instanceof Error ? mutation.error.message : null,
        submitted: mutation.isSuccess,
        openDrawer,
        closeDrawer,
        setField,
        submit,
        startNewRequest,
      }}
    >
      {children}
    </CallbackFormContext.Provider>
  )
}

export function useCallbackForm() {
  const ctx = useContext(CallbackFormContext)
  if (!ctx) throw new Error('useCallbackForm must be used within a CallbackFormProvider')
  return ctx
}
