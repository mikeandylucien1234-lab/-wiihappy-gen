import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { BookingFormData } from './types'

const UNIQUE_VIOLATION = '23505'

async function submitReservation(form: BookingFormData) {
  if (!form.date || !form.time) throw new Error('Merci de choisir un jour et un créneau.')

  const { error } = await supabase.from('reservations').insert({
    nom_complet: form.nomComplet.trim(),
    whatsapp: form.whatsapp.trim(),
    email: form.email.trim(),
    motif: form.motif,
    notes: form.notes.trim() || null,
    date_appel: form.date,
    heure_appel: `${form.time}:00`,
  })

  if (error) {
    if (error.code === UNIQUE_VIOLATION) {
      throw new Error('Ce créneau vient d’être réservé par quelqu’un d’autre. Merci d’en choisir un autre.')
    }
    throw new Error(`Échec de la réservation : ${error.message}`)
  }
}

export function useSubmitReservation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: submitReservation,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['booking', 'booked-slots'] })
    },
  })
}
