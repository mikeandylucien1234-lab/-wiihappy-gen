import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { type FormEvent, useState } from 'react'
import { AuthShell } from '@/components/sections/auth/AuthShell'
import { Button, Input, Label } from '@/components/ui'
import { useAuth } from '@/features/auth/AuthContext'
import { useLocale } from '@/i18n/LocaleContext'

type ConnexionSearch = { redirect?: string }

export const Route = createFileRoute('/connexion')({
  validateSearch: (search: Record<string, unknown>): ConnexionSearch => ({
    redirect: typeof search.redirect === 'string' ? search.redirect : undefined,
  }),
  component: Connexion,
})

function Connexion() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const { redirect } = Route.useSearch()
  const { t } = useLocale()
  const c = t.auth.connexion

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { error } = await signIn(email.trim(), password)
    setLoading(false)
    if (error) {
      setError(error === 'Invalid login credentials' ? c.invalidCredentials : error)
      return
    }
    navigate({ to: redirect || '/mon-compte' })
  }

  return (
    <AuthShell title={c.title} subtitle={c.subtitle}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
        <div>
          <Label>{c.email}</Label>
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jean@exemple.com"
          />
        </div>
        <div>
          <Label>{c.password}</Label>
          <Input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        {error && (
          <p className="rounded-md bg-danger/[0.08] px-3 py-2.5 text-sm font-semibold text-danger">{error}</p>
        )}

        <Button type="submit" variant="accent" size="lg" disabled={loading} className="mt-2 w-full font-extrabold">
          {loading ? c.submitting : c.submit}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate">
        {c.noAccount}{' '}
        <Link to="/inscription" className="font-bold text-primary">
          {c.signUpLink}
        </Link>
      </p>
    </AuthShell>
  )
}
