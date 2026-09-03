import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

/**
 * Devis list/detail queries rely entirely on RLS ("Authenticated users can view their
 * own devis", user_id = auth.uid()) to scope results — no explicit .eq('user_id', ...)
 * needed or wanted here.
 */
export function useMyDevis() {
  return useQuery({
    queryKey: ['devis', 'mine'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('devis')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return data
    },
  })
}

export function useDevisDetail(id: string) {
  return useQuery({
    queryKey: ['devis', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('devis').select('*').eq('id', id).maybeSingle()
      if (error) throw error
      return data
    },
  })
}

/**
 * Returns null both when there's no payment row yet AND when RLS hides it (devis not
 * "accepte", or not owned by the caller) — either way the UI should just not show the
 * payment section, so both cases collapse to the same "no data" result.
 */
export function usePaiement(devisId: string, enabled: boolean) {
  return useQuery({
    queryKey: ['paiement', devisId],
    queryFn: async () => {
      const { data, error } = await supabase.from('paiements').select('*').eq('devis_id', devisId).maybeSingle()
      if (error) throw error
      return data
    },
    enabled,
  })
}
