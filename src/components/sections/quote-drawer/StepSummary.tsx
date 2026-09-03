import { Button } from '@/components/ui'
import { useQuoteForm } from '@/features/quote-form/QuoteFormContext'

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

  return (
    <div>
      <h3 className="mb-1 text-lg font-extrabold text-ink">Récapitulatif</h3>
      <p className="mb-6 text-sm text-slate">Vérifiez votre demande avant de l&apos;envoyer.</p>

      <div className="divide-y divide-navy/[0.08] rounded-xl bg-surface px-4">
        <Row label="Type d'opération" value={form.opType} />
        <Row label="Nom" value={form.name} />
        <Row label="WhatsApp" value={form.whatsapp} />
        <Row label="Email" value={form.email} />
        <Row label="Catégorie" value={form.category} />
        <Row label="Quantité" value={form.quantity} />
        <Row label="Budget" value={form.budget} />
        <Row label="Pays de livraison" value={form.country} />
        <Row label="Transport" value={form.transport} />
        <Row label="Pièces jointes" value={form.attachments.length ? `${form.attachments.length} fichier(s)` : ''} />
      </div>

      <div className="mt-4">
        <p className="mb-1 text-xs font-bold text-ink">Description du besoin</p>
        <p className="rounded-xl bg-surface p-4 text-sm leading-[1.6] text-slate">{form.description}</p>
      </div>

      <button
        type="button"
        onClick={() => goToStep(1)}
        className="mt-4 text-xs font-bold text-primary underline-offset-2 hover:underline"
      >
        Modifier ma demande
      </button>

      {isSubmitError && (
        <p className="mt-4 rounded-md bg-danger/[0.08] px-3 py-2.5 text-sm font-semibold text-danger">
          {submitErrorMessage ?? "Une erreur est survenue, merci de réessayer."}
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
        {isSubmitting ? 'Envoi en cours...' : (
          <>
            Envoyer ma demande <span>→</span>
          </>
        )}
      </Button>
    </div>
  )
}
