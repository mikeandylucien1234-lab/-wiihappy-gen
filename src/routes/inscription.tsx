import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { type FormEvent, useState } from 'react'
import { AuthShell } from '@/components/sections/auth/AuthShell'
import { Button, Input, Label } from '@/components/ui'
import { useAuth } from '@/features/auth/AuthContext'
import { useLocale } from '@/i18n/LocaleContext'

export const Route = createFileRoute('/inscription')({
  component: Inscription,
})

function Inscription() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const { t } = useLocale()
  const i = t.auth.inscription

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [needsConfirmation, setNeedsConfirmation] = useState(false)

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
    const { error, needsEmailConfirmation } = await signUp(email.trim(), password)
    setLoading(false)

    if (error) {
      setError(error)
      return
    }
    if (needsEmailConfirmation) {
      setNeedsConfirmation(true)
      return
    }
    navigate({ to: '/mon-compte' })
  }

  if (needsConfirmation) {
    return (
      <AuthShell title={i.confirmTitle} subtitle={i.confirmSubtitle}>
        <div className="rounded-xl bg-gradient-primary-diag p-8 text-center text-white">
          <div className="mb-3 text-4xl">✓</div>
          <p className="text-white/90">
            {i.confirmBodyPrefix} <strong>{email}</strong>. {i.confirmBodySuffix}
          </p>
        </div>
        <p className="mt-6 text-center text-sm text-slate">
          <Link to="/connexion" className="font-bold text-primary">
            {i.goToLogin}
          </Link>
        </p>
      </AuthShell>
    )
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
