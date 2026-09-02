import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/services/$slug')({
  component: ServiceDetail,
})

// Placeholder — individual service detail pages aren't built yet. Exists so
// the landing page's service cards link to a real, non-breaking route.
function ServiceDetail() {
  const { slug } = Route.useParams()
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface font-sans text-ink">
      <p className="text-body text-slate">Page du service "{slug}" à venir.</p>
      <Link to="/" className="text-sm font-bold text-primary">
        ← Retour à l&apos;accueil
      </Link>
    </div>
  )
}
