import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { QuoteFormData } from './types'

const ATTACHMENTS_BUCKET = 'devis-attachments'

async function uploadAttachments(attachments: File[]): Promise<string[]> {
  const paths: string[] = []

  for (const file of attachments) {
    const path = `${crypto.randomUUID()}-${file.name}`
    const { error } = await supabase.storage.from(ATTACHMENTS_BUCKET).upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    })
    if (error) {
      throw new Error(`Échec de l'envoi du fichier "${file.name}" : ${error.message}`)
    }
    paths.push(path)
  }

  return paths
}

async function submitQuote(form: QuoteFormData & { sourcePage?: string }) {
  const attachmentPaths = await uploadAttachments(form.attachments)

  // No .select() here: the anon role can only INSERT into devis (see
  // supabase/migrations/0001_init.sql), not SELECT, so asking PostgREST to
  // return the inserted row would fail its own RLS check on the read-back
  // even though the insert itself succeeded.
  const { error } = await supabase.from('devis').insert({
    op_type: form.opType,
    name: form.name.trim(),
    whatsapp: form.whatsapp.trim() || null,
    email: form.email.trim() || null,
    category: form.category,
    description: form.description.trim(),
    quantity: form.quantity.trim() || null,
    budget: form.budget.trim() || null,
    country: form.country.trim() || null,
    transport: form.transport,
    attachment_paths: attachmentPaths,
    source_page: form.sourcePage ?? null,
  })

  if (error) {
    throw new Error(`Échec de l'envoi de la demande : ${error.message}`)
  }
}

export function useSubmitQuote() {
  return useMutation({
    mutationFn: submitQuote,
  })
}
