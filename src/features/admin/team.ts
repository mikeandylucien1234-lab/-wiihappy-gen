import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { AdminRole } from '@/lib/database.types'

export function useTeamRoster() {
  return useQuery({
    queryKey: ['admin', 'team'],
    queryFn: async () => {
      const { data, error } = await supabase.from('admin_users').select('*').order('created_at', { ascending: true })
      if (error) throw error
      return data
    },
  })
}

export function usePendingInvites() {
  return useQuery({
    queryKey: ['admin', 'invites'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_invites')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return data
    },
  })
}

export function useUpdateTeamMember() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, ...update }: { id: string; role?: AdminRole; active?: boolean }) => {
      const { error } = await supabase.from('admin_users').update(update).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'team'] }),
  })
}

export function useSendInvite() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ email, role, invitedBy }: { email: string; role: AdminRole; invitedBy: string }) => {
      const { error } = await supabase.from('admin_invites').insert({ email, role, invited_by: invitedBy })
      if (error) throw error
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'invites'] }),
  })
}

export function useRevokeInvite() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (email: string) => {
      const { error } = await supabase.from('admin_invites').delete().eq('email', email)
      if (error) throw error
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'invites'] }),
  })
}
