import { Button, ImagePlaceholder } from '@/components/ui'
import { useQuoteForm } from '@/features/quote-form/QuoteFormContext'

const features = [
  {
    color: '#0057D9',
    iconBg: 'bg-primary/10',
    title: 'Achat direct en Chine',
    description:
      'Nous achetons pour vous auprès des meilleurs fournisseurs chinois, avec vérification qualité avant expédition.',
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
      </>
    ),
  },
  {
    color: '#FF8C00',
    iconBg: 'bg-accent/[0.12]',
    title: 'Livraison partout dans le monde',
    description: 'Aérien ou maritime, nous organisons le transport jusqu’à votre porte, où que vous soyez.',
    icon: <path d="M2 12h13m0 0-4-4m4 4-4 4M15 6h5v12h-5" />,
  },
  {
    color: '#0057D9',
    iconBg: 'bg-primary/10',
    title: 'Douane et logistique gérées',
    description: 'De l’usine à la livraison finale, on s’occupe de toutes les formalités pour vous.',
    icon: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 8h6M9 12h6M9 16h4" />
      </>
    ),
  },
]

export function GlobalReach() {
  const { openDrawer } = useQuoteForm()

  return (
    <section className="mx-auto max-w-content px-6 pt-[100px]">
      <div className="mb-[14px] text-center text-eyebrow text-primary">NOTRE PORTÉE</div>
      <h2 className="mb-12 text-center text-h2 text-ink">De la Chine à votre porte, partout dans le monde</h2>

      <div className="flex flex-wrap items-center gap-14">
        <div className="flex min-w-[320px] flex-1 flex-col gap-[26px]">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-start gap-4">
              <div className={`flex h-12 w-12 flex-none items-center justify-center rounded-full ${feature.iconBg}`}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={feature.color} strokeWidth="1.6">
                  {feature.icon}
                </svg>
              </div>
              <div>
                <h4 className="mb-1.5 text-base font-bold text-ink">{feature.title}</h4>
                <p className="text-[14.5px] leading-[1.55] text-slate">{feature.description}</p>
              </div>
            </div>
          ))}
          <Button variant="accent" onClick={() => openDrawer()} className="mt-1.5 self-start">
            Contactez-nous <span>→</span>
          </Button>
        </div>

        <div className="min-w-[320px] flex-1">
          <div className="h-[340px]">
            <ImagePlaceholder shape="rect" label="Carte du monde : flèches de trajets depuis la Chine" />
          </div>
        </div>
      </div>
    </section>
  )
}
