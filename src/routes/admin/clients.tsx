import { createFileRoute, Link } from '@tanstack/react-router'
import { Badge } from '@/components/ui'
import { useAdminClients } from '@/features/admin/clients'
import { useLocale } from '@/i18n/LocaleContext'

export const Route = createFileRoute('/admin/clients')({
  component: AdminClients,
})

function AdminClients() {
  const { clients, isLoading, isError } = useAdminClients()
  const { t } = useLocale()
  const c = t.admin.clients

  return (
    <div>
      <h1 className="mb-1 text-2xl font-extrabold tracking-[-0.5px] text-ink">{c.title}</h1>
      <p className="mb-6 text-sm text-slate">{c.subtitle}</p>

      {isLoading && <p className="text-sm text-slate">{c.loading}</p>}
      {isError && (
        <p className="rounded-md bg-danger/[0.08] px-3 py-2.5 text-sm font-semibold text-danger">{c.error}</p>
      )}

      {clients.length > 0 && (
        <div className="overflow-hidden rounded-lg bg-white shadow-card">
          <div className="overflow-x-auto">
            <div className="min-w-[720px]">
              <div className="grid grid-cols-[1.3fr_1.3fr_0.8fr_0.7fr_1fr] gap-3 border-b border-navy/[0.08] px-5 py-3.5 text-xs font-extrabold uppercase tracking-[0.03em] text-slate">
                <span>{c.colName}</span>
                <span>{c.colContact}</span>
                <span>{c.colAccount}</span>
                <span>{c.colDevis}</span>
                <span>{c.colLastActivity}</span>
              </div>
              {clients.map((cl) => (
                <div
                  key={cl.key}
                  className="grid grid-cols-[1.3fr_1.3fr_0.8fr_0.7fr_1fr] items-center gap-3 border-b border-navy/[0.06] px-5 py-3.5 text-[13.5px]"
                >
                  <span className="truncate font-bold text-ink">{cl.name}</span>
                  <span className="truncate text-slate">{cl.email ?? cl.whatsapp ?? '—'}</span>
                  <span>
                    <Badge variant={cl.registered ? 'success' : 'neutral'}>{cl.registered ? c.registered : c.unregistered}</Badge>
                  </span>
                  {cl.devisCount === 1 ? (
                    <Link
                      to="/admin/devis/$devisId"
                      params={{ devisId: cl.devisIds[0] }}
                      className="font-bold text-primary"
                    >
                      {cl.devisCount}
                    </Link>
                  ) : (
                    <span className="font-bold text-ink">{cl.devisCount}</span>
                  )}
                  <span className="text-slate">
                    {new Date(cl.lastActivity).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
