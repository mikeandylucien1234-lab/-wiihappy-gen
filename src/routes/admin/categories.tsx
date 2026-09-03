import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button, Input } from '@/components/ui'
import { useAdminCategories, useCreateCategory, useDeleteCategory, useUpdateCategory } from '@/features/admin/categories'
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
      <h1 className="mb-1 text-2xl font-extrabold tracking-[-0.5px] text-ink">Catégories</h1>
      <p className="mb-6 text-sm text-slate">
        Catégories de produits proposées dans le formulaire de devis et sur le site public.
      </p>

      {isLoading && <p className="text-sm text-slate">Chargement...</p>}

      {categories && (
        <div className="overflow-hidden rounded-lg bg-white shadow-card">
          <div className="grid grid-cols-[1.4fr_1fr_0.6fr_0.6fr] gap-3 border-b border-navy/[0.08] px-5 py-3.5 text-xs font-extrabold uppercase tracking-[0.03em] text-slate">
            <span>Libellé</span>
            <span>Slug</span>
            <span>Active</span>
            <span>Action</span>
          </div>
          {categories.map((c) => (
            <div
              key={c.id}
              className="grid grid-cols-[1.4fr_1fr_0.6fr_0.6fr] items-center gap-3 border-b border-navy/[0.06] px-5 py-3 text-[13.5px]"
            >
              <span className="font-bold text-ink">{c.label}</span>
              <span className="text-slate">{c.slug}</span>
              <button
                type="button"
                disabled={!canEdit}
                onClick={() => updateCategory.mutate({ id: c.id, active: !c.active })}
                className={`w-fit rounded-pill px-3 py-1 text-xs font-bold ${
                  c.active ? 'bg-success/[0.12] text-success' : 'bg-slate/[0.12] text-slate'
                }`}
              >
                {c.active ? 'Active' : 'Inactive'}
              </button>
              {canEdit && (
                <button
                  type="button"
                  onClick={() => deleteCategory.mutate(c.id)}
                  className="w-fit text-xs font-bold text-danger"
                >
                  Supprimer
                </button>
              )}
            </div>
          ))}

          {canEdit && (
            <div className="flex flex-wrap items-center gap-3 px-5 py-4">
              <Input
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="Nouvelle catégorie..."
                className="max-w-[260px]"
              />
              <Button type="button" variant="ghost" size="sm" onClick={handleCreate} disabled={!newLabel.trim() || createCategory.isPending}>
                + Ajouter
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
