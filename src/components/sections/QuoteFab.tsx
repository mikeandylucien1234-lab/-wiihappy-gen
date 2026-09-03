import { useQuoteForm } from '@/features/quote-form/QuoteFormContext'

export function QuoteFab() {
  const { drawerOpen, toggleDrawer, showTooltip, showBadge } = useQuoteForm()

  return (
    <div className="fixed bottom-7 right-7 z-[200] flex flex-col items-end gap-2.5">
      {showTooltip && (
        <div className="whitespace-nowrap rounded-xl bg-ink px-4 py-2.5 text-[13.5px] font-semibold text-white shadow-[0_8px_20px_rgba(10,42,102,0.25)]">
          Demander un devis
        </div>
      )}

      <button
        type="button"
        onClick={toggleDrawer}
        aria-label="Demander un devis"
        className="relative flex h-[62px] w-[62px] items-center justify-center rounded-full border-none bg-gradient-fab shadow-fab transition-all duration-200 hover:scale-105 hover:shadow-[0_14px_36px_rgba(10,42,102,0.42)]"
      >
        {drawerOpen ? (
          <span className="text-2xl font-bold leading-none text-white">✕</span>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8">
            <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
            <path d="M14 3v5h5" />
            <path d="M9 13h6M9 17h4" />
          </svg>
        )}

        {showBadge && (
          <span className="absolute -right-[3px] -top-[3px] h-3.5 w-3.5 animate-pulse-dot rounded-full border-2 border-white bg-accent" />
        )}
      </button>
    </div>
  )
}
