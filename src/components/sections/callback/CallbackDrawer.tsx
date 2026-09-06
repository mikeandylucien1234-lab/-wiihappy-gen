import { Button, Input, Label } from '@/components/ui'
import { useCallbackForm } from '@/features/callback/CallbackFormContext'
import { useLocale } from '@/i18n/LocaleContext'
import { cn } from '@/lib/cn'

function SuccessScreen() {
  const { form, startNewRequest, closeDrawer } = useCallbackForm()
  const { t } = useLocale()
  const s = t.callback.success

  function handleBackHome() {
    closeDrawer()
    startNewRequest()
  }

  return (
    <div className="flex flex-col items-center px-2 pb-6 pt-4 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-fab shadow-fab">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h3 className="mb-2 text-xl font-extrabold text-ink">{s.title}</h3>
      <p className="mb-8 max-w-[320px] text-sm leading-[1.6] text-slate">{s.body(form.nomComplet)}</p>

      <Button variant="outline" onClick={handleBackHome} className="w-full max-w-[320px]">
        {s.backHome}
      </Button>
    </div>
  )
}

export function CallbackDrawer() {
  const { drawerOpen, closeDrawer, form, setField, formError, isSubmitting, isSubmitError, submitErrorMessage, submitted, submit } =
    useCallbackForm()
  const { t } = useLocale()
  const c = t.callback

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
            <h2 className="text-2xl font-extrabold tracking-[-0.5px] text-ink">{c.header.title}</h2>
            {!submitted && <p className="mt-1 text-[15px] text-slate">{c.header.subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label={c.header.close}
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
              <div className="flex flex-col gap-[18px]">
                <div>
                  <Label>{c.fields.name}</Label>
                  <Input value={form.nomComplet} onChange={(e) => setField('nomComplet', e.target.value)} placeholder={c.fields.namePlaceholder} />
                </div>
                <div>
                  <Label>{c.fields.whatsapp}</Label>
                  <Input value={form.whatsapp} onChange={(e) => setField('whatsapp', e.target.value)} placeholder={c.fields.whatsappPlaceholder} />
                </div>
                <div>
                  <Label>{c.fields.email}</Label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => setField('email', e.target.value)}
                    placeholder={c.fields.emailPlaceholder}
                  />
                </div>
              </div>

              {formError && (
                <p className="mt-4 rounded-md bg-danger/[0.08] px-3 py-2.5 text-sm font-semibold text-danger">{formError}</p>
              )}
              {isSubmitError && (
                <p className="mt-4 rounded-md bg-danger/[0.08] px-3 py-2.5 text-sm font-semibold text-danger">{submitErrorMessage}</p>
              )}

              <Button type="button" variant="accent" onClick={submit} disabled={isSubmitting} className="mt-8 w-full">
                {isSubmitting ? c.sending : c.submit} {!isSubmitting && <span>→</span>}
              </Button>
            </>
          )}
        </div>
      </section>
    </>
  )
}
