import { createFileRoute, Link } from '@tanstack/react-router'
import { Badge } from '@/components/ui'
import { useAdminClients } from '@/features/admin/clients'

export const Route = createFileRoute('/admin/clients')({
  component: AdminClients,
})

function AdminClients() {
  const { clients, isLoading, isError } = useAdminClients()

  return (
    <div>
      <h1 className="mb-1 text-2xl font-extrabold tracking-[-0.5px] text-ink">Clients</h1>
      <p className="mb-6 text-sm text-slate">Dérivé des demandes de devis — comptes enregistrés et invités.</p>

      {isLoading && <p className="text-sm text-slate">Chargement...</p>}
      {isError && (
        <p className="rounded-md bg-danger/[0.08] px-3 py-2.5 text-sm font-semibold text-danger">
          Impossible de charger les clients.
        </p>
      )}

      {clients.length > 0 && (
        <div className="overflow-hidden rounded-lg bg-white shadow-card">
          <div className="overflow-x-auto">
            <div className="min-w-[720px]">
              <div className="grid grid-cols-[1.3fr_1.3fr_0.8fr_0.7fr_1fr] gap-3 border-b border-navy/[0.08] px-5 py-3.5 text-xs font-extrabold uppercase tracking-[0.03em] text-slate">
                <span>Nom</span>
                <span>Contact</span>
                <span>Compte</span>
                <span>Devis</span>
                <span>Dernière activité</span>
              </div>
              {clients.map((c) => (
                <div
                  key={c.key}
                  className="grid grid-cols-[1.3fr_1.3fr_0.8fr_0.7fr_1fr] items-center gap-3 border-b border-navy/[0.06] px-5 py-3.5 text-[13.5px]"
                >
                  <span className="truncate font-bold text-ink">{c.name}</span>
                  <span className="truncate text-slate">{c.email ?? c.whatsapp ?? '—'}</span>
                  <span>
                    <Badge variant={c.registered ? 'success' : 'neutral'}>{c.registered ? 'Inscrit' : 'Sans compte'}</Badge>
                  </span>
                  {c.devisCount === 1 ? (
                    <Link
                      to="/admin/devis/$devisId"
                      params={{ devisId: c.devisIds[0] }}
                      className="font-bold text-primary"
                    >
                      {c.devisCount}
                    </Link>
                  ) : (
                    <span className="font-bold text-ink">{c.devisCount}</span>
                  )}
                  <span className="text-slate">
                    {new Date(c.lastActivity).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
