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

  // Attach the devis to the logged-in user, if any, so it shows up in their
  // "Mon compte" area. Read fresh at submit time rather than threading auth
  // state through the form context — a user could log in partway through
  // filling the form. Anonymous submissions (no session) keep user_id null.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // No .select() here: neither the anon nor the authenticated RLS policy on
  // devis grants SELECT to the submitter beyond re-reading their own rows —
  // and even for a logged-in user, asking PostgREST to read the row back
  // (Prefer: return=representation) is an extra round-trip we don't need,
  // since the UI only shows a static confirmation screen.
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
    user_id: user?.id ?? null,
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
