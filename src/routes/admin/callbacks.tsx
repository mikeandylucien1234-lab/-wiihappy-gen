import { createFileRoute } from '@tanstack/react-router'
import { Badge, Select } from '@/components/ui'
import { useAdminCallbacks, useUpdateCallbackStatus } from '@/features/admin/callbacks'
import { useLocale } from '@/i18n/LocaleContext'
import type { CallbackStatut, Database } from '@/lib/database.types'
import { Route as AdminRoute } from '@/routes/admin/route'

export const Route = createFileRoute('/admin/callbacks')({
  component: AdminCallbacks,
})

type CallbackRequest = Database['public']['Tables']['callback_requests']['Row']

const statusBadgeVariant: Record<CallbackStatut, 'warning' | 'info' | 'danger'> = {
  nouveau: 'warning',
  contacte: 'info',
  annule: 'danger',
}

const allStatuses: CallbackStatut[] = ['nouveau', 'contacte', 'annule']

function StatusSelect({ request, canEdit }: { request: CallbackRequest; canEdit: boolean }) {
  const updateStatus = useUpdateCallbackStatus(request.id)
  const { t } = useLocale()
  const c = t.admin.callbacks

  return (
    <Select
      value={request.statut}
      disabled={!canEdit || updateStatus.isPending}
      onChange={(e) => updateStatus.mutate(e.target.value as CallbackStatut)}
      className="text-xs"
    >
      {allStatuses.map((s) => (
        <option key={s} value={s}>
          {c.statusLabels[s]}
        </option>
      ))}
    </Select>
  )
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function AdminCallbacks() {
  const { adminUser } = AdminRoute.useRouteContext()
  const canEdit = adminUser.role === 'Admin' || adminUser.role === 'Agent'
  const { data: requests, isLoading, isError } = useAdminCallbacks()
  const { t } = useLocale()
  const c = t.admin.callbacks

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold tracking-[-0.5px] text-ink">{c.title}</h1>
        <p className="text-sm text-slate">{c.subtitle}</p>
      </div>

      {isLoading && <p className="text-sm text-slate">{c.loading}</p>}
      {isError && (
        <p className="rounded-md bg-danger/[0.08] px-3 py-2.5 text-sm font-semibold text-danger">{c.error}</p>
      )}

      {requests && requests.length === 0 && (
        <p className="rounded-lg border-[1.5px] border-dashed border-navy/15 bg-white px-5 py-6 text-sm text-slate">
          {c.empty}
        </p>
      )}

      {requests && requests.length > 0 && (
        <div className="overflow-hidden rounded-lg bg-white shadow-card">
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-[1.2fr_1fr_1.4fr_1.1fr_0.9fr_1fr] gap-3 border-b border-navy/[0.08] px-5 py-3.5 text-xs font-extrabold uppercase tracking-[0.03em] text-slate">
                <span>{c.colName}</span>
                <span>{c.colWhatsapp}</span>
                <span>{c.colEmail}</span>
                <span>{c.colDate}</span>
                <span>{c.colStatus}</span>
                <span>{c.colAction}</span>
              </div>
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="grid grid-cols-[1.2fr_1fr_1.4fr_1.1fr_0.9fr_1fr] items-center gap-3 border-b border-navy/[0.06] px-5 py-3.5 text-[13.5px]"
                >
                  <span className="truncate font-bold text-ink">{req.nom_complet}</span>
                  <span className="truncate text-slate">{req.whatsapp}</span>
                  <span className="truncate text-slate">{req.email}</span>
                  <span className="text-slate">{formatDate(req.created_at)}</span>
                  <span>
                    <Badge variant={statusBadgeVariant[req.statut]}>{c.statusLabels[req.statut]}</Badge>
                  </span>
                  <StatusSelect request={req} canEdit={canEdit} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
