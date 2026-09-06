import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button, Card, Textarea } from '@/components/ui'
import { locales, useAdminContent, useUpsertContent } from '@/features/admin/content'
import { useLocale } from '@/i18n/LocaleContext'
import type { Locale } from '@/lib/database.types'
import { Route as AdminRoute } from '@/routes/admin/route'

export const Route = createFileRoute('/admin/politiques')({
  component: AdminPolitiques,
})

const SECTIONS = [
  { key: 'legal.privacy', labelKey: 'privacy' },
  { key: 'legal.terms', labelKey: 'terms' },
  { key: 'legal.mentions', labelKey: 'mentions' },
] as const

function PolicySection({
  contentKey,
  title,
  values,
  canEdit,
}: {
  contentKey: string
  title: string
  values: Record<Locale, string>
  canEdit: boolean
}) {
  const upsert = useUpsertContent()
  const [draft, setDraft] = useState(values)
  const [savedLocale, setSavedLocale] = useState<Locale | null>(null)
  const { t } = useLocale()
  const p = t.admin.politiques

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
      <h2 className="mb-4 text-lg font-extrabold text-ink">{title}</h2>
      <div className="flex flex-col gap-5">
        {locales.map((locale) => (
          <div key={locale}>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-sm font-bold text-ink">{p.localeLabels[locale]}</span>
              {canEdit && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSave(locale)}
                  disabled={draft[locale] === values[locale] || upsert.isPending}
                >
                  {savedLocale === locale ? p.saved : p.save}
                </Button>
              )}
            </div>
            <Textarea
              value={draft[locale]}
              onChange={(e) => setDraft((d) => ({ ...d, [locale]: e.target.value }))}
              disabled={!canEdit}
              rows={8}
            />
          </div>
        ))}
      </div>
    </Card>
  )
}

function AdminPolitiques() {
  const { adminUser } = AdminRoute.useRouteContext()
  const canEdit = adminUser.role === 'Admin' || adminUser.role === 'Agent'
  const { data, isLoading } = useAdminContent()
  const { t } = useLocale()
  const p = t.admin.politiques

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold tracking-[-0.5px] text-ink">{p.title}</h1>
        <p className="text-sm text-slate">{p.subtitle}</p>
      </div>

      {isLoading && <p className="text-sm text-slate">{p.loading}</p>}

      {data && (
        <div className="flex flex-col gap-5">
          {SECTIONS.map((section) => {
            const row = data.find((item) => item.key === section.key)
            const values = row?.values ?? { fr: '', en: '', es: '' }
            return (
              <PolicySection
                key={section.key}
                contentKey={section.key}
                title={p.sections[section.labelKey]}
                values={values}
                canEdit={canEdit}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
