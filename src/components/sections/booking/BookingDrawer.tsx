import { useEffect, useState } from 'react'
import { Button } from '@/components/ui'
import { STEP_COUNT } from '@/features/booking/types'
import { useBookingForm } from '@/features/booking/BookingFormContext'
import { useLocale } from '@/i18n/LocaleContext'
import type { Locale } from '@/lib/database.types'
import { cn } from '@/lib/cn'
import { BookingStepIndicator } from './BookingStepIndicator'
import { StepContact } from './StepContact'
import { StepDateTime } from './StepDateTime'
import { StepConfirm } from './StepConfirm'

const BCP47: Record<Locale, string> = { fr: 'fr-FR', en: 'en-US', es: 'es-ES' }

const stepComponents = [StepDateTime, StepContact, StepConfirm]

function SuccessScreen() {
  const { form, startNewBooking, closeDrawer } = useBookingForm()
  const { locale, t } = useLocale()
  const s = t.booking.success
  const [popped, setPopped] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setPopped(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const dayLabel = form.date
    ? new Intl.DateTimeFormat(BCP47[locale], { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date(`${form.date}T00:00:00`))
    : ''

  function handleBackHome() {
    closeDrawer()
    startNewBooking()
  }

  return (
    <div className="flex flex-col items-center px-2 pb-6 pt-4 text-center">
      <div
        className={cn(
          'mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-fab shadow-fab transition-transform duration-500 ease-out',
          popped ? 'scale-100' : 'scale-0',
        )}
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h3 className="mb-2 text-xl font-extrabold text-ink">{s.title}</h3>
      <p className="mb-6 max-w-[320px] text-sm leading-[1.6] text-slate">{s.body(dayLabel, form.time ?? '')}</p>

      <div className="mb-8 w-full max-w-[320px] divide-y divide-navy/[0.08] rounded-xl bg-surface px-4 text-left">
        <div className="flex justify-between gap-4 py-2.5 text-sm">
          <span className="text-slate">{t.booking.step3.rowName}</span>
          <span className="text-right font-semibold text-ink">{form.nomComplet}</span>
        </div>
        <div className="flex justify-between gap-4 py-2.5 text-sm">
          <span className="capitalize text-slate">{dayLabel}</span>
          <span className="text-right font-extrabold text-ink">{form.time}</span>
        </div>
      </div>

      <Button variant="outline" onClick={handleBackHome} className="w-full max-w-[320px]">
        {s.backHome}
      </Button>
    </div>
  )
}

export function BookingDrawer() {
  const { drawerOpen, closeDrawer, step, stepError, goNext, goBack, submitted } = useBookingForm()
  const { t } = useLocale()

  const StepComponent = stepComponents[step - 1]

  return (
    <>
      <div
        onClick={closeDrawer}
        className={cn(
          'fixed inset-0 z-[150] bg-primary-dark/45 backdrop-blur-[2px] transition-opacity duration-300',
          drawerOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      <section
        className={cn(
          'fixed inset-0 z-[160] flex h-screen w-screen flex-col bg-white transition-transform duration-[350ms] ease-out',
          'sm:inset-y-0 sm:right-0 sm:left-auto sm:w-[min(480px,100vw)] sm:rounded-l-3xl sm:shadow-[-20px_0_50px_rgba(10,42,102,0.25)]',
          drawerOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex flex-none items-start justify-between px-8 pb-4 pt-9">
          <div>
            <h2 className="text-2xl font-extrabold tracking-[-0.5px] text-ink">{t.booking.header.title}</h2>
            {!submitted && <p className="mt-1 text-[15px] text-slate">{t.booking.header.subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label={t.booking.header.close}
            className="flex h-9 w-9 flex-none items-center justify-center rounded-full border-[1.5px] border-navy/15 bg-white text-base font-bold text-ink"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 pb-9">
          {submitted ? (
            <SuccessScreen />
          ) : (
            <>
              <BookingStepIndicator step={step} />
              <StepComponent />

              {stepError && (
                <p className="mt-4 rounded-md bg-danger/[0.08] px-3 py-2.5 text-sm font-semibold text-danger">{stepError}</p>
              )}

              {step < STEP_COUNT && (
                <div className="mt-8 flex gap-3">
                  {step > 1 && (
                    <Button type="button" variant="ghost" onClick={goBack} className="flex-1">
                      {t.booking.nav.previous}
                    </Button>
                  )}
                  <Button type="button" variant="accent" onClick={goNext} className="flex-1">
                    {t.booking.nav.next} <span>→</span>
                  </Button>
                </div>
              )}
              {step === STEP_COUNT && (
                <button type="button" onClick={goBack} className="mt-6 text-sm font-bold text-ink">
                  ← {t.booking.nav.previous}
                </button>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
