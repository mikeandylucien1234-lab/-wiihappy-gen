import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button, Card, Input, Label } from '@/components/ui'
import { useAdminSettings, useUpdateSetting } from '@/features/admin/settings'
import { useLocale } from '@/i18n/LocaleContext'
import { Route as AdminRoute } from '@/routes/admin/route'

export const Route = createFileRoute('/admin/parametres')({
  component: AdminParametres,
})

function SettingField({ settingKey, initialValue, canEdit }: { settingKey: string; initialValue: string; canEdit: boolean }) {
  const updateSetting = useUpdateSetting()
  const [value, setValue] = useState(initialValue)
  const [saved, setSaved] = useState(false)
  const { t } = useLocale()
  const p = t.admin.parametres
  const labels: Record<string, string> = p.labels

  function handleSave() {
    updateSetting.mutate(
      { key: settingKey, value },
      {
        onSuccess: () => {
          setSaved(true)
          setTimeout(() => setSaved(false), 1500)
        },
      },
    )
  }

  return (
    <div>
      <Label>{labels[settingKey] ?? settingKey}</Label>
      <div className="flex gap-2">
        <Input value={value} onChange={(e) => setValue(e.target.value)} disabled={!canEdit} className="flex-1" />
        {canEdit && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleSave}
            disabled={value === initialValue || updateSetting.isPending}
          >
            {saved ? p.saved : p.save}
          </Button>
        )}
      </div>
    </div>
  )
}

function AdminParametres() {
  const { adminUser } = AdminRoute.useRouteContext()
  const canEdit = adminUser.role === 'Admin' || adminUser.role === 'Agent'
  const { data: settings, isLoading } = useAdminSettings()
  const { t } = useLocale()
  const p = t.admin.parametres

  return (
    <div>
      <h1 className="mb-1 text-2xl font-extrabold tracking-[-0.5px] text-ink">{p.title}</h1>
      <p className="mb-6 text-sm text-slate">{p.subtitle}</p>

      {isLoading && <p className="text-sm text-slate">{p.loading}</p>}

      {settings && (
        <Card radius="lg" padding="md" shadow="none" className="max-w-[480px] border-[1.5px] border-navy/[0.08]">
          <div className="flex flex-col gap-4">
            {settings.map((s) => (
              <SettingField key={`${s.key}-${s.value}`} settingKey={s.key} initialValue={s.value} canEdit={canEdit} />
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
