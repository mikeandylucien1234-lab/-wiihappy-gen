import { Outlet, createRootRoute } from '@tanstack/react-router'
import { QuoteDrawer } from '@/components/sections/QuoteDrawer'
import { QuoteFab } from '@/components/sections/QuoteFab'
import { AuthProvider } from '@/features/auth/AuthContext'
import { QuoteFormProvider } from '@/features/quote-form/QuoteFormContext'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <AuthProvider>
      <QuoteFormProvider>
        <Outlet />
        <QuoteDrawer />
        <QuoteFab />
      </QuoteFormProvider>
    </AuthProvider>
  )
}
