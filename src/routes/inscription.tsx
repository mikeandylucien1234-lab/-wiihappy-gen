import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { type FormEvent, useState } from 'react'
import { AuthShell } from '@/components/sections/auth/AuthShell'
import { Button, Input, Label } from '@/components/ui'
import { useAuth } from '@/features/auth/AuthContext'

export const Route = createFileRoute('/inscription')({
  component: Inscription,
})

function Inscription() {
  const { signUp } = useAuth()
  const navigate = useNavigate()

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
      setError('Le mot de passe doit contenir au moins 6 caractères.')
      return
    }
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.')
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
      <AuthShell title="Vérifiez votre email" subtitle="Une dernière étape avant d'accéder à votre compte.">
        <div className="rounded-xl bg-gradient-primary-diag p-8 text-center text-white">
          <div className="mb-3 text-4xl">✓</div>
          <p className="text-white/90">
            Un email de confirmation a été envoyé à <strong>{email}</strong>. Cliquez sur le lien qu&apos;il contient
            pour activer votre compte, puis connectez-vous.
          </p>
        </div>
        <p className="mt-6 text-center text-sm text-slate">
          <Link to="/connexion" className="font-bold text-primary">
            Aller à la connexion
          </Link>
        </p>
      </AuthShell>
    )
  }

  return (
    <AuthShell title="Créer un compte" subtitle="Suivez vos devis et accédez à vos infos de paiement en un clic.">
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
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="6 caractères minimum"
          />
        </div>
        <div>
          <Label>Confirmer le mot de passe</Label>
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
          {loading ? 'Création...' : 'Créer mon compte'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate">
        Déjà un compte ?{' '}
        <Link to="/connexion" className="font-bold text-primary">
          Connectez-vous
        </Link>
      </p>
    </AuthShell>
  )
}
