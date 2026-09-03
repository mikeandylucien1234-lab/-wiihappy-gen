import { Link, Outlet, createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { Logo } from '@/components/ui'
import { useAuth } from '@/features/auth/AuthContext'
import { useLocale } from '@/i18n/LocaleContext'
import { supabase } from '@/lib/supabase'

export const Route = createFileRoute('/mon-compte')({
  beforeLoad: async ({ location }) => {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      throw redirect({ to: '/connexion', search: { redirect: location.href } })
    }
  },
  component: AccountLayout,
})

function AccountLayout() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const { t } = useLocale()

  async function handleSignOut() {
    await signOut()
    navigate({ to: '/' })
  }

  return (
    <div className="min-h-screen bg-surface text-ink">
      <header className="border-b border-navy/[0.08] bg-white">
        <div className="mx-auto flex max-w-content items-center gap-6 px-6 py-4">
          <Link to="/">
            <Logo />
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              to="/mon-compte"
              className="text-[14.5px] font-bold text-ink"
              activeProps={{ className: 'text-primary' }}
              activeOptions={{ exact: true }}
            >
              {t.account.myDevisNav}
            </Link>
          </nav>
          <div className="ml-auto flex items-center gap-4">
            {user && <span className="hidden text-sm text-slate sm:inline">{user.email}</span>}
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-pill border-[1.5px] border-navy/15 px-4 py-2 text-sm font-bold text-ink"
            >
              {t.account.signOut}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-content px-6 py-10">
        <Outlet />
      </main>
    </div>
  )
}
