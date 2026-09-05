import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { slotKey, toDateKey } from './slots'

/** Booked (date, time) pairs for the given month, as a `${YYYY-MM-DD}T${HH:mm}` set
 * for O(1) lookup — fetched via the public get_booked_slots RPC, which never returns
 * who booked a slot, only that it's taken. */
export function useBookedSlots(year: number, month: number) {
  const start = toDateKey(new Date(year, month, 1))
  const end = toDateKey(new Date(year, month + 1, 0))

  return useQuery({
    queryKey: ['booking', 'booked-slots', start, end],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_booked_slots', { p_start: start, p_end: end })
      if (error) throw error
      return new Set(data.map((row) => slotKey(row.date_appel, row.heure_appel.slice(0, 5))))
    },
    // Fail fast rather than leaving the calendar stuck on "loading" — a network
    // hiccup shouldn't block booking; worst case a just-taken slot briefly still
    // shows as pickable and the unique-constraint insert on submit catches it.
    retry: 1,
  })
}
