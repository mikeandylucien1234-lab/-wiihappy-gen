import { createFileRoute, Link } from '@tanstack/react-router'
import { Button, Card } from '@/components/ui'
import {
  useAdminNotifications,
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
} from '@/features/admin/notifications'
import { useLocale } from '@/i18n/LocaleContext'
import { cn } from '@/lib/cn'

export const Route = createFileRoute('/admin/notifications')({
  component: AdminNotifications,
})

function AdminNotifications() {
  const { data: notifications, isLoading } = useAdminNotifications()
  const markRead = useMarkNotificationRead()
  const markAllRead = useMarkAllNotificationsRead()
  const { t } = useLocale()
  const n = t.admin.notifications

  const unreadCount = notifications?.filter((x) => !x.read).length ?? 0

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold tracking-[-0.5px] text-ink">{n.title}</h1>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={() => markAllRead.mutate()} disabled={markAllRead.isPending}>
            {n.markAllRead}
          </Button>
        )}
      </div>

      {isLoading && <p className="text-sm text-slate">{n.loading}</p>}

      {notifications && notifications.length === 0 && (
        <p className="rounded-lg border-[1.5px] border-dashed border-navy/15 bg-white px-5 py-6 text-sm text-slate">
          {n.empty}
        </p>
      )}

      <div className="flex flex-col gap-2">
        {notifications?.map((x) => (
          <Card
            key={x.id}
            radius="lg"
            padding="sm"
            shadow="none"
            className={cn('border-[1.5px]', x.read ? 'border-navy/[0.06]' : 'border-primary/20 bg-primary/[0.03]')}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  {!x.read && <span className="h-2 w-2 flex-none rounded-full bg-accent" />}
                  <span className="font-bold text-ink">{x.title}</span>
                </div>
                {x.body && <p className="mt-1 text-sm text-slate">{x.body}</p>}
                <div className="mt-1.5 flex items-center gap-3">
                  <span className="text-xs text-slate">
                    {new Date(x.created_at).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  {x.devis_id && (
                    <Link to="/admin/devis/$devisId" params={{ devisId: x.devis_id }} className="text-xs font-bold text-primary">
                      {n.viewDevis} →
                    </Link>
                  )}
                </div>
              </div>
              {!x.read && (
                <button
                  type="button"
                  onClick={() => markRead.mutate(x.id)}
                  className="flex-none text-xs font-bold text-primary"
                >
                  {n.markRead}
                </button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
