import { createFileRoute, Link } from '@tanstack/react-router'
import { Badge, Card } from '@/components/ui'
import { useMyDevis } from '@/features/account/queries'
import { statusBadgeVariant } from '@/features/account/status'
import { useLocale } from '@/i18n/LocaleContext'

export const Route = createFileRoute('/mon-compte/')({
  component: MyDevisList,
})

function MyDevisList() {
  const { data: devis, isLoading, isError } = useMyDevis()
  const { t } = useLocale()
  const l = t.account.list

  return (
    <div>
      <h1 className="mb-1 text-h2 text-ink">{l.title}</h1>
      <p className="mb-8 text-sm text-slate">{l.subtitle}</p>

      {isLoading && <p className="text-sm text-slate">{t.common.loading}</p>}

      {isError && (
        <p className="rounded-md bg-danger/[0.08] px-3 py-2.5 text-sm font-semibold text-danger">{l.error}</p>
      )}

      {devis && devis.length === 0 && (
        <Card radius="lg" padding="md" shadow="none" className="border-[1.5px] border-dashed border-navy/15">
          <p className="text-sm text-slate">{l.emptyPrefix}</p>
        </Card>
      )}

      {devis && devis.length > 0 && (
        <div className="flex flex-col gap-3">
          {devis.map((d) => (
            <Link key={d.id} to="/mon-compte/$devisId" params={{ devisId: d.id }}>
              <Card
                radius="lg"
                padding="sm"
                shadow="none"
                hoverable
                className="flex flex-wrap items-center justify-between gap-3 border-[1.5px] border-navy/[0.08]"
              >
                <div>
                  <div className="text-sm font-bold text-ink">
                    {d.op_type} — {d.category}
                  </div>
                  <div className="text-xs text-slate">
                    {new Date(d.created_at).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </div>
                </div>
                <Badge variant={statusBadgeVariant[d.status]}>{t.devisStatus[d.status]}</Badge>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
