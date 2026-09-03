import { Button } from '@/components/ui'
import { useQuoteForm } from '@/features/quote-form/QuoteFormContext'
import { useLocale } from '@/i18n/LocaleContext'

function Row({ label, value }: { label: string; value: string }) {
  if (!value) return null
  return (
    <div className="flex justify-between gap-4 py-2.5 text-sm">
      <span className="text-slate">{label}</span>
      <span className="text-right font-semibold text-ink">{value}</span>
    </div>
  )
}

export function StepSummary() {
  const { form, isSubmitting, isSubmitError, submitErrorMessage, submit, goToStep } = useQuoteForm()
  const { t } = useLocale()
  const s = t.quoteSteps.summary

  return (
    <div>
      <h3 className="mb-1 text-lg font-extrabold text-ink">{s.title}</h3>
      <p className="mb-6 text-sm text-slate">{s.subtitle}</p>

      <div className="divide-y divide-navy/[0.08] rounded-xl bg-surface px-4">
        <Row label={s.rowOpType} value={form.opType} />
        <Row label={s.rowName} value={form.name} />
        <Row label={s.rowWhatsapp} value={form.whatsapp} />
        <Row label={s.rowEmail} value={form.email} />
        <Row label={s.rowCategory} value={form.category} />
        <Row label={s.rowQuantity} value={form.quantity} />
        <Row label={s.rowBudget} value={form.budget} />
        <Row label={s.rowCountry} value={form.country} />
        <Row label={s.rowTransport} value={form.transport} />
        <Row label={s.rowAttachments} value={form.attachments.length ? s.attachmentsCount(form.attachments.length) : ''} />
      </div>

      <div className="mt-4">
        <p className="mb-1 text-xs font-bold text-ink">{s.descriptionTitle}</p>
        <p className="rounded-xl bg-surface p-4 text-sm leading-[1.6] text-slate">{form.description}</p>
      </div>

      <button
        type="button"
        onClick={() => goToStep(1)}
        className="mt-4 text-xs font-bold text-primary underline-offset-2 hover:underline"
      >
        {s.editRequest}
      </button>

      {isSubmitError && (
        <p className="mt-4 rounded-md bg-danger/[0.08] px-3 py-2.5 text-sm font-semibold text-danger">
          {submitErrorMessage ?? t.quoteDrawer.genericError}
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
        {isSubmitting ? s.submitting : (
          <>
            {s.submit} <span>→</span>
          </>
        )}
      </Button>
    </div>
  )
}
