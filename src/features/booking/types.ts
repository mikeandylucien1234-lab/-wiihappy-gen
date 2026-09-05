import type { ReservationMotif } from '@/lib/database.types'

export const STEP_COUNT = 3

/** Fixed daily slots, 'HH:mm' — matches the Postgres `time` column's leading digits. */
export const TIME_SLOTS = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'] as const

export interface BookingFormData {
  /** 'YYYY-MM-DD', or null until a day is picked. */
  date: string | null
  /** 'HH:mm', or null until a slot is picked. */
  time: string | null
  nomComplet: string
  whatsapp: string
  email: string
  motif: ReservationMotif
  notes: string
}

export const initialBookingForm: BookingFormData = {
  date: null,
  time: null,
  nomComplet: '',
  whatsapp: '',
  email: '',
  motif: 'Question générale',
  notes: '',
}
