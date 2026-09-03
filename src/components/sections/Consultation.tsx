import { Button, Card, ImagePlaceholder } from '@/components/ui'
import { useQuoteForm } from '@/features/quote-form/QuoteFormContext'
import { useLocale } from '@/i18n/LocaleContext'

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

function IconStrategy() {
  return (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9l-3.5 1.5L10 14l3.5-1.5z" />
    </>
  )
}
function IconCompliance() {
  return <path d="M12 3v18M5 7l-3 6a3 3 0 0 0 6 0zM19 7l-3 6a3 3 0 0 0 6 0zM5 7h6M13 7h6" />
}
function IconCosts() {
  return (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8h8M8 12h3M13 12h3M8 16h3" />
    </>
  )
}
function IconFollowUp() {
  return (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" />
    </>
  )
}

const cardIcons = [IconStrategy, IconCompliance, IconCosts, IconFollowUp]
const cardGradients = ['bg-gradient-primary-diag', 'bg-gradient-primary-diag', 'bg-gradient-accent-diag', 'bg-gradient-accent-diag']

export function Consultation() {
  const { openDrawer } = useQuoteForm()
  const { t } = useLocale()

  function openConsultation() {
    openDrawer({ description: t.consultation.descriptionPrefix, sourcePage: 'consultation' })
  }

  const [card1, card2, card3, card4] = t.consultation.cards
  const [Icon1, Icon2, Icon3, Icon4] = cardIcons

  return (
    <section className="mx-auto max-w-content px-6 pt-[100px]">
      <Card radius="lg" padding="none" className="p-14 shadow-[0_8px_30px_rgba(10,42,102,0.07)]">
        <h2 className="mx-auto mb-[14px] max-w-[720px] text-center text-h2 leading-[1.25] text-ink">
          {t.consultation.title}
        </h2>
        <p className="mx-auto mb-11 max-w-[620px] text-center text-base text-slate">{t.consultation.subtitle}</p>

        <div className="flex flex-wrap items-stretch gap-5">
          <div className="flex min-w-[260px] flex-1 flex-col gap-5">
            <InfoCard gradient={cardGradients[0]} title={card1.title} description={card1.description}>
              <Icon1 />
            </InfoCard>
            <InfoCard gradient={cardGradients[1]} title={card2.title} description={card2.description}>
              <Icon2 />
            </InfoCard>
          </div>

          <div className="min-h-[340px] min-w-[260px] flex-[1.2] overflow-hidden rounded-[18px]">
            <ImagePlaceholder shape="rect" label={t.consultation.imageLabel} />
          </div>

          <div className="flex min-w-[260px] flex-1 flex-col gap-5">
            <InfoCard gradient={cardGradients[2]} title={card3.title} description={card3.description}>
              <Icon3 />
            </InfoCard>
            <InfoCard gradient={cardGradients[3]} title={card4.title} description={card4.description}>
              <Icon4 />
            </InfoCard>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Button variant="accent" size="lg" onClick={openConsultation} className="font-extrabold">
            {t.consultation.cta} <span>→</span>
          </Button>
        </div>
      </Card>
    </section>
  )
}
