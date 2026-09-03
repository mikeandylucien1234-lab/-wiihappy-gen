import { createFileRoute, Link } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { Badge, Select } from '@/components/ui'
import { statusBadgeVariant } from '@/features/account/status'
import { useAdminDevisList } from '@/features/admin/queries'
import { useLocale } from '@/i18n/LocaleContext'
import type { DevisStatus } from '@/lib/database.types'

export const Route = createFileRoute('/admin/devis/')({
  component: AdminDevisList,
})

const statusFilters: (DevisStatus | 'all')[] = ['all', 'nouveau', 'en_cours', 'accepte', 'refuse', 'traite', 'archive']

function AdminDevisList() {
  const { data: devis, isLoading, isError } = useAdminDevisList()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<DevisStatus | 'all'>('all')
  const { t } = useLocale()
  const l = t.admin.devisList

  const filtered = useMemo(() => {
    if (!devis) return []
    const q = search.trim().toLowerCase()
    return devis.filter((d) => {
      const matchesStatus = statusFilter === 'all' || d.status === statusFilter
      const matchesSearch =
        !q ||
        d.name.toLowerCase().includes(q) ||
        (d.email ?? '').toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q)
      return matchesStatus && matchesSearch
    })
  }, [devis, search, statusFilter])

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold tracking-[-0.5px] text-ink">{l.title}</h1>
      </div>

      <div className="mb-5 flex flex-wrap gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={l.searchPlaceholder}
          className="w-full max-w-[320px] rounded-md border-[1.5px] border-navy/10 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-slate focus:outline-none focus:border-primary/60"
        />
        <div className="w-full max-w-[220px]">
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as DevisStatus | 'all')}>
            {statusFilters.map((s) => (
              <option key={s} value={s}>
                {s === 'all' ? l.allStatuses : t.devisStatus[s]}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {isLoading && <p className="text-sm text-slate">{l.loading}</p>}
      {isError && (
        <p className="rounded-md bg-danger/[0.08] px-3 py-2.5 text-sm font-semibold text-danger">{l.error}</p>
      )}

      {devis && (
        <div className="overflow-hidden rounded-lg bg-white shadow-card">
          <div className="overflow-x-auto">
            <div className="min-w-[880px]">
              <div className="grid grid-cols-[1.4fr_1fr_0.8fr_0.9fr_1fr_0.6fr] gap-3 border-b border-navy/[0.08] px-5 py-3.5 text-xs font-extrabold uppercase tracking-[0.03em] text-slate">
                <span>{l.colClient}</span>
                <span>{l.colCategory}</span>
                <span>{l.colType}</span>
                <span>{l.colStatus}</span>
                <span>{l.colDate}</span>
                <span>{l.colAction}</span>
              </div>

              {filtered.length === 0 && <p className="px-5 py-6 text-sm text-slate">{l.empty}</p>}

              {filtered.map((d) => (
                <div
                  key={d.id}
                  className="grid grid-cols-[1.4fr_1fr_0.8fr_0.9fr_1fr_0.6fr] items-center gap-3 border-b border-navy/[0.06] px-5 py-3.5 text-[13.5px]"
                >
                  <div className="min-w-0">
                    <div className="truncate font-bold text-ink">{d.name}</div>
                    <div className="truncate text-xs text-slate">{d.email ?? d.whatsapp ?? '—'}</div>
                  </div>
                  <span className="truncate text-slate">{d.category}</span>
                  <span className="text-ink">{d.op_type}</span>
                  <span>
                    <Badge variant={statusBadgeVariant[d.status]}>{t.devisStatus[d.status]}</Badge>
                  </span>
                  <span className="text-slate">
                    {new Date(d.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  <Link to="/admin/devis/$devisId" params={{ devisId: d.id }} className="font-bold text-primary">
                    {l.view} →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
