import { Button } from '@/components/ui'
import { STEP_COUNT } from '@/features/quote-form/types'
import { useQuoteForm } from '@/features/quote-form/QuoteFormContext'
import { useLocale } from '@/i18n/LocaleContext'
import { cn } from '@/lib/cn'
import { StepContact } from './quote-drawer/StepContact'
import { StepDelivery } from './quote-drawer/StepDelivery'
import { StepDetails } from './quote-drawer/StepDetails'
import { StepIndicator } from './quote-drawer/StepIndicator'
import { StepOperationType } from './quote-drawer/StepOperationType'
import { StepSummary } from './quote-drawer/StepSummary'

const stepComponents = [StepOperationType, StepContact, StepDetails, StepDelivery, StepSummary]

export function QuoteDrawer() {
  const { drawerOpen, closeDrawer, step, stepError, goNext, goBack, submitted, startNewRequest } = useQuoteForm()
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
            <h2 className="text-2xl font-extrabold tracking-[-0.5px] text-ink">
              {submitted ? t.quoteDrawer.titleSubmitted : t.quoteDrawer.titleDefault}
            </h2>
            {!submitted && <p className="mt-1 text-[15px] text-slate">{t.quoteDrawer.subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label={t.quoteDrawer.close}
            className="flex h-9 w-9 flex-none items-center justify-center rounded-full border-[1.5px] border-navy/15 bg-white text-base font-bold text-ink"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 pb-9">
          {submitted ? (
            <div className="rounded-xl bg-gradient-primary-diag p-11 text-center text-white">
              <div className="mb-3 text-4xl">✓</div>
              <h3 className="mb-2 text-xl font-extrabold">{t.quoteDrawer.confirmationTitle}</h3>
              <p className="mb-6 text-white/85">{t.quoteDrawer.confirmationBody}</p>
              <button
                type="button"
                onClick={startNewRequest}
                className="rounded-pill border-[1.5px] border-white/40 px-5 py-2.5 text-sm font-bold text-white"
              >
                {t.quoteDrawer.newRequest}
              </button>
            </div>
          ) : (
            <>
              <StepIndicator step={step} />
              <StepComponent />

              {stepError && (
                <p className="mt-4 rounded-md bg-danger/[0.08] px-3 py-2.5 text-sm font-semibold text-danger">
                  {stepError}
                </p>
              )}

              {step < STEP_COUNT && (
                <div className="mt-8 flex gap-3">
                  {step > 1 && (
                    <Button type="button" variant="ghost" onClick={goBack} className="flex-1">
                      {t.quoteDrawer.previous}
                    </Button>
                  )}
                  <Button type="button" variant="accent" onClick={goNext} className="flex-1">
                    {t.quoteDrawer.next} <span>→</span>
                  </Button>
                </div>
              )}
              {step === STEP_COUNT && (
                <button
                  type="button"
                  onClick={goBack}
                  className="mt-6 text-sm font-bold text-ink"
                >
                  {t.quoteDrawer.previousShort}
                </button>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
