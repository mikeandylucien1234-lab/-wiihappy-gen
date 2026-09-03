import type { ReactNode } from 'react'
import type { OperationType } from '@/features/quote-form/types'

/**
 * Structural/data fields only — every user-facing string (eyebrow, title, steps,
 * category labels, CTAs...) lives in the locale files under t.servicePages, keyed by
 * the same `slug`, so it can be translated without touching this file.
 */
export type ServiceSlug = 'importation' | 'exportation' | 'sourcing-personnalise' | 'accompagnement-douane'

export interface ServiceMeta {
  slug: ServiceSlug
  opType: OperationType
  defaultCategory: string
  iconColor: string
  icon: ReactNode
  /** Value written to the quote form's category field for each of the 4 shared category tiles. */
  categoryValues: string[]
}

export const services: ServiceMeta[] = [
  {
    slug: 'importation',
    opType: 'Import',
    defaultCategory: 'Véhicules',
    iconColor: '#0057D9',
    icon: <path d="M2 12h13m0 0-4-4m4 4-4 4M15 6h5v12h-5" />,
    categoryValues: ['Véhicules', 'Alimentation', 'Habillement', 'Autre'],
  },
  {
    slug: 'exportation',
    opType: 'Export',
    defaultCategory: 'Véhicules',
    iconColor: '#0057D9',
    icon: (
      <>
        <rect x="3" y="10" width="14" height="8" rx="1.5" />
        <path d="M3 10l3-5h6l3 5M17 13h4l2 3v2h-6" />
      </>
    ),
    categoryValues: ['Véhicules', 'Alimentation', 'Habillement', 'Autre'],
  },
  {
    slug: 'sourcing-personnalise',
    opType: 'Import',
    defaultCategory: 'Autre',
    iconColor: '#FF8C00',
    icon: (
      <>
        <rect x="4" y="10" width="16" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
    categoryValues: ['Véhicules', 'Alimentation', 'Habillement', 'Autre'],
  },
  {
    slug: 'accompagnement-douane',
    opType: 'Import',
    defaultCategory: 'Véhicules',
    iconColor: '#FF8C00',
    icon: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 8h6M9 12h6M9 16h4" />
      </>
    ),
    categoryValues: ['Véhicules', 'Alimentation', 'Habillement', 'Autre'],
  },
]

export function getServiceBySlug(slug: string): ServiceMeta | undefined {
  return services.find((service) => service.slug === slug)
}
