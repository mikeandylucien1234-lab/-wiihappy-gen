import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { Locale } from '@/lib/database.types'

export const locales: Locale[] = ['fr', 'en', 'es']

export interface ContentRow {
  key: string
  values: Record<Locale, string>
}

export function useAdminContent() {
  return useQuery({
    queryKey: ['admin', 'content'],
    queryFn: async () => {
      const { data, error } = await supabase.from('site_content').select('*').order('key', { ascending: true })
      if (error) throw error

      const byKey = new Map<string, ContentRow>()
      for (const row of data) {
        const existing = byKey.get(row.key) ?? { key: row.key, values: { fr: '', en: '', es: '' } }
        existing.values[row.locale] = row.value
        byKey.set(row.key, existing)
      }
      return Array.from(byKey.values())
    },
  })
}

export function useUpsertContent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ key, locale, value }: { key: string; locale: Locale; value: string }) => {
      const { error } = await supabase.from('site_content').upsert({ key, locale, value }, { onConflict: 'key,locale' })
      if (error) throw error
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'content'] }),
  })
}
