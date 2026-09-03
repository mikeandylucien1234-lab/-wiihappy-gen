import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { supabase } from '@/lib/supabase'

export const Route = createFileRoute('/admin')({
  beforeLoad: async ({ location }) => {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      throw redirect({ to: '/connexion', search: { redirect: location.href } })
    }

    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('id, name, email, role, active')
      .eq('id', session.user.id)
      .maybeSingle()

    if (!adminUser || !adminUser.active) {
      throw redirect({ to: '/mon-compte' })
    }

    return { adminUser }
  },
  component: AdminLayout,
})

function AdminLayout() {
  const { adminUser } = Route.useRouteContext()

  return (
    <div className="flex min-h-screen bg-surface-admin text-ink">
      <AdminSidebar name={adminUser.name} role={adminUser.role} />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader name={adminUser.name} />
        <main className="flex-1 overflow-y-auto p-7">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
