import { Outlet, createRootRoute, useRouterState } from '@tanstack/react-router'
import { BookingDrawer } from '@/components/sections/booking/BookingDrawer'
import { CallbackDrawer } from '@/components/sections/callback/CallbackDrawer'
import { QuoteDrawer } from '@/components/sections/QuoteDrawer'
import { QuoteFab } from '@/components/sections/QuoteFab'
import { AuthProvider } from '@/features/auth/AuthContext'
import { BookingFormProvider } from '@/features/booking/BookingFormContext'
import { CallbackFormProvider } from '@/features/callback/CallbackFormContext'
import { QuoteFormProvider } from '@/features/quote-form/QuoteFormContext'
import { LocaleProvider } from '@/i18n/LocaleContext'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  const isAdmin = useRouterState({ select: (s) => s.location.pathname.startsWith('/admin') })

  return (
    <LocaleProvider>
      <AuthProvider>
        <QuoteFormProvider>
          <BookingFormProvider>
            <CallbackFormProvider>
              <Outlet />
              {!isAdmin && (
                <>
                  <QuoteDrawer />
                  <QuoteFab />
                  <BookingDrawer />
                  <CallbackDrawer />
                </>
              )}
            </CallbackFormProvider>
          </BookingFormProvider>
        </QuoteFormProvider>
      </AuthProvider>
    </LocaleProvider>
  )
}
