import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/services/')({
  component: ServicesIndex,
})

// Placeholder — the services listing page isn't built yet. Exists so the
// landing page's "Tous les services" link has a real, non-breaking route.
function ServicesIndex() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface font-sans text-ink">
      <p className="text-body text-slate">Page "Tous les services" à venir.</p>
      <Link to="/" className="text-sm font-bold text-primary">
        ← Retour à l&apos;accueil
      </Link>
    </div>
  )
}
