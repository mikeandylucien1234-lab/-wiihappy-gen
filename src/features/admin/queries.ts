import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { DevisStatus } from '@/lib/database.types'

const ATTACHMENTS_BUCKET = 'devis-attachments'

/** Staff-wide devis list — RLS ("Staff can view all devis") returns every row, not just the caller's. */
export function useAdminDevisList() {
  return useQuery({
    queryKey: ['admin', 'devis'],
    queryFn: async () => {
      const { data, error } = await supabase.from('devis').select('*').order('created_at', { ascending: false })
      if (error) throw error
      return data
    },
  })
}

export function useAdminDevisDetail(id: string) {
  return useQuery({
    queryKey: ['admin', 'devis', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('devis').select('*').eq('id', id).maybeSingle()
      if (error) throw error
      return data
    },
  })
}

export function useUpdateDevisStatus(devisId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (status: DevisStatus) => {
      const { error } = await supabase.from('devis').update({ status }).eq('id', devisId)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'devis'] })
    },
  })
}

export function useDevisNotes(devisId: string) {
  return useQuery({
    queryKey: ['admin', 'devis', devisId, 'notes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('devis_notes')
        .select('*')
        .eq('devis_id', devisId)
        .order('created_at', { ascending: false })
      if (error) throw error
      return data
    },
  })
}

export function useAddDevisNote(devisId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ body, authorName, authorId }: { body: string; authorName: string; authorId: string }) => {
      const { error } = await supabase
        .from('devis_notes')
        .insert({ devis_id: devisId, body, author_name: authorName, author_id: authorId })
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'devis', devisId, 'notes'] })
    },
  })
}

/** Signed URL (60s) to view/download one attachment — generated on demand, not stored. */
export async function getAttachmentSignedUrl(path: string) {
  const { data, error } = await supabase.storage.from(ATTACHMENTS_BUCKET).createSignedUrl(path, 60)
  if (error) throw error
  return data.signedUrl
}
