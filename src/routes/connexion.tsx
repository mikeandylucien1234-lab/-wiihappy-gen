import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { type FormEvent, useState } from 'react'
import { AuthShell } from '@/components/sections/auth/AuthShell'
import { Button, Input, Label } from '@/components/ui'
import { useAuth } from '@/features/auth/AuthContext'

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
      setError(
        error === 'Invalid login credentials'
          ? 'Email ou mot de passe incorrect.'
          : error,
      )
      return
    }
    navigate({ to: redirect || '/mon-compte' })
  }

  return (
    <AuthShell title="Connexion" subtitle="Accédez à votre espace client pour suivre vos devis.">
      <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jean@exemple.com"
          />
        </div>
        <div>
          <Label>Mot de passe</Label>
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
          {loading ? 'Connexion...' : 'Se connecter'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate">
        Pas encore de compte ?{' '}
        <Link to="/inscription" className="font-bold text-primary">
          Inscrivez-vous
        </Link>
      </p>
    </AuthShell>
  )
}
