import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { Footer } from '@/components/sections/Footer'
import { Header } from '@/components/sections/Header'
import { ServiceCategories } from '@/components/sections/service/ServiceCategories'
import { ServiceCta } from '@/components/sections/service/ServiceCta'
import { ServiceHero } from '@/components/sections/service/ServiceHero'
import { ServiceSteps } from '@/components/sections/service/ServiceSteps'
import { getServiceBySlug } from '@/features/services/data'
import { useLocale } from '@/i18n/LocaleContext'

export const Route = createFileRoute('/services/$slug')({
  loader: ({ params }) => {
    const service = getServiceBySlug(params.slug)
    if (!service) throw notFound()
    return service
  },
  component: ServicePage,
  notFoundComponent: ServiceNotFound,
})

function ServicePage() {
  const service = Route.useLoaderData()

  return (
    <div className="overflow-x-hidden bg-surface text-ink">
      <Header />
      <ServiceHero service={service} />
      <ServiceSteps service={service} />
      <ServiceCategories service={service} />
      <ServiceCta service={service} />
      <Footer />
    </div>
  )
}

function ServiceNotFound() {
  const { t } = useLocale()
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface font-sans text-ink">
      <p className="text-body text-slate">{t.servicePages.notFound}</p>
      <Link to="/services" className="text-sm font-bold text-primary">
        {t.servicePages.backToServices}
      </Link>
    </div>
  )
}
