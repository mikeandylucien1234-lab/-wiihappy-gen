import { createFileRoute } from '@tanstack/react-router'
import { Fragment, useMemo, useState } from 'react'
import { Badge, Button, Select } from '@/components/ui'
import { useAdminReservations, useUpdateReservationStatus } from '@/features/admin/reservations'
import { TIME_SLOTS } from '@/features/booking/types'
import { useLocale } from '@/i18n/LocaleContext'
import type { Database, ReservationStatut } from '@/lib/database.types'
import { Route as AdminRoute } from '@/routes/admin/route'

export const Route = createFileRoute('/admin/reservations')({
  component: AdminReservations,
})

type Reservation = Database['public']['Tables']['reservations']['Row']

const statusBadgeVariant: Record<ReservationStatut, 'warning' | 'info' | 'success' | 'danger'> = {
  en_attente: 'warning',
  confirme: 'info',
  effectue: 'success',
  annule: 'danger',
}

const allStatuses: ReservationStatut[] = ['en_attente', 'confirme', 'effectue', 'annule']

function StatusSelect({ reservation, canEdit }: { reservation: Reservation; canEdit: boolean }) {
  const updateStatus = useUpdateReservationStatus(reservation.id)
  const { t } = useLocale()
  const r = t.admin.reservations

  return (
    <Select
      value={reservation.statut}
      disabled={!canEdit || updateStatus.isPending}
      onChange={(e) => updateStatus.mutate(e.target.value as ReservationStatut)}
      className="text-xs"
    >
      {allStatuses.map((s) => (
        <option key={s} value={s}>
          {r.statusLabels[s]}
        </option>
      ))}
    </Select>
  )
}

function formatDate(dateStr: string) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
}

/** Monday of the week containing `d`. */
function startOfWeek(d: Date) {
  const day = (d.getDay() + 6) % 7
  const monday = new Date(d)
  monday.setDate(d.getDate() - day)
  return monday
}

function toDateKey(d: Date) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function WeekCalendar({ reservations }: { reservations: Reservation[] }) {
  const { t } = useLocale()
  const r = t.admin.reservations
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date()))

  const weekDays = useMemo(() => Array.from({ length: 6 }, (_, i) => new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + i)), [weekStart])

  const byKey = useMemo(() => {
    const map = new Map<string, Reservation>()
    for (const res of reservations) {
      if (res.statut === 'annule') continue
      map.set(`${res.date_appel}T${res.heure_appel.slice(0, 5)}`, res)
    }
    return map
  }, [reservations])

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setWeekStart((d) => new Date(d.getFullYear(), d.getMonth(), d.getDate() - 7))}
          className="text-sm font-bold text-primary"
        >
          {r.previousWeek}
        </button>
        <span className="text-sm font-extrabold text-ink">
          {r.weekOf} {formatDate(toDateKey(weekStart))}
        </span>
        <button
          type="button"
          onClick={() => setWeekStart((d) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + 7))}
          className="text-sm font-bold text-primary"
        >
          {r.nextWeek}
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg bg-white shadow-card">
        <div className="min-w-[720px]">
          <div className="grid grid-cols-[80px_repeat(6,1fr)] gap-px bg-navy/[0.06]">
            <div className="bg-white p-2" />
            {weekDays.map((d) => (
              <div key={d.toISOString()} className="bg-white p-2 text-center text-xs font-extrabold text-ink">
                {d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' })}
              </div>
            ))}
            {TIME_SLOTS.map((time) => (
              <Fragment key={time}>
                <div className="bg-white p-2 text-xs font-bold text-slate">{time}</div>
                {weekDays.map((d) => {
                  const key = `${toDateKey(d)}T${time}`
                  const res = byKey.get(key)
                  return (
                    <div key={`${time}-${d.toISOString()}`} className="min-h-[46px] bg-white p-1.5">
                      {res ? (
                        <div className="truncate rounded-md bg-primary/10 px-2 py-1.5 text-[11px] font-bold text-primary">
                          {res.nom_complet}
                        </div>
                      ) : (
                        <span className="text-[11px] text-muted">{r.noSlotsThisDay}</span>
                      )}
                    </div>
                  )
                })}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function AdminReservations() {
  const { adminUser } = AdminRoute.useRouteContext()
  const canEdit = adminUser.role === 'Admin' || adminUser.role === 'Agent'
  const { data: reservations, isLoading, isError } = useAdminReservations()
  const [view, setView] = useState<'list' | 'calendar'>('list')
  const { t } = useLocale()
  const r = t.admin.reservations

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-[-0.5px] text-ink">{r.title}</h1>
          <p className="text-sm text-slate">{r.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <Button variant={view === 'list' ? 'primary' : 'ghost'} size="sm" onClick={() => setView('list')}>
            {r.listView}
          </Button>
          <Button variant={view === 'calendar' ? 'primary' : 'ghost'} size="sm" onClick={() => setView('calendar')}>
            {r.calendarView}
          </Button>
        </div>
      </div>

      {isLoading && <p className="text-sm text-slate">{r.loading}</p>}
      {isError && (
        <p className="rounded-md bg-danger/[0.08] px-3 py-2.5 text-sm font-semibold text-danger">{r.error}</p>
      )}

      {reservations && reservations.length === 0 && (
        <p className="rounded-lg border-[1.5px] border-dashed border-navy/15 bg-white px-5 py-6 text-sm text-slate">
          {r.empty}
        </p>
      )}

      {reservations && reservations.length > 0 && view === 'list' && (
        <div className="overflow-hidden rounded-lg bg-white shadow-card">
          <div className="overflow-x-auto">
            <div className="min-w-[900px]">
              <div className="grid grid-cols-[1.2fr_1fr_1.2fr_0.9fr_0.7fr_0.9fr_1fr] gap-3 border-b border-navy/[0.08] px-5 py-3.5 text-xs font-extrabold uppercase tracking-[0.03em] text-slate">
                <span>{r.colName}</span>
                <span>{r.colWhatsapp}</span>
                <span>{r.colMotif}</span>
                <span>{r.colDate}</span>
                <span>{r.colTime}</span>
                <span>{r.colStatus}</span>
                <span>{r.colAction}</span>
              </div>
              {reservations.map((res) => (
                <div
                  key={res.id}
                  className="grid grid-cols-[1.2fr_1fr_1.2fr_0.9fr_0.7fr_0.9fr_1fr] items-center gap-3 border-b border-navy/[0.06] px-5 py-3.5 text-[13.5px]"
                >
                  <span className="truncate font-bold text-ink">{res.nom_complet}</span>
                  <span className="truncate text-slate">{res.whatsapp}</span>
                  <span className="truncate text-slate">{res.motif}</span>
                  <span className="text-slate">{formatDate(res.date_appel)}</span>
                  <span className="font-semibold text-ink">{res.heure_appel.slice(0, 5)}</span>
                  <span>
                    <Badge variant={statusBadgeVariant[res.statut]}>{r.statusLabels[res.statut]}</Badge>
                  </span>
                  <StatusSelect reservation={res} canEdit={canEdit} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {reservations && view === 'calendar' && <WeekCalendar reservations={reservations} />}
    </div>
  )
}
