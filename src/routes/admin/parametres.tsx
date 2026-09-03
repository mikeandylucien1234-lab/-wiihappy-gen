import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button, Card, Input, Label } from '@/components/ui'
import { useAdminSettings, useUpdateSetting } from '@/features/admin/settings'
import { Route as AdminRoute } from '@/routes/admin/route'

export const Route = createFileRoute('/admin/parametres')({
  component: AdminParametres,
})

const settingLabels: Record<string, string> = {
  phone: 'Téléphone',
  whatsapp: 'WhatsApp',
  hours: "Horaires d'ouverture",
  contact_email: 'Email de contact',
}

function SettingField({ settingKey, initialValue, canEdit }: { settingKey: string; initialValue: string; canEdit: boolean }) {
  const updateSetting = useUpdateSetting()
  const [value, setValue] = useState(initialValue)
  const [saved, setSaved] = useState(false)

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
      <Label>{settingLabels[settingKey] ?? settingKey}</Label>
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
            {saved ? '✓' : 'Enregistrer'}
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

  return (
    <div>
      <h1 className="mb-1 text-2xl font-extrabold tracking-[-0.5px] text-ink">Paramètres</h1>
      <p className="mb-6 text-sm text-slate">Coordonnées affichées sur le site public.</p>

      {isLoading && <p className="text-sm text-slate">Chargement...</p>}

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
