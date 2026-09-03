import { createFileRoute } from '@tanstack/react-router'
import { useMemo } from 'react'
import { SimpleBarChart } from '@/components/admin/SimpleBarChart'
import { Card } from '@/components/ui'
import { statusLabels } from '@/features/account/status'
import { useAdminDevisList } from '@/features/admin/queries'
import type { DevisStatus } from '@/lib/database.types'

export const Route = createFileRoute('/admin/statistiques')({
  component: AdminStatistiques,
})

const statusColors: Record<DevisStatus, string> = {
  nouveau: '#0057D9',
  en_cours: '#FF8C00',
  accepte: '#1A9E5C',
  refuse: '#D9480F',
  traite: '#00C2FF',
  archive: '#9AA5B4',
}

const monthFormatter = new Intl.DateTimeFormat('fr-FR', { month: 'short', year: '2-digit' })

function AdminStatistiques() {
  const { data: devis, isLoading } = useAdminDevisList()

  const statusData = useMemo(() => {
    if (!devis) return []
    const counts = Object.fromEntries(Object.keys(statusColors).map((s) => [s, 0])) as Record<DevisStatus, number>
    for (const d of devis) counts[d.status] += 1
    return (Object.keys(counts) as DevisStatus[]).map((status) => ({
      label: statusLabels[status],
      value: counts[status],
      color: statusColors[status],
    }))
  }, [devis])

  const categoryData = useMemo(() => {
    if (!devis) return []
    const counts = new Map<string, number>()
    for (const d of devis) counts.set(d.category, (counts.get(d.category) ?? 0) + 1)
    return Array.from(counts.entries())
      .map(([label, value]) => ({ label, value, color: '#0057D9' }))
      .sort((a, b) => b.value - a.value)
  }, [devis])

  const monthlyData = useMemo(() => {
    if (!devis) return []
    const now = new Date()
    const months: { key: string; label: string; value: number }[] = []
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      months.push({ key: `${d.getFullYear()}-${d.getMonth()}`, label: monthFormatter.format(d), value: 0 })
    }
    const byKey = new Map(months.map((m) => [m.key, m]))
    for (const d of devis) {
      const created = new Date(d.created_at)
      const key = `${created.getFullYear()}-${created.getMonth()}`
      const bucket = byKey.get(key)
      if (bucket) bucket.value += 1
    }
    return months.map((m) => ({ label: m.label, value: m.value, color: '#0057D9' }))
  }, [devis])

  return (
    <div>
      <h1 className="mb-1 text-2xl font-extrabold tracking-[-0.5px] text-ink">Statistiques</h1>
      <p className="mb-6 text-sm text-slate">Vue d&apos;ensemble de l&apos;activité devis.</p>

      {isLoading && <p className="text-sm text-slate">Chargement...</p>}

      {devis && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card radius="lg" padding="md" shadow="none" className="border-[1.5px] border-navy/[0.08]">
            <h2 className="mb-4 text-base font-extrabold text-ink">Devis par statut</h2>
            <SimpleBarChart data={statusData} />
          </Card>

          <Card radius="lg" padding="md" shadow="none" className="border-[1.5px] border-navy/[0.08]">
            <h2 className="mb-4 text-base font-extrabold text-ink">Devis par catégorie</h2>
            {categoryData.length === 0 ? (
              <p className="text-sm text-slate">Aucune donnée.</p>
            ) : (
              <SimpleBarChart data={categoryData} />
            )}
          </Card>

          <Card radius="lg" padding="md" shadow="none" className="border-[1.5px] border-navy/[0.08] lg:col-span-2">
            <h2 className="mb-4 text-base font-extrabold text-ink">Devis reçus — 6 derniers mois</h2>
            <SimpleBarChart data={monthlyData} />
          </Card>
        </div>
      )}
    </div>
  )
}
