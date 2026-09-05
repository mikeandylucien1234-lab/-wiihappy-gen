import type { BookingFormData } from './types'

/** Per-step validation. Returns an error message for the step, or null if it's valid. */
export function validateBookingStep(step: number, form: BookingFormData): string | null {
  switch (step) {
    case 1:
      if (!form.date || !form.time) return 'Merci de choisir un jour et un créneau.'
      return null

    case 2: {
      if (!form.nomComplet.trim()) return 'Merci de renseigner votre nom complet.'
      if (!form.whatsapp.trim()) return 'Merci de renseigner votre numéro WhatsApp.'
      if (!form.email.trim()) return 'Merci de renseigner votre email.'
      return null
    }

    case 3:
      return null

    default:
      return null
  }
}
