import { createFileRoute, Link } from '@tanstack/react-router'
import { Button, Card } from '@/components/ui'
import {
  useAdminNotifications,
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
} from '@/features/admin/notifications'
import { cn } from '@/lib/cn'

export const Route = createFileRoute('/admin/notifications')({
  component: AdminNotifications,
})

function AdminNotifications() {
  const { data: notifications, isLoading } = useAdminNotifications()
  const markRead = useMarkNotificationRead()
  const markAllRead = useMarkAllNotificationsRead()

  const unreadCount = notifications?.filter((n) => !n.read).length ?? 0

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold tracking-[-0.5px] text-ink">Notifications</h1>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={() => markAllRead.mutate()} disabled={markAllRead.isPending}>
            Tout marquer comme lu
          </Button>
        )}
      </div>

      {isLoading && <p className="text-sm text-slate">Chargement...</p>}

      {notifications && notifications.length === 0 && (
        <p className="rounded-lg border-[1.5px] border-dashed border-navy/15 bg-white px-5 py-6 text-sm text-slate">
          Aucune notification.
        </p>
      )}

      <div className="flex flex-col gap-2">
        {notifications?.map((n) => (
          <Card
            key={n.id}
            radius="lg"
            padding="sm"
            shadow="none"
            className={cn('border-[1.5px]', n.read ? 'border-navy/[0.06]' : 'border-primary/20 bg-primary/[0.03]')}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  {!n.read && <span className="h-2 w-2 flex-none rounded-full bg-accent" />}
                  <span className="font-bold text-ink">{n.title}</span>
                </div>
                {n.body && <p className="mt-1 text-sm text-slate">{n.body}</p>}
                <div className="mt-1.5 flex items-center gap-3">
                  <span className="text-xs text-slate">
                    {new Date(n.created_at).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  {n.devis_id && (
                    <Link to="/admin/devis/$devisId" params={{ devisId: n.devis_id }} className="text-xs font-bold text-primary">
                      Voir le devis →
                    </Link>
                  )}
                </div>
              </div>
              {!n.read && (
                <button
                  type="button"
                  onClick={() => markRead.mutate(n.id)}
                  className="flex-none text-xs font-bold text-primary"
                >
                  Marquer comme lu
                </button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
