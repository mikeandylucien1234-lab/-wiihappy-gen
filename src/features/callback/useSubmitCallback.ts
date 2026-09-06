import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { CallbackFormData } from './types'

async function submitCallback(form: CallbackFormData) {
  const { error } = await supabase.from('callback_requests').insert({
    nom_complet: form.nomComplet.trim(),
    whatsapp: form.whatsapp.trim(),
    email: form.email.trim(),
  })

  if (error) throw new Error(`Échec de l'envoi : ${error.message}`)
}

export function useSubmitCallback() {
  return useMutation({ mutationFn: submitCallback })
}
