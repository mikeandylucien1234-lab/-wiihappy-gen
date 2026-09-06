import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

export function useFaqItems() {
  return useQuery({
    queryKey: ['faq-items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('faq_items')
        .select('*')
        .eq('active', true)
        .order('sort_order', { ascending: true })
      if (error) throw error
      return data
    },
  })
}
