import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/lib/database.types'

type FaqItem = Database['public']['Tables']['faq_items']['Row']
export type FaqItemInput = Database['public']['Tables']['faq_items']['Insert']

const QUERY_KEY = ['admin', 'faq_items']

export function useAdminFaqItems() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const { data, error } = await supabase.from('faq_items').select('*').order('sort_order', { ascending: true })
      if (error) throw error
      return data
    },
  })
}

export function useCreateFaqItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (input: FaqItemInput) => {
      const { error } = await supabase.from('faq_items').insert(input)
      if (error) throw error
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  })
}

export function useUpdateFaqItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, ...patch }: Partial<FaqItem> & { id: string }) => {
      const { error } = await supabase.from('faq_items').update(patch).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  })
}

export function useDeleteFaqItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('faq_items').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  })
}

export function useSwapFaqOrder() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ a, b }: { a: FaqItem; b: FaqItem }) => {
      const [{ error: errorA }, { error: errorB }] = await Promise.all([
        supabase.from('faq_items').update({ sort_order: b.sort_order }).eq('id', a.id),
        supabase.from('faq_items').update({ sort_order: a.sort_order }).eq('id', b.id),
      ])
      if (errorA) throw errorA
      if (errorB) throw errorB
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  })
}
