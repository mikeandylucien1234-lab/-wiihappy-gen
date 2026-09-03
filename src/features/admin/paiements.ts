import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/lib/database.types'

type PaiementInsert = Database['public']['Tables']['paiements']['Insert']

export function useAdminPaiements() {
  return useQuery({
    queryKey: ['admin', 'paiements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('paiements')
        .select('*, devis:devis_id(id,name,email,category,op_type,status)')
        .order('created_at', { ascending: false })
      if (error) throw error
      return data
    },
  })
}

/** Accepted devis that don't have a payment record yet — candidates for a new one. */
export function useAcceptedDevisWithoutPaiement() {
  return useQuery({
    queryKey: ['admin', 'devis', 'accepted-unpaid'],
    queryFn: async () => {
      const [{ data: devis, error: devisError }, { data: paiements, error: paiementsError }] = await Promise.all([
        supabase.from('devis').select('id,name,email,category,op_type').eq('status', 'accepte'),
        supabase.from('paiements').select('devis_id'),
      ])
      if (devisError) throw devisError
      if (paiementsError) throw paiementsError
      const paidIds = new Set(paiements.map((p) => p.devis_id))
      return devis.filter((d) => !paidIds.has(d.id))
    },
  })
}

export function useCreatePaiement() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (input: PaiementInsert) => {
      const { error } = await supabase.from('paiements').insert(input)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'paiements'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'devis', 'accepted-unpaid'] })
    },
  })
}
