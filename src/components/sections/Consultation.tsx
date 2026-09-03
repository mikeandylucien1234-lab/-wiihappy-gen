import { Button, Card, ImagePlaceholder } from '@/components/ui'
import { useQuoteForm } from '@/features/quote-form/QuoteFormContext'

interface InfoCardProps {
  gradient: string
  title: string
  description: string
  children: React.ReactNode
}

function InfoCard({ gradient, title, description, children }: InfoCardProps) {
  return (
    <div className="flex flex-1 flex-col gap-3 rounded-[18px] bg-surface p-[22px]">
      <div
        className={`flex h-11 w-11 flex-none items-center justify-center rounded-md ${gradient}`}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.7">
          {children}
        </svg>
      </div>
      <p className="text-[14.5px] leading-[1.55] text-ink">
        <strong>{title}</strong> <span className="text-slate">{description}</span>
      </p>
    </div>
  )
}

export function Consultation() {
  const { openDrawer } = useQuoteForm()

  function openConsultation() {
    openDrawer({ description: 'Consultation — ', sourcePage: 'consultation' })
  }

  return (
    <section className="mx-auto max-w-content px-6 pt-[100px]">
      <Card radius="lg" padding="none" className="p-14 shadow-[0_8px_30px_rgba(10,42,102,0.07)]">
        <h2 className="mx-auto mb-[14px] max-w-[720px] text-center text-h2 leading-[1.25] text-ink">
          Consultation
        </h2>
        <p className="mx-auto mb-11 max-w-[620px] text-center text-base text-slate">
          Bénéficiez de conseils personnalisés pour sécuriser vos opérations d&apos;import-export et éviter les
          erreurs coûteuses.
        </p>

        <div className="flex flex-wrap items-stretch gap-5">
          <div className="flex min-w-[260px] flex-1 flex-col gap-5">
            <InfoCard
              gradient="bg-gradient-primary-diag"
              title="Stratégie de sourcing."
              description="Identifiez les meilleurs marchés et fournisseurs selon votre secteur et votre budget."
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M15 9l-3.5 1.5L10 14l3.5-1.5z" />
            </InfoCard>
            <InfoCard
              gradient="bg-gradient-primary-diag"
              title="Conformité douanière."
              description="Anticipez les réglementations et documents requis pour éviter tout blocage à la frontière."
            >
              <path d="M12 3v18M5 7l-3 6a3 3 0 0 0 6 0zM19 7l-3 6a3 3 0 0 0 6 0zM5 7h6M13 7h6" />
            </InfoCard>
          </div>

          <div className="min-h-[340px] min-w-[260px] flex-[1.2] overflow-hidden rounded-[18px]">
            <ImagePlaceholder
              shape="rect"
              label="Photo verticale : conseiller Wiihappy en environnement professionnel"
            />
          </div>

          <div className="flex min-w-[260px] flex-1 flex-col gap-5">
            <InfoCard
              gradient="bg-gradient-accent-diag"
              title="Optimisation des coûts."
              description="Réduisez vos coûts logistiques grâce à une analyse détaillée de vos options de transport."
            >
              <rect x="4" y="3" width="16" height="18" rx="2" />
              <path d="M8 8h8M8 12h3M13 12h3M8 16h3" />
            </InfoCard>
            <InfoCard
              gradient="bg-gradient-accent-diag"
              title="Suivi personnalisé."
              description="Un conseiller dédié vous accompagne à chaque étape de votre projet international."
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" />
            </InfoCard>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Button variant="accent" size="lg" onClick={openConsultation} className="font-extrabold">
            Réserver une consultation <span>→</span>
          </Button>
        </div>
      </Card>
    </section>
  )
}
