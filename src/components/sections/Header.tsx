import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Button, Logo } from '@/components/ui'
import { useAuth } from '@/features/auth/AuthContext'
import { useQuoteForm } from '@/features/quote-form/QuoteFormContext'
import { useLocale } from '@/i18n/LocaleContext'
import { cn } from '@/lib/cn'
import type { Locale } from '@/lib/database.types'

const locales: Locale[] = ['fr', 'en', 'es']

export function Header() {
  const [scrolled, setScrolled] = useState(false)
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
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 bg-white transition-shadow duration-300',
        scrolled ? 'bg-white/96 shadow-[0_4px_20px_rgba(10,42,102,0.08)] backdrop-blur-sm' : 'shadow-none',
      )}
    >
      <div className="mx-auto flex max-w-content flex-wrap items-center gap-x-6 gap-y-2.5 px-6 py-4">
        <Link to="/" className="flex flex-none items-baseline">
          <Logo />
        </Link>

        <nav className="mx-auto flex flex-wrap items-start gap-[26px]">
          <div className="flex flex-col items-center gap-1.5">
            <Link to="/" hash="hero" className="whitespace-nowrap text-[14.5px] font-bold text-ink">
              {t.header.home}
            </Link>
            <div className="h-[5px] w-[5px] rounded-full bg-accent" />
          </div>
          {navItems.map((item) => (
            <Link
              key={item.hash}
              to="/"
              hash={item.hash}
              className="self-start whitespace-nowrap pt-px text-[14.5px] font-semibold text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex flex-none items-center gap-[18px]">
          <div className="hidden items-center gap-1 md:flex">
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
          <Link
            to={user ? '/mon-compte' : '/connexion'}
            className="hidden items-center gap-1.5 whitespace-nowrap text-[13.5px] font-bold text-ink sm:flex"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" />
            </svg>
            {user ? t.header.myAccount : t.header.login}
          </Link>
          <div className="hidden text-[13.5px] leading-tight text-ink md:block">
            <div className="font-extrabold">{t.header.phone}</div>
            <div className="text-xs text-slate">{t.header.hours}</div>
          </div>
          <Button variant="accent" onClick={() => openDrawer()} className="flex-none whitespace-nowrap">
            {t.header.ctaQuote} <span>→</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
