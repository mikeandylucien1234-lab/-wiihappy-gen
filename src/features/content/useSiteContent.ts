import { useQuery } from '@tanstack/react-query'
import { useLocale } from '@/i18n/LocaleContext'
import { supabase } from '@/lib/supabase'

/** Reads one editable content block (see admin → Contenu) for the current locale. */
export function useSiteContent(key: string) {
  const { locale } = useLocale()
  return useQuery({
    queryKey: ['site-content', key, locale],
    queryFn: async () => {
      const { data, error } = await supabase.from('site_content').select('value').eq('key', key).eq('locale', locale).maybeSingle()
      if (error) throw error
      return data?.value ?? ''
    },
  })
}
