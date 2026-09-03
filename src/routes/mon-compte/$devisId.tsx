import { createFileRoute, Link } from '@tanstack/react-router'
import { Badge, Card } from '@/components/ui'
import { useDevisDetail, usePaiement } from '@/features/account/queries'
import { statusBadgeVariant } from '@/features/account/status'
import { useLocale } from '@/i18n/LocaleContext'

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
  const { t } = useLocale()
  const d = t.account.detail

  return (
    <div>
      <Link to="/mon-compte" className="mb-6 inline-flex items-center gap-1.5 text-sm font-bold text-ink">
        {d.back}
      </Link>

      {isLoading && <p className="text-sm text-slate">{t.common.loading}</p>}

      {isError && (
        <p className="rounded-md bg-danger/[0.08] px-3 py-2.5 text-sm font-semibold text-danger">{d.error}</p>
      )}

      {!isLoading && !isError && !devis && (
        <p className="rounded-md bg-danger/[0.08] px-3 py-2.5 text-sm font-semibold text-danger">{d.notFound}</p>
      )}

      {devis && (
        <div className="flex flex-col gap-6">
          <Card radius="lg" padding="md" shadow="none" className="border-[1.5px] border-navy/[0.08]">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h1 className="text-h2 text-ink">
                {devis.op_type} — {devis.category}
              </h1>
              <Badge variant={statusBadgeVariant[devis.status]}>{t.devisStatus[devis.status]}</Badge>
            </div>

            <div className="divide-y divide-navy/[0.08]">
              <Field
                label={d.date}
                value={new Date(devis.created_at).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              />
              <Field label={d.quantity} value={devis.quantity} />
              <Field label={d.budget} value={devis.budget} />
              <Field label={d.country} value={devis.country} />
              <Field label={d.transport} value={devis.transport} />
              <Field
                label={d.attachments}
                value={devis.attachment_paths.length ? d.attachmentsCount(devis.attachment_paths.length) : null}
              />
            </div>

            <div className="mt-4">
              <p className="mb-1 text-xs font-bold text-ink">{d.descriptionTitle}</p>
              <p className="rounded-xl bg-surface p-4 text-sm leading-[1.6] text-slate">{devis.description}</p>
            </div>
          </Card>

          {devis.status === 'accepte' && (
            <Card radius="lg" padding="md" shadow="none" className="border-[1.5px] border-primary/20 bg-primary/[0.03]">
              <h2 className="mb-4 text-lg font-extrabold text-ink">{d.paymentTitle}</h2>

              {paiementLoading && <p className="text-sm text-slate">{t.common.loading}</p>}

              {!paiementLoading && !paiement && <p className="text-sm text-slate">{d.paymentPending}</p>}

              {paiement && (
                <div className="divide-y divide-navy/[0.08]">
                  <Field
                    label={d.paymentAmount}
                    value={`${paiement.amount.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${paiement.currency}`}
                  />
                  <Field label={d.paymentReference} value={paiement.reference} />
                  <Field label={d.paymentIban} value={paiement.iban} />
                  <Field label={d.paymentBic} value={paiement.bic} />
                  <Field
                    label={d.paymentDueDate}
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
