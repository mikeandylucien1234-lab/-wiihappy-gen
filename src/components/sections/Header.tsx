import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Button, Logo } from '@/components/ui'
import { useAuth } from '@/features/auth/AuthContext'
import { useQuoteForm } from '@/features/quote-form/QuoteFormContext'
import { useLocale } from '@/i18n/LocaleContext'
import { cn } from '@/lib/cn'
import type { Locale } from '@/lib/database.types'

const locales: Locale[] = ['fr', 'en', 'es']

/** Rough clearance so "past the hero" triggers once the fixed header would start
 * covering real content rather than empty video, without needing to measure the
 * hero section's actual height. */
const OVERLAY_HEADER_CLEARANCE = 80

/** Tailwind's md breakpoint — the video hero (and this header's transparent-over-it
 * treatment) is mobile-only, so above this width the header behaves exactly like
 * `overlay=false` regardless of what the page passed in. */
const MOBILE_BREAKPOINT = 768

export function Header({ overlay = false }: { overlay?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [heroPassed, setHeroPassed] = useState(!overlay)
  const [isMobileViewport, setIsMobileViewport] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT,
  )
  const [menuOpen, setMenuOpen] = useState(false)
  const { openDrawer } = useQuoteForm()
  const { user } = useAuth()
  const { locale, setLocale, t } = useLocale()

  const navItems = [
    { label: t.header.navServices, hash: 'services' },
    { label: t.header.navComment, hash: 'comment' },
    { label: t.header.navCategories, hash: 'categories' },
    { label: t.header.navFaq, hash: 'faq' },
    { label: t.header.navContact, hash: 'footer' },
  ]

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12)
      setIsMobileViewport(window.innerWidth < MOBILE_BREAKPOINT)
      if (overlay) setHeroPassed(window.scrollY > window.innerHeight - OVERLAY_HEADER_CLEARANCE)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [overlay])

  useEffect(() => {
    if (!menuOpen) return
    const onResize = () => {
      if (window.innerWidth >= MOBILE_BREAKPOINT) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [menuOpen])

  function closeMenu() {
    setMenuOpen(false)
  }

  const overlayActive = overlay && isMobileViewport
  const solid = !overlayActive || heroPassed || menuOpen
  const textColor = solid ? 'text-ink' : 'text-white'
  const mutedColor = solid ? 'text-slate' : 'text-white/75'

  return (
    <header
      className={cn(
        'z-50 transition-[background-color,box-shadow] duration-300',
        overlayActive ? 'fixed left-0 right-0 top-0' : 'sticky top-0',
        solid ? cn('bg-white', scrolled && 'bg-white/[0.96] shadow-[0_4px_20px_rgba(10,42,102,0.08)] backdrop-blur-sm') : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex max-w-content items-center gap-x-3 gap-y-2.5 px-4 py-4 sm:gap-x-6 sm:px-6">
        <Link to="/" className="flex flex-none items-baseline" onClick={closeMenu}>
          <Logo variant={solid ? 'dark' : 'light'} className="text-xl sm:text-2xl" />
        </Link>

        <nav className="mx-auto hidden flex-wrap items-start gap-[26px] md:flex">
          <div className="flex flex-col items-center gap-1.5">
            <Link to="/" hash="hero" className={cn('whitespace-nowrap text-[14.5px] font-bold transition-colors', textColor)}>
              {t.header.home}
            </Link>
            <div className="h-[5px] w-[5px] rounded-full bg-accent" />
          </div>
          {navItems.map((item) => (
            <Link
              key={item.hash}
              to="/"
              hash={item.hash}
              className={cn('self-start whitespace-nowrap pt-px text-[14.5px] font-semibold transition-colors', textColor)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex flex-none items-center gap-2 sm:gap-3 md:gap-[18px]">
          <div className="hidden items-center gap-1 md:flex">
            {locales.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLocale(l)}
                aria-current={locale === l}
                className={cn(
                  'rounded-md px-2 py-1 text-xs font-bold uppercase transition-colors',
                  solid
                    ? locale === l
                      ? 'bg-primary/10 text-primary'
                      : 'text-slate'
                    : locale === l
                      ? 'bg-white/20 text-white'
                      : 'text-white/70',
                )}
              >
                {l}
              </button>
            ))}
          </div>
          <Link
            to={user ? '/mon-compte' : '/connexion'}
            className={cn('hidden items-center gap-1.5 whitespace-nowrap text-[13.5px] font-bold transition-colors sm:flex', textColor)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" />
            </svg>
            {user ? t.header.myAccount : t.header.login}
          </Link>
          <div className={cn('hidden text-[13.5px] leading-tight transition-colors md:block', textColor)}>
            <div className="font-extrabold">{t.header.phone}</div>
            <div className={cn('text-xs', mutedColor)}>{t.header.hours}</div>
          </div>
          <Button
            variant="accent"
            onClick={() => openDrawer()}
            className="flex-none whitespace-nowrap px-3 py-2 text-xs sm:px-[22px] sm:py-3 sm:text-sm"
          >
            {t.header.ctaQuote} <span>→</span>
          </Button>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? t.header.closeMenu : t.header.openMenu}
            aria-expanded={menuOpen}
            className={cn('flex h-9 w-9 flex-none items-center justify-center rounded-md transition-colors md:hidden', textColor)}
          >
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        className={cn(
          'overflow-hidden border-t border-navy/[0.06] bg-white transition-[max-height] duration-300 ease-in-out md:hidden',
          menuOpen ? 'max-h-[520px]' : 'max-h-0 border-t-0',
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-4 sm:px-6">
          <Link to="/" hash="hero" onClick={closeMenu} className="rounded-md px-2 py-2.5 text-[15px] font-bold text-ink">
            {t.header.home}
          </Link>
          {navItems.map((item) => (
            <Link
              key={item.hash}
              to="/"
              hash={item.hash}
              onClick={closeMenu}
              className="rounded-md px-2 py-2.5 text-[15px] font-semibold text-ink"
            >
              {item.label}
            </Link>
          ))}

          <div className="my-2 h-px bg-navy/[0.08]" />

          <Link
            to={user ? '/mon-compte' : '/connexion'}
            onClick={closeMenu}
            className="flex items-center gap-2 rounded-md px-2 py-2.5 text-[15px] font-bold text-ink"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" />
            </svg>
            {user ? t.header.myAccount : t.header.login}
          </Link>

          <div className="flex items-center justify-between gap-3 px-2 py-2.5">
            <div className="text-[13.5px] leading-tight text-ink">
              <div className="font-extrabold">{t.header.phone}</div>
              <div className="text-xs text-slate">{t.header.hours}</div>
            </div>
            <div className="flex items-center gap-1">
              {locales.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLocale(l)}
                  aria-current={locale === l}
                  className={cn(
                    'rounded-md px-2 py-1 text-xs font-bold uppercase transition-colors',
                    locale === l ? 'bg-primary/10 text-primary' : 'text-slate',
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
