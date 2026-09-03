import { createFileRoute, Link } from '@tanstack/react-router'
import { useMemo } from 'react'
import { Badge, Card } from '@/components/ui'
import { statusBadgeVariant, statusLabels } from '@/features/account/status'
import { useAdminDevisList } from '@/features/admin/queries'
import { Route as AdminRoute } from '@/routes/admin/route'

export const Route = createFileRoute('/admin/dashboard')({
  component: AdminDashboard,
})

const statCards: { key: 'total' | 'nouveau' | 'en_cours' | 'accepte'; label: string; color: string }[] = [
  { key: 'total', label: 'Total devis', color: 'bg-primary/10 text-primary' },
  { key: 'nouveau', label: 'Nouveaux', color: 'bg-primary/10 text-primary' },
  { key: 'en_cours', label: 'En cours', color: 'bg-accent/[0.12] text-accent' },
  { key: 'accepte', label: 'Acceptés', color: 'bg-success/[0.12] text-success' },
]

function AdminDashboard() {
  const { adminUser } = AdminRoute.useRouteContext()
  const { data: devis, isLoading } = useAdminDevisList()

  const stats = useMemo(() => {
    if (!devis) return { total: 0, nouveau: 0, en_cours: 0, accepte: 0 }
    return {
      total: devis.length,
      nouveau: devis.filter((d) => d.status === 'nouveau').length,
      en_cours: devis.filter((d) => d.status === 'en_cours').length,
      accepte: devis.filter((d) => d.status === 'accepte').length,
    }
  }, [devis])

  const recent = devis?.slice(0, 8) ?? []

  return (
    <div>
      <h1 className="mb-1 text-2xl font-extrabold tracking-[-0.5px] text-ink">Bonjour, {adminUser.name.split(' ')[0]}</h1>
      <p className="mb-6 text-sm text-slate">Voici un aperçu de l&apos;activité Wiihappy Gen.</p>

      <div className="mb-8 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
        {statCards.map((card) => (
          <Card key={card.key} radius="lg" padding="md" shadow="none" className="border-[1.5px] border-navy/[0.08]">
            <div className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-extrabold ${card.color}`}>
              {stats[card.key]}
            </div>
            <div className="text-2xl font-extrabold text-ink">{isLoading ? '—' : stats[card.key]}</div>
            <div className="text-sm text-slate">{card.label}</div>
          </Card>
        ))}
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-extrabold text-ink">Devis récents</h2>
        <Link to="/admin/devis" className="text-sm font-bold text-primary">
          Voir tout →
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-card">
        {isLoading && <p className="px-5 py-6 text-sm text-slate">Chargement...</p>}
        {!isLoading && recent.length === 0 && <p className="px-5 py-6 text-sm text-slate">Aucun devis pour le moment.</p>}
        {recent.map((d) => (
          <Link
            key={d.id}
            to="/admin/devis/$devisId"
            params={{ devisId: d.id }}
            className="flex items-center justify-between gap-3 border-b border-navy/[0.06] px-5 py-3.5 text-[13.5px] last:border-b-0"
          >
            <div className="min-w-0 flex-1">
              <div className="truncate font-bold text-ink">
                {d.name} — {d.op_type} / {d.category}
              </div>
              <div className="text-xs text-slate">
                {new Date(d.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
            </div>
            <Badge variant={statusBadgeVariant[d.status]}>{statusLabels[d.status]}</Badge>
          </Link>
        ))}
      </div>
    </div>
  )
}
