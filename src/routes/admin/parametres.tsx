import { createFileRoute } from '@tanstack/react-router'
import { AdminStub } from '@/components/admin/AdminStub'

export const Route = createFileRoute('/admin/parametres')({
  component: () => <AdminStub title="Paramètres" />,
})
