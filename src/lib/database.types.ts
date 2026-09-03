/**
 * Supabase database types, hand-written to match supabase/migrations/0001_init.sql.
 *
 * Once a live project is connected, regenerate (and diff) with:
 *   npx supabase gen types typescript --project-id <project-ref> > src/lib/database.types.ts
 *
 * Note: these must stay `type` aliases, not `interface`s — postgrest-js's deeply
 * conditional generic types (used to type `.from().insert()` etc.) fail to
 * resolve against `interface`-declared Row/Insert/Update shapes and silently
 * fall back to `never`.
 */

export type DevisStatus = 'nouveau' | 'en_cours' | 'traite' | 'archive'
export type DevisOpType = 'Import' | 'Export'
export type DevisTransport = 'Aérien' | 'Maritime'

export type DevisRow = {
  id: string
  created_at: string
  status: DevisStatus
  op_type: DevisOpType
  name: string
  whatsapp: string | null
  email: string | null
  category: string
  description: string
  quantity: string | null
  budget: string | null
  country: string | null
  transport: DevisTransport | null
  attachment_paths: string[]
  source_page: string | null
}

export type DevisInsert = Omit<DevisRow, 'id' | 'created_at' | 'status' | 'attachment_paths'> & {
  id?: string
  created_at?: string
  status?: DevisStatus
  attachment_paths?: string[]
}

export type DevisUpdate = Partial<DevisInsert>

export type Database = {
  public: {
    Tables: {
      devis: {
        Row: DevisRow
        Insert: DevisInsert
        Update: DevisUpdate
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
