export type OperationType = 'Import' | 'Export'
export type TransportType = 'Aérien' | 'Maritime'

export const STEP_COUNT = 5

/** Step ids only — labels are localized, see t.quoteSteps.labels (same order/count). */
export const STEPS = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }] as const

export interface QuoteFormData {
  opType: OperationType
  name: string
  whatsapp: string
  email: string
  category: string
  description: string
  quantity: string
  budget: string
  attachments: File[]
  country: string
  transport: TransportType
}

export const initialQuoteForm: QuoteFormData = {
  opType: 'Import',
  name: '',
  whatsapp: '',
  email: '',
  category: 'Véhicules',
  description: '',
  quantity: '',
  budget: '',
  attachments: [],
  country: '',
  transport: 'Maritime',
}

/** What CTAs pass to prefill the form (category tile, service page, header, ...). */
export interface QuoteFormPrefill {
  opType?: OperationType
  category?: string
  description?: string
  /** Slug/id of the page or widget that triggered the drawer, stored as devis.source_page. */
  sourcePage?: string
}
