import { Outlet, createRootRoute, useRouterState } from '@tanstack/react-router'
import { QuoteDrawer } from '@/components/sections/QuoteDrawer'
import { QuoteFab } from '@/components/sections/QuoteFab'
import { AuthProvider } from '@/features/auth/AuthContext'
import { QuoteFormProvider } from '@/features/quote-form/QuoteFormContext'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  const isAdmin = useRouterState({ select: (s) => s.location.pathname.startsWith('/admin') })

  return (
    <AuthProvider>
      <QuoteFormProvider>
        <Outlet />
        {!isAdmin && (
          <>
            <QuoteDrawer />
            <QuoteFab />
          </>
        )}
      </QuoteFormProvider>
    </AuthProvider>
  )
}
