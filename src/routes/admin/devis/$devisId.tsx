import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Badge, Button, Card, Select, Textarea } from '@/components/ui'
import { statusBadgeVariant, statusLabels } from '@/features/account/status'
import { useAuth } from '@/features/auth/AuthContext'
import { generateDevisPdf } from '@/features/admin/generateDevisPdf'
import {
  getAttachmentSignedUrl,
  useAddDevisNote,
  useAdminDevisDetail,
  useDevisNotes,
  useUpdateDevisStatus,
} from '@/features/admin/queries'
import type { DevisStatus } from '@/lib/database.types'
import { Route as AdminRoute } from '@/routes/admin/route'

export const Route = createFileRoute('/admin/devis/$devisId')({
  component: AdminDevisDetail,
})

const allStatuses: DevisStatus[] = ['nouveau', 'en_cours', 'accepte', 'refuse', 'traite', 'archive']

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className="flex justify-between gap-4 py-2.5 text-sm">
      <span className="text-slate">{label}</span>
      <span className="text-right font-semibold text-ink">{value || '—'}</span>
    </div>
  )
}

function AttachmentRow({ path }: { path: string }) {
  const [loading, setLoading] = useState(false)
  const label = path.replace(/^[0-9a-f-]{36}-/i, '')

  async function handleOpen() {
    setLoading(true)
    try {
      const url = await getAttachmentSignedUrl(path)
      window.open(url, '_blank', 'noopener,noreferrer')
    } catch {
      // Swallow — a signed-URL failure just means nothing opens; not worth its own banner.
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-md bg-surface px-3 py-2 text-sm">
      <span className="truncate font-semibold text-ink">{label}</span>
      <button type="button" onClick={handleOpen} disabled={loading} className="flex-none text-xs font-bold text-primary">
        {loading ? 'Ouverture...' : 'Télécharger'}
      </button>
    </div>
  )
}

function AdminDevisDetail() {
  const { devisId } = Route.useParams()
  const { adminUser } = AdminRoute.useRouteContext()
  const { user } = useAuth()
  const canEdit = adminUser.role === 'Admin' || adminUser.role === 'Agent'

  const { data: devis, isLoading, isError } = useAdminDevisDetail(devisId)
  const { data: notes } = useDevisNotes(devisId)
  const updateStatus = useUpdateDevisStatus(devisId)
  const addNote = useAddDevisNote(devisId)

  const [noteBody, setNoteBody] = useState('')

  function handleAddNote() {
    if (!noteBody.trim() || !user) return
    addNote.mutate(
      { body: noteBody.trim(), authorName: adminUser.name, authorId: user.id },
      { onSuccess: () => setNoteBody('') },
    )
  }

  return (
    <div>
      <Link to="/admin/devis" className="mb-6 inline-flex items-center gap-1.5 text-sm font-bold text-ink">
        ← Devis
      </Link>

      {isLoading && <p className="text-sm text-slate">Chargement...</p>}
      {isError && (
        <p className="rounded-md bg-danger/[0.08] px-3 py-2.5 text-sm font-semibold text-danger">
          Impossible de charger ce devis.
        </p>
      )}
      {!isLoading && !isError && !devis && (
        <p className="rounded-md bg-danger/[0.08] px-3 py-2.5 text-sm font-semibold text-danger">
          Ce devis n&apos;existe pas.
        </p>
      )}

      {devis && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="flex flex-col gap-6">
            <Card radius="lg" padding="md" shadow="none" className="border-[1.5px] border-navy/[0.08]">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-xl font-extrabold text-ink">
                  {devis.op_type} — {devis.category}
                </h1>
                <div className="flex items-center gap-2">
                  <Badge variant={statusBadgeVariant[devis.status]}>{statusLabels[devis.status]}</Badge>
                  <Button variant="ghost" size="sm" onClick={() => generateDevisPdf(devis)}>
                    Télécharger le PDF
                  </Button>
                </div>
              </div>

              <div className="divide-y divide-navy/[0.08]">
                <Field
                  label="Date de la demande"
                  value={new Date(devis.created_at).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                />
                <Field label="Client" value={devis.name} />
                <Field label="Email" value={devis.email} />
                <Field label="WhatsApp" value={devis.whatsapp} />
                <Field label="Quantité" value={devis.quantity} />
                <Field label="Budget" value={devis.budget} />
                <Field label="Pays de livraison" value={devis.country} />
                <Field label="Transport" value={devis.transport} />
                <Field label="Origine" value={devis.source_page} />
              </div>

              <div className="mt-4">
                <p className="mb-1 text-xs font-bold text-ink">Description du besoin</p>
                <p className="rounded-xl bg-surface p-4 text-sm leading-[1.6] text-slate">{devis.description}</p>
              </div>
            </Card>

            <Card radius="lg" padding="md" shadow="none" className="border-[1.5px] border-navy/[0.08]">
              <h2 className="mb-4 text-base font-extrabold text-ink">
                Pièces jointes {devis.attachment_paths.length > 0 && `(${devis.attachment_paths.length})`}
              </h2>
              {devis.attachment_paths.length === 0 ? (
                <p className="text-sm text-slate">Aucune pièce jointe.</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {devis.attachment_paths.map((path) => (
                    <AttachmentRow key={path} path={path} />
                  ))}
                </div>
              )}
            </Card>
          </div>

          <div className="flex flex-col gap-6">
            <Card radius="lg" padding="md" shadow="none" className="border-[1.5px] border-navy/[0.08]">
              <h2 className="mb-3 text-base font-extrabold text-ink">Statut</h2>
              <Select
                value={devis.status}
                disabled={!canEdit || updateStatus.isPending}
                onChange={(e) => updateStatus.mutate(e.target.value as DevisStatus)}
              >
                {allStatuses.map((s) => (
                  <option key={s} value={s}>
                    {statusLabels[s]}
                  </option>
                ))}
              </Select>
              {!canEdit && <p className="mt-2 text-xs text-slate">Lecture seule — vous ne pouvez pas modifier le statut.</p>}
              {updateStatus.isError && (
                <p className="mt-2 text-xs font-semibold text-danger">Échec de la mise à jour du statut.</p>
              )}
            </Card>

            <Card radius="lg" padding="md" shadow="none" className="border-[1.5px] border-navy/[0.08]">
              <h2 className="mb-4 text-base font-extrabold text-ink">Notes internes</h2>

              {canEdit && (
                <div className="mb-4 flex flex-col gap-2">
                  <Textarea
                    value={noteBody}
                    onChange={(e) => setNoteBody(e.target.value)}
                    placeholder="Ajouter une note visible par l'équipe uniquement..."
                    rows={3}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleAddNote}
                    disabled={!noteBody.trim() || addNote.isPending}
                    className="self-end"
                  >
                    {addNote.isPending ? 'Ajout...' : 'Ajouter la note'}
                  </Button>
                </div>
              )}

              {!notes || notes.length === 0 ? (
                <p className="text-sm text-slate">Aucune note pour le moment.</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {notes.map((note) => (
                    <div key={note.id} className="rounded-md bg-surface p-3">
                      <div className="mb-1 flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-ink">{note.author_name}</span>
                        <span className="text-[11px] text-slate">
                          {new Date(note.created_at).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <p className="text-sm leading-[1.5] text-ink">{note.body}</p>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
