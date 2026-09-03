/**
 * Supabase database types for project "wiihappy-gen" (khgrbjrrgpjzchxobvty).
 *
 * Base structure generated with:
 *   npx supabase gen types typescript --project-id khgrbjrrgpjzchxobvty > src/lib/database.types.ts
 * ...with op_type/transport/status narrowed from `string` to the actual CHECK-constraint
 * literals (the generator doesn't infer those from Postgres CHECK constraints).
 *
 * Note: Row/Insert/Update must stay `type` aliases, not `interface`s — postgrest-js's
 * deeply conditional generic types (used to type `.from().insert()` etc.) fail to
 * resolve against `interface`-declared shapes and silently fall back to `never`.
 */

export type DevisStatus = 'nouveau' | 'en_cours' | 'accepte' | 'refuse' | 'traite' | 'archive'
export type DevisOpType = 'Import' | 'Export'
export type DevisTransport = 'Aérien' | 'Maritime'

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: '14.5'
  }
  public: {
    Tables: {
      devis: {
        Row: {
          attachment_paths: string[]
          budget: string | null
          category: string
          country: string | null
          created_at: string
          description: string
          email: string | null
          id: string
          name: string
          op_type: DevisOpType
          quantity: string | null
          source_page: string | null
          status: DevisStatus
          transport: DevisTransport | null
          user_id: string | null
          whatsapp: string | null
        }
        Insert: {
          attachment_paths?: string[]
          budget?: string | null
          category: string
          country?: string | null
          created_at?: string
          description: string
          email?: string | null
          id?: string
          name: string
          op_type: DevisOpType
          quantity?: string | null
          source_page?: string | null
          status?: DevisStatus
          transport?: DevisTransport | null
          user_id?: string | null
          whatsapp?: string | null
        }
        Update: {
          attachment_paths?: string[]
          budget?: string | null
          category?: string
          country?: string | null
          created_at?: string
          description?: string
          email?: string | null
          id?: string
          name?: string
          op_type?: DevisOpType
          quantity?: string | null
          source_page?: string | null
          status?: DevisStatus
          transport?: DevisTransport | null
          user_id?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      paiements: {
        Row: {
          amount: number
          bic: string | null
          created_at: string
          currency: string
          devis_id: string
          due_date: string | null
          iban: string | null
          id: string
          instructions: string | null
          reference: string | null
        }
        Insert: {
          amount: number
          bic?: string | null
          created_at?: string
          currency?: string
          devis_id: string
          due_date?: string | null
          iban?: string | null
          id?: string
          instructions?: string | null
          reference?: string | null
        }
        Update: {
          amount?: number
          bic?: string | null
          created_at?: string
          currency?: string
          devis_id?: string
          due_date?: string | null
          iban?: string | null
          id?: string
          instructions?: string | null
          reference?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'paiements_devis_id_fkey'
            columns: ['devis_id']
            isOneToOne: false
            referencedRelation: 'devis'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
