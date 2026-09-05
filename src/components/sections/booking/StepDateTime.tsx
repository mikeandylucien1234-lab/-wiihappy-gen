import { useMemo, useState } from 'react'
import { useBookingForm } from '@/features/booking/BookingFormContext'
import { useBookedSlots } from '@/features/booking/useBookedSlots'
import { getMonthGrid, isDayDisabled, isSlotDisabled, toDateKey } from '@/features/booking/slots'
import { TIME_SLOTS } from '@/features/booking/types'
import { useLocale } from '@/i18n/LocaleContext'
import { cn } from '@/lib/cn'
import type { Locale } from '@/lib/database.types'

const BCP47: Record<Locale, string> = { fr: 'fr-FR', en: 'en-US', es: 'es-ES' }

export function StepDateTime() {
  const { form, selectDay, selectSlot } = useBookingForm()
  const { locale, t } = useLocale()
  const s = t.booking.step1

  const now = useMemo(() => new Date(), [])
  const [viewYear, setViewYear] = useState(now.getFullYear())
  const [viewMonth, setViewMonth] = useState(now.getMonth())

  const { data: bookedKeys, isLoading: slotsLoading } = useBookedSlots(viewYear, viewMonth)

  const days = useMemo(() => getMonthGrid(viewYear, viewMonth), [viewYear, viewMonth])
  const monthLabel = useMemo(
    () => new Intl.DateTimeFormat(BCP47[locale], { month: 'long', year: 'numeric' }).format(new Date(viewYear, viewMonth, 1)),
    [locale, viewYear, viewMonth],
  )

  function goPrevMonth() {
    setViewMonth((m) => {
      if (m === 0) {
        setViewYear((y) => y - 1)
        return 11
      }
      return m - 1
    })
  }

  function goNextMonth() {
    setViewMonth((m) => {
      if (m === 11) {
        setViewYear((y) => y + 1)
        return 0
      }
      return m + 1
    })
  }

  function handleSelectDay(day: Date) {
    if (isDayDisabled(day, now)) return
    selectDay(toDateKey(day))
  }

  return (
    <div>
      <h3 className="mb-1 text-lg font-extrabold text-ink">{s.title}</h3>
      <p className="mb-6 text-sm text-slate">{s.subtitle}</p>

      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={goPrevMonth}
          aria-label={s.previousMonth}
          className="flex h-8 w-8 items-center justify-center rounded-md border-[1.5px] border-navy/15 text-ink"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
        <span className="text-sm font-extrabold capitalize text-ink">{monthLabel}</span>
        <button
          type="button"
          onClick={goNextMonth}
          aria-label={s.nextMonth}
          className="flex h-8 w-8 items-center justify-center rounded-md border-[1.5px] border-navy/15 text-ink"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      <div className="mb-1.5 grid grid-cols-7 gap-1 text-center text-[11px] font-bold uppercase tracking-[0.02em] text-slate">
        {s.weekdayShort.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      <div className="mb-6 grid grid-cols-7 gap-1">
        {days.map((day) => {
          const inMonth = day.getMonth() === viewMonth
          const disabled = !inMonth || isDayDisabled(day, now)
          const selected = inMonth && form.date === toDateKey(day)
          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={disabled}
              onClick={() => handleSelectDay(day)}
              className={cn(
                'flex aspect-square items-center justify-center rounded-md text-[13px] font-semibold transition-colors',
                !inMonth && 'invisible',
                inMonth && disabled && 'cursor-not-allowed text-muted',
                inMonth && !disabled && !selected && 'text-ink hover:bg-surface',
                selected && 'bg-gradient-accent font-extrabold text-white',
              )}
            >
              {day.getDate()}
            </button>
          )
        })}
      </div>

      <div>
        <p className="mb-2.5 text-xs font-bold uppercase tracking-[0.03em] text-ink">{s.slotsTitle}</p>
        {!form.date && <p className="text-sm text-slate">{s.selectDayFirst}</p>}
        {form.date && !slotsLoading && (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {TIME_SLOTS.map((time) => {
              const disabled = isSlotDisabled(form.date!, time, now, bookedKeys ?? new Set())
              const selected = form.time === time
              return (
                <button
                  key={time}
                  type="button"
                  disabled={disabled}
                  onClick={() => selectSlot(time)}
                  className={cn(
                    'rounded-md px-3 py-2.5 text-[13.5px] font-bold transition-colors',
                    disabled && 'cursor-not-allowed border-[1.5px] border-navy/[0.06] bg-surface text-muted',
                    !disabled && !selected && 'border-[1.5px] border-navy/15 bg-white text-ink',
                    selected && 'bg-gradient-accent text-white',
                  )}
                >
                  {time}
                </button>
              )
            })}
          </div>
        )}
        {form.date && slotsLoading && <p className="text-sm text-slate">{t.common.loading}</p>}
      </div>
    </div>
  )
}
