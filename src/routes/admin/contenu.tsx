import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button, Card, Input, Label, Textarea } from '@/components/ui'
import { locales, useAdminContent, useUpsertContent } from '@/features/admin/content'
import type { Locale } from '@/lib/database.types'
import { Route as AdminRoute } from '@/routes/admin/route'

export const Route = createFileRoute('/admin/contenu')({
  component: AdminContenu,
})

const localeLabels: Record<Locale, string> = { fr: 'Français', en: 'English', es: 'Español' }

function ContentRowEditor({
  contentKey,
  values,
  canEdit,
}: {
  contentKey: string
  values: Record<Locale, string>
  canEdit: boolean
}) {
  const upsert = useUpsertContent()
  const [draft, setDraft] = useState(values)
  const [savedLocale, setSavedLocale] = useState<Locale | null>(null)

  function handleSave(locale: Locale) {
    upsert.mutate(
      { key: contentKey, locale, value: draft[locale] },
      {
        onSuccess: () => {
          setSavedLocale(locale)
          setTimeout(() => setSavedLocale(null), 1500)
        },
      },
    )
  }

  return (
    <Card radius="lg" padding="md" shadow="none" className="border-[1.5px] border-navy/[0.08]">
      <p className="mb-3 font-mono text-xs font-bold text-primary">{contentKey}</p>
      <div className="flex flex-col gap-4">
        {locales.map((locale) => (
          <div key={locale}>
            <Label className="mb-1.5">{localeLabels[locale]}</Label>
            <div className="flex gap-2">
              <Textarea
                value={draft[locale]}
                onChange={(e) => setDraft((d) => ({ ...d, [locale]: e.target.value }))}
                disabled={!canEdit}
                rows={2}
                className="flex-1"
              />
              {canEdit && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSave(locale)}
                  disabled={draft[locale] === values[locale] || upsert.isPending}
                  className="self-start"
                >
                  {savedLocale === locale ? '✓' : 'Enregistrer'}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

function NewContentForm({ canEdit }: { canEdit: boolean }) {
  const upsert = useUpsertContent()
  const [key, setKey] = useState('')
  const [values, setValues] = useState<Record<Locale, string>>({ fr: '', en: '', es: '' })

  if (!canEdit) return null

  function handleCreate() {
    const trimmedKey = key.trim()
    if (!trimmedKey) return
    for (const locale of locales) {
      if (values[locale].trim()) {
        upsert.mutate({ key: trimmedKey, locale, value: values[locale].trim() })
      }
    }
    setKey('')
    setValues({ fr: '', en: '', es: '' })
  }

  return (
    <Card radius="lg" padding="md" shadow="none" className="border-[1.5px] border-dashed border-navy/15">
      <p className="mb-3 text-sm font-extrabold text-ink">Ajouter une clé de contenu</p>
      <div className="flex flex-col gap-3">
        <div>
          <Label>Clé</Label>
          <Input value={key} onChange={(e) => setKey(e.target.value)} placeholder="ex: hero.subtitle" />
        </div>
        {locales.map((locale) => (
          <div key={locale}>
            <Label>{localeLabels[locale]}</Label>
            <Textarea
              value={values[locale]}
              onChange={(e) => setValues((v) => ({ ...v, [locale]: e.target.value }))}
              rows={2}
            />
          </div>
        ))}
        <Button type="button" variant="accent" onClick={handleCreate} disabled={!key.trim()} className="self-start">
          Ajouter
        </Button>
      </div>
    </Card>
  )
}

function AdminContenu() {
  const { adminUser } = AdminRoute.useRouteContext()
  const canEdit = adminUser.role === 'Admin' || adminUser.role === 'Agent'
  const { data: content, isLoading } = useAdminContent()

  return (
    <div>
      <h1 className="mb-1 text-2xl font-extrabold tracking-[-0.5px] text-ink">Contenu multilingue</h1>
      <p className="mb-6 text-sm text-slate">
        Textes traduisibles du site (FR/EN/ES). Le site public affiche encore les textes statiques — ce module
        prépare la donnée pour la bascule.
      </p>

      {isLoading && <p className="text-sm text-slate">Chargement...</p>}

      <div className="flex flex-col gap-4">
        {content?.map((row) => (
          <ContentRowEditor key={row.key} contentKey={row.key} values={row.values} canEdit={canEdit} />
        ))}
        <NewContentForm canEdit={canEdit} />
      </div>
    </div>
  )
}
