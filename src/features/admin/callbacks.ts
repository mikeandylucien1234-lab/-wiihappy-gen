import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { CallbackStatut } from '@/lib/database.types'

export function useAdminCallbacks() {
  return useQuery({
    queryKey: ['admin', 'callback_requests'],
    queryFn: async () => {
      const { data, error } = await supabase.from('callback_requests').select('*').order('created_at', { ascending: false })
      if (error) throw error
      return data
    },
  })
}

export function useUpdateCallbackStatus(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (statut: CallbackStatut) => {
      const { error } = await supabase.from('callback_requests').update({ statut }).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'callback_requests'] })
    },
  })
}
