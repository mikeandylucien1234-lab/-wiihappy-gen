import { useBookingForm } from '@/features/booking/BookingFormContext'
import { useCallbackForm } from '@/features/callback/CallbackFormContext'
import { useQuoteForm } from '@/features/quote-form/QuoteFormContext'
import { useLocale } from '@/i18n/LocaleContext'

const WHATSAPP_NUMBER = '56983634549'

export function QuoteFab() {
  const { drawerOpen: quoteDrawerOpen, showTooltip, showBadge } = useQuoteForm()
  const { drawerOpen: bookingDrawerOpen } = useBookingForm()
  const { drawerOpen: callbackDrawerOpen } = useCallbackForm()
  const { t } = useLocale()

  // Other drawers have their own close button; don't let this FAB (fixed, higher
  // z-index) float on top of them and intercept clicks meant for the drawer below.
  if (quoteDrawerOpen || bookingDrawerOpen || callbackDrawerOpen) return null

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.quoteFab.whatsappMessage)}`

  return (
    <div className="fixed bottom-7 right-7 z-[200] flex flex-col items-end gap-2.5">
      {showTooltip && (
        <div className="whitespace-nowrap rounded-xl bg-ink px-4 py-2.5 text-[13.5px] font-semibold text-white shadow-[0_8px_20px_rgba(10,42,102,0.25)]">
          {t.quoteFab.tooltip}
        </div>
      )}

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.quoteFab.tooltip}
        className="relative flex h-[62px] w-[62px] items-center justify-center rounded-full border-none bg-gradient-fab shadow-fab transition-all duration-200 hover:scale-105 hover:shadow-[0_14px_36px_rgba(10,42,102,0.42)]"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
          <path d="M12.01 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.06-1.32A9.94 9.94 0 0 0 12.01 22C17.53 22 22 17.52 22 12S17.53 2 12.01 2zm5.8 14.14c-.24.68-1.4 1.3-1.93 1.36-.5.06-1.02.28-3.4-.7-2.87-1.18-4.7-4.05-4.85-4.24-.14-.19-1.16-1.54-1.16-2.93 0-1.4.73-2.08 1-2.37.26-.28.56-.35.75-.35s.38 0 .55.01c.18.01.42-.07.65.5.24.58.82 2 .89 2.14.07.14.12.31.02.5-.1.19-.15.31-.3.48-.15.17-.31.38-.44.5-.15.14-.3.3-.13.58.17.28.76 1.25 1.63 2.02 1.12.99 2.06 1.31 2.34 1.45.28.14.44.12.6-.07.17-.19.72-.83.91-1.11.19-.28.38-.24.63-.14.26.09 1.65.78 1.93.92.28.14.47.21.54.33.07.12.07.68-.17 1.36z" />
        </svg>

        {showBadge && (
          <span className="absolute -right-[3px] -top-[3px] h-3.5 w-3.5 animate-pulse-dot rounded-full border-2 border-white bg-accent" />
        )}
      </a>
    </div>
  )
}
