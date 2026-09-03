import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button, Input, Label } from '@/components/ui'
import { useAuth } from '@/features/auth/AuthContext'
import {
  usePendingInvites,
  useRevokeInvite,
  useSendInvite,
  useTeamRoster,
  useUpdateTeamMember,
} from '@/features/admin/team'
import type { AdminRole } from '@/lib/database.types'
import { cn } from '@/lib/cn'
import { Route as AdminRoute } from '@/routes/admin/route'

export const Route = createFileRoute('/admin/equipe')({
  component: AdminEquipe,
})

const avatarGradients = [
  'bg-gradient-primary-diag',
  'bg-gradient-accent-diag',
  'bg-gradient-to-br from-primary to-primary-dark',
  'bg-gradient-avatar-neutral',
]

const roleOptions: { role: AdminRole; description: string }[] = [
  { role: 'Admin', description: "Accès complet : gestion de l'équipe, paramètres, paiements, contenu et devis." },
  { role: 'Agent', description: 'Peut traiter les devis, gérer les clients et consulter les statistiques.' },
  { role: 'Lecture seule', description: 'Peut uniquement consulter les devis et statistiques, sans modification.' },
]

function initialsOf(name: string) {
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
}

function InviteModal({ onClose }: { onClose: () => void }) {
  const { user } = useAuth()
  const sendInvite = useSendInvite()
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<AdminRole>('Agent')

  function handleSend() {
    if (!email.trim() || !user) return
    sendInvite.mutate({ email: email.trim(), role, invitedBy: user.id }, { onSuccess: onClose })
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-primary-dark/45 p-5" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[460px] rounded-2xl bg-white p-[30px] shadow-modal"
      >
        <h3 className="mb-5 text-lg font-extrabold text-ink">Inviter un membre</h3>

        <div className="mb-4">
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="prenom.nom@wiihappy.com"
          />
        </div>

        <Label className="mb-2">Rôle</Label>
        <div className="mb-[22px] flex flex-col gap-2.5">
          {roleOptions.map((opt) => (
            <button
              key={opt.role}
              type="button"
              onClick={() => setRole(opt.role)}
              className={cn(
                'rounded-md border-[1.5px] p-3.5 text-left font-sans transition-colors',
                role === opt.role ? 'border-primary bg-primary/5' : 'border-navy/[0.12] bg-white',
              )}
            >
              <div className="mb-0.5 text-sm font-extrabold text-ink">{opt.role}</div>
              <div className="text-xs text-slate">{opt.description}</div>
            </button>
          ))}
        </div>

        {sendInvite.isError && <p className="mb-3 text-sm font-semibold text-danger">Échec de l&apos;invitation.</p>}

        <div className="flex justify-end gap-2.5">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Annuler
          </Button>
          <Button type="button" variant="accent" size="sm" onClick={handleSend} disabled={!email.trim() || sendInvite.isPending}>
            {sendInvite.isPending ? 'Envoi...' : "Envoyer l'invitation"}
          </Button>
        </div>
      </div>
    </div>
  )
}

function AdminEquipe() {
  const { adminUser } = AdminRoute.useRouteContext()
  const canManage = adminUser.role === 'Admin'

  const { data: members, isLoading } = useTeamRoster()
  const { data: invites } = usePendingInvites()
  const updateMember = useUpdateTeamMember()
  const revokeInvite = useRevokeInvite()
  const [inviteOpen, setInviteOpen] = useState(false)

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold tracking-[-0.5px] text-ink">Équipe & rôles</h1>
        {canManage && (
          <Button variant="accent" size="md" onClick={() => setInviteOpen(true)}>
            + Inviter un membre
          </Button>
        )}
      </div>

      {isLoading && <p className="text-sm text-slate">Chargement...</p>}

      {members && (
        <div className="overflow-hidden rounded-lg bg-white shadow-card">
          <div className="overflow-x-auto">
            <div className="min-w-[820px]">
              <div className="grid grid-cols-[0.6fr_1.3fr_1.5fr_0.9fr_0.8fr_1.1fr] gap-3 border-b border-navy/[0.08] px-5 py-3.5 text-xs font-extrabold uppercase tracking-[0.03em] text-slate">
                <span>Avatar</span>
                <span>Nom</span>
                <span>Email</span>
                <span>Rôle</span>
                <span>Statut</span>
                <span>Action</span>
              </div>

              {members.map((m, i) => (
                <div
                  key={m.id}
                  className="grid grid-cols-[0.6fr_1.3fr_1.5fr_0.9fr_0.8fr_1.1fr] items-center gap-3 border-b border-navy/[0.06] px-5 py-3.5 text-[13.5px]"
                >
                  <span
                    className={cn(
                      'flex h-[34px] w-[34px] items-center justify-center rounded-full text-xs font-extrabold text-white',
                      avatarGradients[i % avatarGradients.length],
                    )}
                  >
                    {initialsOf(m.name)}
                  </span>
                  <span className="truncate font-bold text-ink">{m.name}</span>
                  <span className="truncate text-slate">{m.email}</span>
                  <select
                    value={m.role}
                    disabled={!canManage}
                    onChange={(e) => updateMember.mutate({ id: m.id, role: e.target.value as AdminRole })}
                    className="w-fit rounded-md border-[1.5px] border-navy/[0.12] bg-surface px-2.5 py-1.5 text-xs font-bold text-ink"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Agent">Agent</option>
                    <option value="Lecture seule">Lecture seule</option>
                  </select>
                  <span
                    className={cn(
                      'w-fit rounded-pill px-3 py-1 text-xs font-bold',
                      m.active ? 'bg-success/[0.12] text-success' : 'bg-slate/[0.12] text-slate',
                    )}
                  >
                    {m.active ? 'Actif' : 'Inactif'}
                  </span>
                  {canManage && (
                    <button
                      type="button"
                      onClick={() => updateMember.mutate({ id: m.id, active: !m.active })}
                      className={cn(
                        'w-fit rounded-pill border-[1.5px] px-3 py-1.5 text-xs font-bold',
                        m.active ? 'border-danger/20 bg-danger/[0.08] text-danger' : 'border-success/25 bg-success/10 text-success',
                      )}
                    >
                      {m.active ? 'Désactiver' : 'Réactiver'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {invites && invites.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-3 text-base font-extrabold text-ink">Invitations en attente</h2>
          <div className="flex flex-col gap-2">
            {invites.map((inv) => (
              <div
                key={inv.email}
                className="flex items-center justify-between gap-3 rounded-lg bg-white px-5 py-3 text-[13.5px] shadow-card"
              >
                <span className="font-semibold text-ink">{inv.email}</span>
                <span className="text-slate">{inv.role}</span>
                {canManage && (
                  <button type="button" onClick={() => revokeInvite.mutate(inv.email)} className="text-xs font-bold text-danger">
                    Annuler
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {inviteOpen && <InviteModal onClose={() => setInviteOpen(false)} />}
    </div>
  )
}
