import type { DevisStatus } from '@/lib/database.types'

export const statusLabels: Record<DevisStatus, string> = {
  nouveau: 'Nouveau',
  en_cours: 'En cours',
  accepte: 'Accepté',
  refuse: 'Refusé',
  traite: 'Traité',
  archive: 'Archivé',
}

export const statusBadgeVariant: Record<DevisStatus, 'info' | 'warning' | 'success' | 'danger' | 'neutral'> = {
  nouveau: 'info',
  en_cours: 'warning',
  accepte: 'success',
  refuse: 'danger',
  traite: 'success',
  archive: 'neutral',
}
