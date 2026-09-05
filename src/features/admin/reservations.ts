import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { ReservationStatut } from '@/lib/database.types'

export function useAdminReservations() {
  return useQuery({
    queryKey: ['admin', 'reservations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .order('date_appel', { ascending: true })
        .order('heure_appel', { ascending: true })
      if (error) throw error
      return data
    },
  })
}

export function useUpdateReservationStatus(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (statut: ReservationStatut) => {
      const { error } = await supabase.from('reservations').update({ statut }).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'reservations'] })
    },
  })
}
