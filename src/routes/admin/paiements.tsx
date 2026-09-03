import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Badge, Button, Input, Label, Select } from '@/components/ui'
import { statusBadgeVariant, statusLabels } from '@/features/account/status'
import { useAcceptedDevisWithoutPaiement, useAdminPaiements, useCreatePaiement } from '@/features/admin/paiements'
import { Route as AdminRoute } from '@/routes/admin/route'

export const Route = createFileRoute('/admin/paiements')({
  component: AdminPaiements,
})

function NewPaiementModal({ onClose }: { onClose: () => void }) {
  const { data: candidates } = useAcceptedDevisWithoutPaiement()
  const createPaiement = useCreatePaiement()

  const [devisId, setDevisId] = useState('')
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('EUR')
  const [reference, setReference] = useState('')
  const [iban, setIban] = useState('')
  const [bic, setBic] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [instructions, setInstructions] = useState('')

  function handleSubmit() {
    if (!devisId || !amount) return
    createPaiement.mutate(
      {
        devis_id: devisId,
        amount: Number(amount),
        currency,
        reference: reference || null,
        iban: iban || null,
        bic: bic || null,
        due_date: dueDate || null,
        instructions: instructions || null,
      },
      { onSuccess: onClose },
    )
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-primary-dark/45 p-5"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] w-full max-w-[480px] overflow-y-auto rounded-2xl bg-white p-7 shadow-modal"
      >
        <h3 className="mb-5 text-lg font-extrabold text-ink">Nouveau paiement</h3>

        <div className="flex flex-col gap-4">
          <div>
            <Label>Devis accepté concerné</Label>
            <Select value={devisId} onChange={(e) => setDevisId(e.target.value)}>
              <option value="">Sélectionner un devis...</option>
              {candidates?.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} — {d.op_type} / {d.category}
                </option>
              ))}
            </Select>
            {candidates?.length === 0 && (
              <p className="mt-1.5 text-xs text-slate">Aucun devis accepté sans paiement pour le moment.</p>
            )}
          </div>

          <div className="grid grid-cols-[2fr_1fr] gap-3">
            <div>
              <Label>Montant</Label>
              <Input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="1250.00" />
            </div>
            <div>
              <Label>Devise</Label>
              <Input value={currency} onChange={(e) => setCurrency(e.target.value)} placeholder="EUR" />
            </div>
          </div>

          <div>
            <Label>Référence</Label>
            <Input value={reference} onChange={(e) => setReference(e.target.value)} placeholder="WH-2026-0042" />
          </div>
          <div>
            <Label>IBAN</Label>
            <Input value={iban} onChange={(e) => setIban(e.target.value)} placeholder="FR76 3000 6000..." />
          </div>
          <div>
            <Label>BIC</Label>
            <Input value={bic} onChange={(e) => setBic(e.target.value)} placeholder="AGRIFRPP" />
          </div>
          <div>
            <Label>Échéance</Label>
            <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </div>
          <div>
            <Label>Instructions</Label>
            <Input value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Virement sous 5 jours ouvrés." />
          </div>

          {createPaiement.isError && (
            <p className="text-sm font-semibold text-danger">Échec de la création du paiement.</p>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={onClose}>
            Annuler
          </Button>
          <Button type="button" variant="accent" onClick={handleSubmit} disabled={!devisId || !amount || createPaiement.isPending}>
            {createPaiement.isPending ? 'Création...' : 'Créer le paiement'}
          </Button>
        </div>
      </div>
    </div>
  )
}

function AdminPaiements() {
  const { adminUser } = AdminRoute.useRouteContext()
  const canEdit = adminUser.role === 'Admin' || adminUser.role === 'Agent'
  const { data: paiements, isLoading, isError } = useAdminPaiements()
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold tracking-[-0.5px] text-ink">Paiements</h1>
        {canEdit && (
          <Button variant="accent" size="md" onClick={() => setModalOpen(true)}>
            + Nouveau paiement
          </Button>
        )}
      </div>

      {isLoading && <p className="text-sm text-slate">Chargement...</p>}
      {isError && (
        <p className="rounded-md bg-danger/[0.08] px-3 py-2.5 text-sm font-semibold text-danger">
          Impossible de charger les paiements.
        </p>
      )}

      {paiements && paiements.length === 0 && (
        <p className="rounded-lg border-[1.5px] border-dashed border-navy/15 bg-white px-5 py-6 text-sm text-slate">
          Aucun paiement enregistré.
        </p>
      )}

      {paiements && paiements.length > 0 && (
        <div className="overflow-hidden rounded-lg bg-white shadow-card">
          <div className="overflow-x-auto">
            <div className="min-w-[860px]">
              <div className="grid grid-cols-[1.3fr_0.9fr_0.9fr_1fr_0.8fr_0.6fr] gap-3 border-b border-navy/[0.08] px-5 py-3.5 text-xs font-extrabold uppercase tracking-[0.03em] text-slate">
                <span>Client</span>
                <span>Montant</span>
                <span>Référence</span>
                <span>Échéance</span>
                <span>Statut devis</span>
                <span>Action</span>
              </div>
              {paiements.map((p) => (
                <div
                  key={p.id}
                  className="grid grid-cols-[1.3fr_0.9fr_0.9fr_1fr_0.8fr_0.6fr] items-center gap-3 border-b border-navy/[0.06] px-5 py-3.5 text-[13.5px]"
                >
                  <span className="truncate font-bold text-ink">{p.devis?.name ?? '—'}</span>
                  <span className="font-semibold text-ink">
                    {p.amount.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {p.currency}
                  </span>
                  <span className="truncate text-slate">{p.reference ?? '—'}</span>
                  <span className="text-slate">
                    {p.due_date ? new Date(p.due_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                  </span>
                  <span>
                    {p.devis && <Badge variant={statusBadgeVariant[p.devis.status]}>{statusLabels[p.devis.status]}</Badge>}
                  </span>
                  {p.devis && (
                    <Link to="/admin/devis/$devisId" params={{ devisId: p.devis.id }} className="font-bold text-primary">
                      Voir →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {modalOpen && <NewPaiementModal onClose={() => setModalOpen(false)} />}
    </div>
  )
}
