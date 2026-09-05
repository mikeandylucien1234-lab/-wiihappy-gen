import { createContext, type ReactNode, useContext, useState } from 'react'
import { STEP_COUNT, initialBookingForm, type BookingFormData } from './types'
import { useSubmitReservation } from './useSubmitReservation'
import { validateBookingStep } from './validation'

interface BookingFormContextValue {
  drawerOpen: boolean
  step: number
  form: BookingFormData
  stepError: string | null
  isSubmitting: boolean
  isSubmitError: boolean
  submitErrorMessage: string | null
  submitted: boolean

  openDrawer: () => void
  closeDrawer: () => void
  setField: <K extends keyof BookingFormData>(key: K, value: BookingFormData[K]) => void
  selectDay: (date: string) => void
  selectSlot: (time: string) => void
  goNext: () => void
  goBack: () => void
  goToStep: (step: number) => void
  submit: () => void
  startNewBooking: () => void
}

const BookingFormContext = createContext<BookingFormContextValue | null>(null)

export function BookingFormProvider({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<BookingFormData>(initialBookingForm)
  const [stepError, setStepError] = useState<string | null>(null)

  const mutation = useSubmitReservation()

  function openDrawer() {
    setDrawerOpen(true)
  }

  function closeDrawer() {
    setDrawerOpen(false)
  }

  function setField<K extends keyof BookingFormData>(key: K, value: BookingFormData[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function selectDay(date: string) {
    setForm((f) => ({ ...f, date, time: null }))
  }

  function selectSlot(time: string) {
    setForm((f) => ({ ...f, time }))
  }

  function goNext() {
    const error = validateBookingStep(step, form)
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
    mutation.mutate(form)
  }

  function startNewBooking() {
    setForm(initialBookingForm)
    setStep(1)
    setStepError(null)
    mutation.reset()
  }

  return (
    <BookingFormContext.Provider
      value={{
        drawerOpen,
        step,
        form,
        stepError,
        isSubmitting: mutation.isPending,
        isSubmitError: mutation.isError,
        submitErrorMessage: mutation.error instanceof Error ? mutation.error.message : null,
        submitted: mutation.isSuccess,
        openDrawer,
        closeDrawer,
        setField,
        selectDay,
        selectSlot,
        goNext,
        goBack,
        goToStep,
        submit,
        startNewBooking,
      }}
    >
      {children}
    </BookingFormContext.Provider>
  )
}

export function useBookingForm() {
  const ctx = useContext(BookingFormContext)
  if (!ctx) throw new Error('useBookingForm must be used within a BookingFormProvider')
  return ctx
}
