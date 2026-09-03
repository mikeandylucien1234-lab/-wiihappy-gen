import { createFileRoute } from '@tanstack/react-router'
import { AdminStub } from '@/components/admin/AdminStub'

export const Route = createFileRoute('/admin/statistiques')({
  component: () => <AdminStub title="Statistiques" />,
})
