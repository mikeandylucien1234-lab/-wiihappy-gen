import { Link } from '@tanstack/react-router'
import { Card } from '@/components/ui'

const services = [
  {
    slug: 'importation',
    title: 'Importation',
    color: '#0057D9',
    icon: (
      <path d="M2 12h13m0 0-4-4m4 4-4 4M15 6h5v12h-5" />
    ),
    items: ['Sourcing fournisseur vérifié', 'Devis détaillé sous 48h'],
  },
  {
    slug: 'exportation',
    title: 'Exportation',
    color: '#0057D9',
    icon: (
      <>
        <rect x="3" y="10" width="14" height="8" rx="1.5" />
        <path d="M3 10l3-5h6l3 5M17 13h4l2 3v2h-6" />
      </>
    ),
    items: ['Cotation logistique sur mesure', 'Aérien ou maritime'],
  },
  {
    slug: 'sourcing-personnalise',
    title: 'Sourcing personnalisé',
    color: '#FF8C00',
    icon: (
      <>
        <rect x="4" y="10" width="16" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
    items: ['Produit hors catalogue accepté', 'Achat et expédition pris en charge'],
  },
  {
    slug: 'accompagnement-douane',
    title: 'Accompagnement douane',
    color: '#FF8C00',
    icon: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 8h6M9 12h6M9 16h4" />
      </>
    ),
    items: ['Formalités gérées pour vous', 'Suivi transparent du dossier'],
  },
]

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-content px-6 pt-[100px]">
      <div className="mb-10 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <div className="mb-3 text-eyebrow text-primary">NOS SERVICES</div>
          <h2 className="text-h2 text-ink">Des solutions pour chaque besoin</h2>
        </div>
        <Link to="/services" className="flex items-center gap-1.5 text-[14.5px] font-bold text-ink">
          Tous les services <span>→</span>
        </Link>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[22px]">
        {services.map((service) => (
          <Link key={service.slug} to="/services/$slug" params={{ slug: service.slug }} className="block">
            <Card
              radius="xl"
              padding="md"
              shadow="md"
              hoverable
              className="relative h-full cursor-pointer text-inherit"
            >
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={service.color} strokeWidth="1.6">
                {service.icon}
              </svg>
              <h3 className="mb-3 mt-5 text-lg font-bold text-ink">{service.title}</h3>
              <ul className="mb-[30px] list-disc pl-[18px] text-sm leading-[1.7] text-slate">
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="absolute bottom-6 right-6 flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] border-navy/15 font-bold text-ink">
                →
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
