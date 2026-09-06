import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { type FormEvent, useState } from 'react'
import { AuthShell } from '@/components/sections/auth/AuthShell'
import { Button, Input, Label } from '@/components/ui'
import { useAuth } from '@/features/auth/AuthContext'
import { useLocale } from '@/i18n/LocaleContext'

type InscriptionSearch = { redirect?: string }

export const Route = createFileRoute('/inscription')({
  validateSearch: (search: Record<string, unknown>): InscriptionSearch => ({
    redirect: typeof search.redirect === 'string' ? search.redirect : undefined,
  }),
  component: Inscription,
})

function Inscription() {
  const { signUp, signOut } = useAuth()
  const navigate = useNavigate()
  const { redirect } = Route.useSearch()
  const { t } = useLocale()
  const i = t.auth.inscription

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    if (password.length < 6) {
      setError(i.passwordTooShort)
      return
    }
    if (password !== confirmPassword) {
      setError(i.passwordMismatch)
      return
    }

    setLoading(true)
    const { error } = await signUp(email.trim(), password)

    if (error) {
      setLoading(false)
      setError(error)
      return
    }

    // Account created — send them to log in explicitly rather than relying on
    // whatever session signUp may have opened (email confirmation is disabled
    // project-side, so this is purely "go log in", not an auth-state fix-up).
    await signOut()
    setLoading(false)
    navigate({ to: '/connexion', search: { redirect } })
  }

  return (
    <AuthShell title={i.title} subtitle={i.subtitle}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
        <div>
          <Label>{i.email}</Label>
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jean@exemple.com"
          />
        </div>
        <div>
          <Label>{i.password}</Label>
          <Input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={i.passwordPlaceholder}
          />
        </div>
        <div>
          <Label>{i.confirmPassword}</Label>
          <Input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        {error && (
          <p className="rounded-md bg-danger/[0.08] px-3 py-2.5 text-sm font-semibold text-danger">{error}</p>
        )}

        <Button type="submit" variant="accent" size="lg" disabled={loading} className="mt-2 w-full font-extrabold">
          {loading ? i.submitting : i.submit}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate">
        {i.alreadyAccount}{' '}
        <Link to="/connexion" className="font-bold text-primary">
          {i.loginLink}
        </Link>
      </p>
    </AuthShell>
  )
}
