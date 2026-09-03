import type { QuoteFormData } from './types'

/** Per-step validation. Returns an error message for the step, or null if it's valid. */
export function validateStep(step: number, form: QuoteFormData): string | null {
  switch (step) {
    case 1:
      return form.opType ? null : 'Merci de choisir un type d’opération.'

    case 2: {
      if (!form.name.trim()) return 'Merci de renseigner votre nom complet.'
      if (!form.whatsapp.trim() && !form.email.trim()) {
        return 'Merci de renseigner au moins un moyen de contact (WhatsApp ou email).'
      }
      return null
    }

    case 3: {
      if (!form.category.trim()) return 'Merci de choisir une catégorie de produit.'
      if (!form.description.trim()) return 'Merci de décrire votre besoin.'
      return null
    }

    case 4:
      return form.country.trim() ? null : 'Merci de renseigner le pays de livraison.'

    case 5:
      return null

    default:
      return null
  }
}
