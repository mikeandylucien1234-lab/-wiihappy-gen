import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button, Card, Input, Label, Textarea } from '@/components/ui'
import {
  useAdminFaqItems,
  useCreateFaqItem,
  useDeleteFaqItem,
  useSwapFaqOrder,
  useUpdateFaqItem,
} from '@/features/admin/faq'
import { useLocale } from '@/i18n/LocaleContext'
import type { Database, Locale } from '@/lib/database.types'
import { Route as AdminRoute } from '@/routes/admin/route'

export const Route = createFileRoute('/admin/faq')({
  component: AdminFaq,
})

type FaqItem = Database['public']['Tables']['faq_items']['Row']

const locales: Locale[] = ['fr', 'en', 'es']

interface FaqDraft {
  question_fr: string
  answer_fr: string
  question_en: string
  answer_en: string
  question_es: string
  answer_es: string
  active: boolean
}

function draftFromItem(item: FaqItem): FaqDraft {
  return {
    question_fr: item.question_fr,
    answer_fr: item.answer_fr,
    question_en: item.question_en,
    answer_en: item.answer_en,
    question_es: item.question_es,
    answer_es: item.answer_es,
    active: item.active,
  }
}

function FaqFields({
  draft,
  onChange,
  canEdit,
}: {
  draft: FaqDraft
  onChange: (patch: Partial<FaqDraft>) => void
  canEdit: boolean
}) {
  const { t } = useLocale()
  const f = t.admin.faq

  return (
    <div className="flex flex-col gap-4">
      {locales.map((locale) => (
        <div key={locale} className="rounded-lg bg-surface p-3.5">
          <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.05em] text-primary">{f.localeLabels[locale]}</p>
          <div className="flex flex-col gap-2.5">
            <div>
              <Label className="mb-1 text-xs">{f.question}</Label>
              <Input
                value={draft[`question_${locale}`]}
                onChange={(e) => onChange({ [`question_${locale}`]: e.target.value })}
                disabled={!canEdit}
              />
            </div>
            <div>
              <Label className="mb-1 text-xs">{f.answer}</Label>
              <Textarea
                value={draft[`answer_${locale}`]}
                onChange={(e) => onChange({ [`answer_${locale}`]: e.target.value })}
                disabled={!canEdit}
                rows={2}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function FaqItemEditor({
  item,
  canEdit,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
}: {
  item: FaqItem
  canEdit: boolean
  isFirst: boolean
  isLast: boolean
  onMoveUp: () => void
  onMoveDown: () => void
}) {
  const update = useUpdateFaqItem()
  const remove = useDeleteFaqItem()
  const [draft, setDraft] = useState<FaqDraft>(draftFromItem(item))
  const [saved, setSaved] = useState(false)
  const { t } = useLocale()
  const f = t.admin.faq

  const original = draftFromItem(item)
  const dirty = JSON.stringify(draft) !== JSON.stringify(original)

  function handleSave() {
    update.mutate(
      { id: item.id, ...draft },
      {
        onSuccess: () => {
          setSaved(true)
          setTimeout(() => setSaved(false), 1500)
        },
      },
    )
  }

  function handleDelete() {
    if (!window.confirm(f.confirmDelete)) return
    remove.mutate(item.id)
  }

  return (
    <Card radius="lg" padding="md" shadow="none" className="border-[1.5px] border-navy/[0.08]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={!canEdit || isFirst}
            aria-label={f.moveUp}
            className="flex h-8 w-8 items-center justify-center rounded-md border-[1.5px] border-navy/15 text-ink disabled:opacity-30"
          >
            ↑
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={!canEdit || isLast}
            aria-label={f.moveDown}
            className="flex h-8 w-8 items-center justify-center rounded-md border-[1.5px] border-navy/15 text-ink disabled:opacity-30"
          >
            ↓
          </button>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => canEdit && setDraft((d) => ({ ...d, active: !d.active }))}
            disabled={!canEdit}
            className={`rounded-md px-2.5 py-1 text-xs font-bold ${draft.active ? 'bg-success/10 text-success' : 'bg-navy/[0.06] text-slate'}`}
          >
            {f.active}
          </button>
          {canEdit && (
            <Button type="button" variant="danger" size="sm" onClick={handleDelete}>
              {f.delete}
            </Button>
          )}
        </div>
      </div>

      <FaqFields draft={draft} onChange={(patch) => setDraft((d) => ({ ...d, ...patch }))} canEdit={canEdit} />

      {canEdit && (
        <Button type="button" variant="accent" size="sm" onClick={handleSave} disabled={!dirty || update.isPending} className="mt-4">
          {saved ? f.saved : f.save}
        </Button>
      )}
    </Card>
  )
}

const emptyDraft: FaqDraft = {
  question_fr: '',
  answer_fr: '',
  question_en: '',
  answer_en: '',
  question_es: '',
  answer_es: '',
  active: true,
}

function NewFaqForm({ canEdit, nextSortOrder }: { canEdit: boolean; nextSortOrder: number }) {
  const create = useCreateFaqItem()
  const [draft, setDraft] = useState<FaqDraft>(emptyDraft)
  const { t } = useLocale()
  const f = t.admin.faq

  if (!canEdit) return null

  const canCreate = draft.question_fr.trim() && draft.answer_fr.trim() && draft.question_en.trim() && draft.answer_en.trim() && draft.question_es.trim() && draft.answer_es.trim()

  function handleCreate() {
    create.mutate({ ...draft, sort_order: nextSortOrder }, { onSuccess: () => setDraft(emptyDraft) })
  }

  return (
    <Card radius="lg" padding="md" shadow="none" className="border-[1.5px] border-dashed border-navy/15">
      <p className="mb-3 text-sm font-extrabold text-ink">{f.addTitle}</p>
      <FaqFields draft={draft} onChange={(patch) => setDraft((d) => ({ ...d, ...patch }))} canEdit />
      <Button type="button" variant="accent" size="sm" onClick={handleCreate} disabled={!canCreate || create.isPending} className="mt-4">
        {f.add}
      </Button>
    </Card>
  )
}

function AdminFaq() {
  const { adminUser } = AdminRoute.useRouteContext()
  const canEdit = adminUser.role === 'Admin' || adminUser.role === 'Agent'
  const { data: items, isLoading } = useAdminFaqItems()
  const swap = useSwapFaqOrder()
  const { t } = useLocale()
  const f = t.admin.faq

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold tracking-[-0.5px] text-ink">{f.title}</h1>
        <p className="text-sm text-slate">{f.subtitle}</p>
      </div>

      {isLoading && <p className="text-sm text-slate">{f.loading}</p>}

      {items && items.length === 0 && (
        <p className="mb-5 rounded-lg border-[1.5px] border-dashed border-navy/15 bg-white px-5 py-6 text-sm text-slate">{f.empty}</p>
      )}

      {items && items.length > 0 && (
        <div className="mb-5 flex flex-col gap-4">
          {items.map((item, i) => (
            <FaqItemEditor
              key={item.id}
              item={item}
              canEdit={canEdit}
              isFirst={i === 0}
              isLast={i === items.length - 1}
              onMoveUp={() => i > 0 && swap.mutate({ a: item, b: items[i - 1] })}
              onMoveDown={() => i < items.length - 1 && swap.mutate({ a: item, b: items[i + 1] })}
            />
          ))}
        </div>
      )}

      <NewFaqForm canEdit={canEdit} nextSortOrder={(items?.length ?? 0) + 1} />
    </div>
  )
}
