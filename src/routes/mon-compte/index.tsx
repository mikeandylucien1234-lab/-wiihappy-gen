import { createFileRoute, Link } from '@tanstack/react-router'
import { Badge, Card } from '@/components/ui'
import { useMyDevis } from '@/features/account/queries'
import { statusBadgeVariant, statusLabels } from '@/features/account/status'

export const Route = createFileRoute('/mon-compte/')({
  component: MyDevisList,
})

function MyDevisList() {
  const { data: devis, isLoading, isError } = useMyDevis()

  return (
    <div>
      <h1 className="mb-1 text-h2 text-ink">Mes devis</h1>
      <p className="mb-8 text-sm text-slate">Retrouvez ici l&apos;historique et le statut de vos demandes.</p>

      {isLoading && <p className="text-sm text-slate">Chargement...</p>}

      {isError && (
        <p className="rounded-md bg-danger/[0.08] px-3 py-2.5 text-sm font-semibold text-danger">
          Impossible de charger vos devis pour le moment.
        </p>
      )}

      {devis && devis.length === 0 && (
        <Card radius="lg" padding="md" shadow="none" className="border-[1.5px] border-dashed border-navy/15">
          <p className="text-sm text-slate">
            Vous n&apos;avez pas encore de devis. Utilisez le bouton &laquo;&nbsp;Demander un devis&nbsp;&raquo; en
            bas à droite pour en créer un.
          </p>
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
                <Badge variant={statusBadgeVariant[d.status]}>{statusLabels[d.status]}</Badge>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
