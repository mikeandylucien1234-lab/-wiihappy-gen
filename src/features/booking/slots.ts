import { TIME_SLOTS } from './types'

/** Local YYYY-MM-DD, not UTC — avoids off-by-one-day bugs from toISOString(). */
export function toDateKey(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function slotKey(dateKey: string, time: string): string {
  return `${dateKey}T${time}`
}

/** Sunday = 0 in JS's getDay(); the business is closed that day. */
export function isSunday(d: Date): boolean {
  return d.getDay() === 0
}

export function isPastDay(d: Date, today: Date): boolean {
  return toDateKey(d) < toDateKey(today)
}

/** A whole day is unbookable if it's a Sunday, in the past, or — since every one of
 * its slots would fail the 24h-notice rule — "today" once the last slot (17:00) is
 * already within the 24h window. Kept separate from per-slot filtering so the
 * calendar can gray out the whole day instead of leaving a technically-clickable
 * day with zero enabled slots. */
export function isDayDisabled(d: Date, now: Date): boolean {
  if (isSunday(d)) return true
  if (isPastDay(d, now)) return true
  const dateKey = toDateKey(d)
  if (dateKey === toDateKey(now)) {
    const lastSlot = TIME_SLOTS[TIME_SLOTS.length - 1]
    return isSlotTooSoon(dateKey, lastSlot, now)
  }
  return false
}

/** 24h-advance rule: a slot's own date+time must be at least 24h from now. */
export function isSlotTooSoon(dateKey: string, time: string, now: Date): boolean {
  const [h, m] = time.split(':').map(Number)
  const [y, mo, da] = dateKey.split('-').map(Number)
  const slotDate = new Date(y, mo - 1, da, h, m)
  return slotDate.getTime() - now.getTime() < 24 * 60 * 60 * 1000
}

export function isSlotDisabled(dateKey: string, time: string, now: Date, bookedKeys: Set<string>): boolean {
  if (isSlotTooSoon(dateKey, time, now)) return true
  return bookedKeys.has(slotKey(dateKey, time))
}

/** Monday-first 6xN grid for the given month, padded with the trailing days of the
 * previous/next month so every week row is complete. */
export function getMonthGrid(year: number, month: number): Date[] {
  const first = new Date(year, month, 1)
  const startOffset = (first.getDay() + 6) % 7 // Monday = 0
  const gridStart = new Date(year, month, 1 - startOffset)

  const days: Date[] = []
  for (let i = 0; i < 42; i++) {
    days.push(new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + i))
  }
  return days
}
