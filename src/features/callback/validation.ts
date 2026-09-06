import type { CallbackFormData } from './types'

/** Returns an error message if the form is incomplete, or null if it's valid. */
export function validateCallbackForm(form: CallbackFormData): string | null {
  if (!form.nomComplet.trim()) return 'Merci de renseigner votre nom complet.'
  if (!form.whatsapp.trim()) return 'Merci de renseigner votre numéro WhatsApp.'
  if (!form.email.trim()) return 'Merci de renseigner votre email.'
  return null
}
