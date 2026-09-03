import { Outlet, createRootRoute } from '@tanstack/react-router'
import { QuoteDrawer } from '@/components/sections/QuoteDrawer'
import { QuoteFab } from '@/components/sections/QuoteFab'
import { QuoteFormProvider } from '@/features/quote-form/QuoteFormContext'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <QuoteFormProvider>
      <Outlet />
      <QuoteDrawer />
      <QuoteFab />
    </QuoteFormProvider>
  )
}
