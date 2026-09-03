import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button, Input } from '@/components/ui'
import { useAdminCategories, useCreateCategory, useDeleteCategory, useUpdateCategory } from '@/features/admin/categories'
import { useLocale } from '@/i18n/LocaleContext'
import { Route as AdminRoute } from '@/routes/admin/route'

export const Route = createFileRoute('/admin/categories')({
  component: AdminCategories,
})

function slugify(label: string) {
  return label
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function AdminCategories() {
  const { adminUser } = AdminRoute.useRouteContext()
  const canEdit = adminUser.role === 'Admin' || adminUser.role === 'Agent'
  const { t } = useLocale()
  const c = t.admin.categories

  const { data: categories, isLoading } = useAdminCategories()
  const createCategory = useCreateCategory()
  const updateCategory = useUpdateCategory()
  const deleteCategory = useDeleteCategory()

  const [newLabel, setNewLabel] = useState('')

  function handleCreate() {
    const label = newLabel.trim()
    if (!label) return
    createCategory.mutate(
      { label, slug: slugify(label), sort_order: (categories?.length ?? 0) + 1 },
      { onSuccess: () => setNewLabel('') },
    )
  }

  return (
    <div>
      <h1 className="mb-1 text-2xl font-extrabold tracking-[-0.5px] text-ink">{c.title}</h1>
      <p className="mb-6 text-sm text-slate">{c.subtitle}</p>

      {isLoading && <p className="text-sm text-slate">{c.loading}</p>}

      {categories && (
        <div className="overflow-hidden rounded-lg bg-white shadow-card">
          <div className="grid grid-cols-[1.4fr_1fr_0.6fr_0.6fr] gap-3 border-b border-navy/[0.08] px-5 py-3.5 text-xs font-extrabold uppercase tracking-[0.03em] text-slate">
            <span>{c.colLabel}</span>
            <span>{c.colSlug}</span>
            <span>{c.colActive}</span>
            <span>{c.colAction}</span>
          </div>
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="grid grid-cols-[1.4fr_1fr_0.6fr_0.6fr] items-center gap-3 border-b border-navy/[0.06] px-5 py-3 text-[13.5px]"
            >
              <span className="font-bold text-ink">{cat.label}</span>
              <span className="text-slate">{cat.slug}</span>
              <button
                type="button"
                disabled={!canEdit}
                onClick={() => updateCategory.mutate({ id: cat.id, active: !cat.active })}
                className={`w-fit rounded-pill px-3 py-1 text-xs font-bold ${
                  cat.active ? 'bg-success/[0.12] text-success' : 'bg-slate/[0.12] text-slate'
                }`}
              >
                {cat.active ? c.active : c.inactive}
              </button>
              {canEdit && (
                <button
                  type="button"
                  onClick={() => deleteCategory.mutate(cat.id)}
                  className="w-fit text-xs font-bold text-danger"
                >
                  {c.delete}
                </button>
              )}
            </div>
          ))}

          {canEdit && (
            <div className="flex flex-wrap items-center gap-3 px-5 py-4">
              <Input
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder={c.newPlaceholder}
                className="max-w-[260px]"
              />
              <Button type="button" variant="ghost" size="sm" onClick={handleCreate} disabled={!newLabel.trim() || createCategory.isPending}>
                {c.add}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
