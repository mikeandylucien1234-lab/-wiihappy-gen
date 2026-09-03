import { useMemo } from 'react'
import { useAdminDevisList } from './queries'

export interface AdminClient {
  key: string
  name: string
  email: string | null
  whatsapp: string | null
  registered: boolean
  devisCount: number
  lastActivity: string
  devisIds: string[]
}

/** Clients aren't a table of their own — derived by grouping devis by user_id (registered) or email (guest). */
export function useAdminClients() {
  const { data: devis, isLoading, isError } = useAdminDevisList()

  const clients = useMemo(() => {
    if (!devis) return []
    const byKey = new Map<string, AdminClient>()

    for (const d of devis) {
      const key = d.user_id ?? d.email ?? d.whatsapp ?? d.id
      const existing = byKey.get(key)
      if (existing) {
        existing.devisCount += 1
        existing.devisIds.push(d.id)
        if (d.created_at > existing.lastActivity) existing.lastActivity = d.created_at
      } else {
        byKey.set(key, {
          key,
          name: d.name,
          email: d.email,
          whatsapp: d.whatsapp,
          registered: d.user_id !== null,
          devisCount: 1,
          lastActivity: d.created_at,
          devisIds: [d.id],
        })
      }
    }

    return Array.from(byKey.values()).sort((a, b) => (a.lastActivity < b.lastActivity ? 1 : -1))
  }, [devis])

  return { clients, isLoading, isError }
}
