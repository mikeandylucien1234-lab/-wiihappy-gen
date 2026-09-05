import { Link } from '@tanstack/react-router'
import { Card } from '@/components/ui'
import { useLocale } from '@/i18n/LocaleContext'

const serviceMeta = [
  {
    slug: 'importation',
    color: '#0057D9',
    bg: 'bg-primary/10',
    icon: <path d="M2 12h13m0 0-4-4m4 4-4 4M15 6h5v12h-5" />,
  },
  {
    slug: 'exportation',
    color: '#0057D9',
    bg: 'bg-primary/10',
    icon: (
      <>
        <rect x="3" y="10" width="14" height="8" rx="1.5" />
        <path d="M3 10l3-5h6l3 5M17 13h4l2 3v2h-6" />
      </>
    ),
  },
  {
    slug: 'sourcing-personnalise',
    color: '#FF8C00',
    bg: 'bg-accent/[0.12]',
    icon: (
      <>
        <rect x="4" y="10" width="16" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
  },
  {
    slug: 'accompagnement-douane',
    color: '#FF8C00',
    bg: 'bg-accent/[0.12]',
    icon: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 8h6M9 12h6M9 16h4" />
      </>
    ),
  },
] as const

export function Services() {
  const { t } = useLocale()

  return (
    <section id="services" className="mx-auto max-w-content px-6 pt-[100px]">
      <div className="mb-10 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <div className="mb-3 text-eyebrow text-primary">{t.homeServices.eyebrow}</div>
          <h2 className="text-h2 text-ink">{t.homeServices.title}</h2>
        </div>
        <Link to="/services" className="flex items-center gap-1.5 text-[14.5px] font-bold text-ink">
          {t.homeServices.viewAll} <span>→</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-[22px] lg:grid-cols-4">
        {serviceMeta.map((service) => {
          const content = t.homeServices.items[service.slug]
          return (
            <Link key={service.slug} to="/services/$slug" params={{ slug: service.slug }} className="block">
              <Card
                radius="xl"
                padding="none"
                shadow="md"
                hoverable
                className="h-full cursor-pointer p-5 text-inherit sm:p-6 lg:p-[30px]"
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${service.bg}`}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={service.color} strokeWidth="1.8" className="sm:h-6 sm:w-6">
                    {service.icon}
                  </svg>
                </div>
                <h3 className="mb-2 mt-4 text-base font-bold text-ink sm:mb-3 sm:mt-5 sm:text-lg">{content.title}</h3>
                <ul className="list-disc pl-[18px] text-[13.5px] leading-[1.6] text-slate sm:text-sm sm:leading-[1.7]">
                  {content.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Card>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
