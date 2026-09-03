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
export type AdminRole = 'Admin' | 'Agent' | 'Lecture seule'
export type Locale = 'fr' | 'en' | 'es'

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: '14.5'
  }
  public: {
    Tables: {
      admin_invites: {
        Row: {
          created_at: string
          email: string
          invited_by: string | null
          role: AdminRole
        }
        Insert: {
          created_at?: string
          email: string
          invited_by?: string | null
          role: AdminRole
        }
        Update: {
          created_at?: string
          email?: string
          invited_by?: string | null
          role?: AdminRole
        }
        Relationships: []
      }
      admin_users: {
        Row: {
          active: boolean
          created_at: string
          email: string
          id: string
          name: string
          role: AdminRole
        }
        Insert: {
          active?: boolean
          created_at?: string
          email: string
          id: string
          name: string
          role: AdminRole
        }
        Update: {
          active?: boolean
          created_at?: string
          email?: string
          id?: string
          name?: string
          role?: AdminRole
        }
        Relationships: []
      }
      categories: {
        Row: {
          active: boolean
          created_at: string
          id: string
          label: string
          placeholder_label: string | null
          slug: string
          sort_order: number
        }
        Insert: {
          active?: boolean
          created_at?: string
          id?: string
          label: string
          placeholder_label?: string | null
          slug: string
          sort_order?: number
        }
        Update: {
          active?: boolean
          created_at?: string
          id?: string
          label?: string
          placeholder_label?: string | null
          slug?: string
          sort_order?: number
        }
        Relationships: []
      }
      devis_notes: {
        Row: {
          author_id: string | null
          author_name: string
          body: string
          created_at: string
          devis_id: string
          id: string
        }
        Insert: {
          author_id?: string | null
          author_name: string
          body: string
          created_at?: string
          devis_id: string
          id?: string
        }
        Update: {
          author_id?: string | null
          author_name?: string
          body?: string
          created_at?: string
          devis_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'devis_notes_devis_id_fkey'
            columns: ['devis_id']
            isOneToOne: false
            referencedRelation: 'devis'
            referencedColumns: ['id']
          },
        ]
      }
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
          stale_alert_sent_at: string | null
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
          stale_alert_sent_at?: string | null
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
          stale_alert_sent_at?: string | null
          status?: DevisStatus
          transport?: DevisTransport | null
          user_id?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          devis_id: string | null
          id: string
          read: boolean
          title: string
          type: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          devis_id?: string | null
          id?: string
          read?: boolean
          title: string
          type?: string
        }
        Update: {
          body?: string | null
          created_at?: string
          devis_id?: string | null
          id?: string
          read?: boolean
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: 'notifications_devis_id_fkey'
            columns: ['devis_id']
            isOneToOne: false
            referencedRelation: 'devis'
            referencedColumns: ['id']
          },
        ]
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
      site_content: {
        Row: {
          created_at: string
          id: string
          key: string
          locale: Locale
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          locale: Locale
          updated_at?: string
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          locale?: Locale
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          key: string
          updated_at: string
          value: string
        }
        Insert: {
          key: string
          updated_at?: string
          value: string
        }
        Update: {
          key?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
