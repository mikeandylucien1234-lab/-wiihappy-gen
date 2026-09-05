import { Button, Card } from '@/components/ui'
import { useBookingForm } from '@/features/booking/BookingFormContext'
import { useLocale } from '@/i18n/LocaleContext'
import type { Locale } from '@/lib/database.types'

const BCP47: Record<Locale, string> = { fr: 'fr-FR', en: 'en-US', es: 'es-ES' }

function Row({ label, value }: { label: string; value: string }) {
  if (!value) return null
  return (
    <div className="flex justify-between gap-4 py-2.5 text-sm">
      <span className="text-slate">{label}</span>
      <span className="text-right font-semibold text-ink">{value}</span>
    </div>
  )
}

export function StepConfirm() {
  const { form, isSubmitting, isSubmitError, submitErrorMessage, submit, goToStep } = useBookingForm()
  const { locale, t } = useLocale()
  const s = t.booking.step3

  const dayLabel = form.date
    ? new Intl.DateTimeFormat(BCP47[locale], { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(
        new Date(`${form.date}T00:00:00`),
      )
    : ''

  return (
    <div>
      <h3 className="mb-1 text-lg font-extrabold text-ink">{s.title}</h3>
      <p className="mb-6 text-sm text-slate">{s.subtitle}</p>

      <Card radius="lg" padding="md" shadow="none" className="mb-4 border-[1.5px] border-navy/[0.08]">
        <div className="mb-4 flex items-center gap-3 border-b border-navy/[0.08] pb-4">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-md bg-gradient-primary-diag">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8">
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M8 3v4M16 3v4M3 10h18" />
            </svg>
          </div>
          <span className="text-[15px] font-extrabold capitalize text-ink">{dayLabel}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-md bg-gradient-accent-diag">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3.5 2" />
            </svg>
          </div>
          <span className="text-2xl font-extrabold text-ink">{form.time}</span>
        </div>
      </Card>

      <div className="divide-y divide-navy/[0.08] rounded-xl bg-surface px-4">
        <Row label={s.rowName} value={form.nomComplet} />
        <Row label={s.rowWhatsapp} value={form.whatsapp} />
        <Row label={s.rowEmail} value={form.email} />
        <Row label={s.rowMotif} value={form.motif} />
      </div>

      <button
        type="button"
        onClick={() => goToStep(1)}
        className="mt-4 text-xs font-bold text-primary underline-offset-2 hover:underline"
      >
        {s.editBooking}
      </button>

      {isSubmitError && (
        <p className="mt-4 rounded-md bg-danger/[0.08] px-3 py-2.5 text-sm font-semibold text-danger">
          {submitErrorMessage ?? s.genericError}
        </p>
      )}

      <Button
        type="button"
        variant="accent"
        size="lg"
        onClick={submit}
        disabled={isSubmitting}
        className="mt-6 w-full font-extrabold"
      >
        {isSubmitting ? (
          s.submitting
        ) : (
          <>
            {s.confirm} <span>→</span>
          </>
        )}
      </Button>
    </div>
  )
}
