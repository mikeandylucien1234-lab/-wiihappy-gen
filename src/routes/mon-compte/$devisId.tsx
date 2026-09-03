import { createFileRoute, Link } from '@tanstack/react-router'
import { Badge, Card } from '@/components/ui'
import { useDevisDetail, usePaiement } from '@/features/account/queries'
import { statusBadgeVariant, statusLabels } from '@/features/account/status'

export const Route = createFileRoute('/mon-compte/$devisId')({
  component: DevisDetail,
})

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null
  return (
    <div className="flex justify-between gap-4 py-2.5 text-sm">
      <span className="text-slate">{label}</span>
      <span className="text-right font-semibold text-ink">{value}</span>
    </div>
  )
}

function DevisDetail() {
  const { devisId } = Route.useParams()
  const { data: devis, isLoading, isError } = useDevisDetail(devisId)
  const { data: paiement, isLoading: paiementLoading } = usePaiement(devisId, devis?.status === 'accepte')

  return (
    <div>
      <Link to="/mon-compte" className="mb-6 inline-flex items-center gap-1.5 text-sm font-bold text-ink">
        ← Mes devis
      </Link>

      {isLoading && <p className="text-sm text-slate">Chargement...</p>}

      {isError && (
        <p className="rounded-md bg-danger/[0.08] px-3 py-2.5 text-sm font-semibold text-danger">
          Impossible de charger ce devis.
        </p>
      )}

      {!isLoading && !isError && !devis && (
        <p className="rounded-md bg-danger/[0.08] px-3 py-2.5 text-sm font-semibold text-danger">
          Ce devis n&apos;existe pas ou ne vous appartient pas.
        </p>
      )}

      {devis && (
        <div className="flex flex-col gap-6">
          <Card radius="lg" padding="md" shadow="none" className="border-[1.5px] border-navy/[0.08]">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h1 className="text-h2 text-ink">
                {devis.op_type} — {devis.category}
              </h1>
              <Badge variant={statusBadgeVariant[devis.status]}>{statusLabels[devis.status]}</Badge>
            </div>

            <div className="divide-y divide-navy/[0.08]">
              <Field
                label="Date de la demande"
                value={new Date(devis.created_at).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              />
              <Field label="Quantité" value={devis.quantity} />
              <Field label="Budget" value={devis.budget} />
              <Field label="Pays de livraison" value={devis.country} />
              <Field label="Transport" value={devis.transport} />
              <Field
                label="Pièces jointes"
                value={devis.attachment_paths.length ? `${devis.attachment_paths.length} fichier(s)` : null}
              />
            </div>

            <div className="mt-4">
              <p className="mb-1 text-xs font-bold text-ink">Description du besoin</p>
              <p className="rounded-xl bg-surface p-4 text-sm leading-[1.6] text-slate">{devis.description}</p>
            </div>
          </Card>

          {devis.status === 'accepte' && (
            <Card radius="lg" padding="md" shadow="none" className="border-[1.5px] border-primary/20 bg-primary/[0.03]">
              <h2 className="mb-4 text-lg font-extrabold text-ink">Informations de paiement</h2>

              {paiementLoading && <p className="text-sm text-slate">Chargement...</p>}

              {!paiementLoading && !paiement && (
                <p className="text-sm text-slate">
                  Votre devis est accepté — les informations de paiement seront disponibles ici dès qu&apos;elles
                  seront préparées par notre équipe.
                </p>
              )}

              {paiement && (
                <div className="divide-y divide-navy/[0.08]">
                  <Field
                    label="Montant"
                    value={`${paiement.amount.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${paiement.currency}`}
                  />
                  <Field label="Référence" value={paiement.reference} />
                  <Field label="IBAN" value={paiement.iban} />
                  <Field label="BIC" value={paiement.bic} />
                  <Field
                    label="Échéance"
                    value={
                      paiement.due_date
                        ? new Date(paiement.due_date).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })
                        : null
                    }
                  />
                  {paiement.instructions && (
                    <div className="pt-4">
                      <p className="text-sm leading-[1.6] text-slate">{paiement.instructions}</p>
                    </div>
                  )}
                </div>
              )}
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
