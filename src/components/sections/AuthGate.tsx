import { useNavigate, useRouterState } from '@tanstack/react-router'
import { Button } from '@/components/ui'
import { useLocale } from '@/i18n/LocaleContext'

/** Shown inside a drawer instead of its form when the visitor isn't logged in —
 * devis, call reservations and callback requests all require an account. */
export function AuthGate({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useLocale()
  const navigate = useNavigate()
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const g = t.authGate

  function goTo(to: '/connexion' | '/inscription') {
    onNavigate?.()
    navigate({ to, search: { redirect: pathname } })
  }

  return (
    <div className="flex flex-col items-center px-2 pb-6 pt-4 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <rect x="4" y="10" width="16" height="10" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
      </div>

      <h3 className="mb-2 text-xl font-extrabold text-ink">{g.title}</h3>
      <p className="mb-8 max-w-[320px] text-sm leading-[1.6] text-slate">{g.body}</p>

      <div className="flex w-full max-w-[320px] flex-col gap-3">
        <Button type="button" variant="accent" onClick={() => goTo('/connexion')}>
          {g.login}
        </Button>
        <Button type="button" variant="outline" onClick={() => goTo('/inscription')}>
          {g.signup}
        </Button>
      </div>
    </div>
  )
}
