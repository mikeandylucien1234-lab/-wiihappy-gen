import { createContext, type FormEvent, type ReactNode, useContext, useEffect, useState } from 'react'

export type OperationType = 'Import' | 'Export'
export type TransportType = 'Aérien' | 'Maritime'

export interface QuoteForm {
  name: string
  whatsapp: string
  email: string
  category: string
  description: string
  quantity: string
  budget: string
  country: string
}

const initialForm: QuoteForm = {
  name: '',
  whatsapp: '',
  email: '',
  category: 'Véhicules',
  description: '',
  quantity: '',
  budget: '',
  country: '',
}

interface QuoteDrawerContextValue {
  drawerOpen: boolean
  showTooltip: boolean
  showBadge: boolean
  form: QuoteForm
  opType: OperationType
  transport: TransportType
  submitted: boolean
  hasError: boolean
  openDrawer: () => void
  closeDrawer: () => void
  toggleDrawer: () => void
  openConsultation: () => void
  setField: <K extends keyof QuoteForm>(key: K, value: QuoteForm[K]) => void
  setOpType: (value: OperationType) => void
  setTransport: (value: TransportType) => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
}

const QuoteDrawerContext = createContext<QuoteDrawerContextValue | null>(null)

export function QuoteDrawerProvider({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [showBadge, setShowBadge] = useState(true)
  const [form, setForm] = useState<QuoteForm>(initialForm)
  const [opType, setOpType] = useState<OperationType>('Import')
  const [transport, setTransport] = useState<TransportType>('Maritime')
  const [submitted, setSubmitted] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 1400)
    return () => clearTimeout(timer)
  }, [])

  function openDrawer() {
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

  function openConsultation() {
    setDrawerOpen(true)
    setShowTooltip(false)
    setShowBadge(false)
    setForm((f) => ({ ...f, description: f.description || 'Consultation — ' }))
  }

  function setField<K extends keyof QuoteForm>(key: K, value: QuoteForm[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const ok = form.name.trim() && (form.whatsapp.trim() || form.email.trim()) && form.description.trim()
    if (!ok) {
      setHasError(true)
      return
    }
    setSubmitted(true)
    setHasError(false)
  }

  return (
    <QuoteDrawerContext.Provider
      value={{
        drawerOpen,
        showTooltip: showTooltip && !drawerOpen,
        showBadge: showBadge && !drawerOpen,
        form,
        opType,
        transport,
        submitted,
        hasError,
        openDrawer,
        closeDrawer,
        toggleDrawer,
        openConsultation,
        setField,
        setOpType,
        setTransport,
        handleSubmit,
      }}
    >
      {children}
    </QuoteDrawerContext.Provider>
  )
}

export function useQuoteDrawer() {
  const ctx = useContext(QuoteDrawerContext)
  if (!ctx) throw new Error('useQuoteDrawer must be used within a QuoteDrawerProvider')
  return ctx
}
