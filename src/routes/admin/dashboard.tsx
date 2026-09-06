import { createFileRoute, Link } from '@tanstack/react-router'
import { useMemo } from 'react'
import { Badge, Card } from '@/components/ui'
import { statusBadgeVariant } from '@/features/account/status'
import { useAdminDevisList } from '@/features/admin/queries'
import { useLocale } from '@/i18n/LocaleContext'
import { Route as AdminRoute } from '@/routes/admin/route'

export const Route = createFileRoute('/admin/dashboard')({
  component: AdminDashboard,
})

function AdminDashboard() {
  const { adminUser } = AdminRoute.useRouteContext()
  const { data: devis, isLoading } = useAdminDevisList()
  const { t } = useLocale()
  const d = t.admin.dashboard

  const statCards: { key: 'total' | 'nouveau' | 'en_cours' | 'accepte'; label: string; color: string }[] = [
    { key: 'total', label: d.statTotal, color: 'bg-primary/10 text-primary' },
    { key: 'nouveau', label: d.statNouveau, color: 'bg-primary/10 text-primary' },
    { key: 'en_cours', label: d.statEnCours, color: 'bg-accent/[0.12] text-accent' },
    { key: 'accepte', label: d.statAccepte, color: 'bg-success/[0.12] text-success' },
  ]

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
      <h1 className="mb-1 text-2xl font-extrabold tracking-[-0.5px] text-ink">{d.greeting(adminUser.name.split(' ')[0])}</h1>
      <p className="mb-6 text-sm text-slate">{d.subtitle}</p>

      <div className="mb-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {statCards.map((card) => (
          <Card
            key={card.key}
            radius="lg"
            padding="md"
            shadow="none"
            className="border-[1.5px] border-navy/[0.08] p-4 sm:p-[30px]"
          >
            <div
              className={`mb-2.5 inline-flex h-8 w-8 items-center justify-center rounded-md text-xs font-extrabold sm:mb-3 sm:h-9 sm:w-9 sm:text-sm ${card.color}`}
            >
              {stats[card.key]}
            </div>
            <div className="text-xl font-extrabold text-ink sm:text-2xl">{isLoading ? '—' : stats[card.key]}</div>
            <div className="text-xs text-slate sm:text-sm">{card.label}</div>
          </Card>
        ))}
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-extrabold text-ink">{d.recentTitle}</h2>
        <Link to="/admin/devis" className="text-sm font-bold text-primary">
          {d.viewAll} →
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-card">
        {isLoading && <p className="px-5 py-6 text-sm text-slate">{d.loading}</p>}
        {!isLoading && recent.length === 0 && <p className="px-5 py-6 text-sm text-slate">{d.empty}</p>}
        {recent.map((r) => (
          <Link
            key={r.id}
            to="/admin/devis/$devisId"
            params={{ devisId: r.id }}
            className="flex items-center justify-between gap-3 border-b border-navy/[0.06] px-5 py-3.5 text-[13.5px] last:border-b-0"
          >
            <div className="min-w-0 flex-1">
              <div className="truncate font-bold text-ink">
                {r.name} — {r.op_type} / {r.category}
              </div>
              <div className="text-xs text-slate">
                {new Date(r.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
            </div>
            <Badge variant={statusBadgeVariant[r.status]}>{t.devisStatus[r.status]}</Badge>
          </Link>
        ))}
      </div>
    </div>
  )
}
