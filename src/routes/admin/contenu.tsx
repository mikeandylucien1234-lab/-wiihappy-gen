import { createFileRoute } from '@tanstack/react-router'
import { AdminStub } from '@/components/admin/AdminStub'

export const Route = createFileRoute('/admin/contenu')({
  component: () => <AdminStub title="Contenu multilingue" />,
})
