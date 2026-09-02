import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

// Placeholder route — pages are not built yet. This exists only so the
// router has a valid tree while the design system / UI kit is set up.
function Index() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface font-sans text-ink">
      <p className="text-body text-slate">Wiihappy Gen — setup en cours. Aucune page construite pour l'instant.</p>
    </div>
  )
}
