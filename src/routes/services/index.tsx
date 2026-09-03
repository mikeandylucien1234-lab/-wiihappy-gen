import { createFileRoute, Link } from '@tanstack/react-router'
import { Footer } from '@/components/sections/Footer'
import { Header } from '@/components/sections/Header'
import { Card } from '@/components/ui'
import { services } from '@/features/services/data'
import { useLocale } from '@/i18n/LocaleContext'

export const Route = createFileRoute('/services/')({
  component: ServicesIndex,
})

function ServicesIndex() {
  const { t } = useLocale()

  return (
    <div className="overflow-x-hidden bg-surface text-ink">
      <Header />

      <section className="mx-auto max-w-content px-6 pt-14">
        <div className="mb-3 text-eyebrow text-primary">{t.servicesIndex.eyebrow}</div>
        <h1 className="mb-4 text-h1 text-ink">{t.servicesIndex.title}</h1>
        <p className="mb-12 max-w-[560px] text-body-lg text-slate">{t.servicesIndex.subtitle}</p>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[22px] pb-[100px]">
          {services.map((service) => {
            const content = t.servicePages.pages[service.slug]
            return (
              <Link key={service.slug} to="/services/$slug" params={{ slug: service.slug }} className="block">
                <Card radius="xl" padding="md" shadow="md" hoverable className="h-full text-inherit">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={service.iconColor} strokeWidth="1.6">
                    {service.icon}
                  </svg>
                  <h3 className="mb-2 mt-5 text-lg font-bold text-ink">{content.eyebrow}</h3>
                  <p className="text-sm leading-[1.6] text-slate">{content.description}</p>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      <Footer />
    </div>
  )
}
