import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Button, Logo } from '@/components/ui'
import { useAuth } from '@/features/auth/AuthContext'
import { useQuoteForm } from '@/features/quote-form/QuoteFormContext'
import { cn } from '@/lib/cn'

const navItems = [
  { label: 'Services', hash: 'services' },
  { label: 'Comment ça marche', hash: 'comment' },
  { label: 'Catégories', hash: 'categories' },
  { label: 'FAQ', hash: 'faq' },
  { label: 'Contact', hash: 'footer' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { openDrawer } = useQuoteForm()
  const { user } = useAuth()

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
              Accueil
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
          <Link
            to={user ? '/mon-compte' : '/connexion'}
            className="hidden items-center gap-1.5 whitespace-nowrap text-[13.5px] font-bold text-ink sm:flex"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" />
            </svg>
            {user ? 'Mon compte' : 'Connexion'}
          </Link>
          <div className="hidden text-[13.5px] leading-tight text-ink md:block">
            <div className="font-extrabold">56 9 12567898</div>
            <div className="text-xs text-slate">Lun-Sam 08:00 - 20:00</div>
          </div>
          <Button variant="accent" onClick={() => openDrawer()} className="flex-none whitespace-nowrap">
            Demander un devis <span>→</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
