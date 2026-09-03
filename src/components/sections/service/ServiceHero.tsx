import { Button, ImagePlaceholder } from '@/components/ui'
import { useQuoteForm } from '@/features/quote-form/QuoteFormContext'
import type { ServiceContent } from '@/features/services/data'

export function ServiceHero({ service }: { service: ServiceContent }) {
  const { openDrawer } = useQuoteForm()

  return (
    <section className="mx-auto max-w-content px-6 pt-14">
      <div className="flex flex-wrap items-center gap-14">
        <div className="min-w-[340px] flex-1">
          <div className="mb-[18px] text-eyebrow text-primary">{service.eyebrow}</div>
          <h1 className="mb-[22px] text-hero text-ink">{service.title}</h1>
          <p className="mb-8 max-w-[480px] text-body-lg text-slate">{service.description}</p>
          <Button
            variant="accent"
            onClick={() =>
              openDrawer({
                opType: service.opType,
                category: service.defaultCategory,
                sourcePage: service.slug,
              })
            }
          >
            Demander un devis <span>→</span>
          </Button>
        </div>

        <div className="min-w-[340px] flex-1">
          <div className="h-[380px] overflow-hidden rounded-3xl">
            <ImagePlaceholder shape="rect" label={service.heroImageLabel} />
          </div>
        </div>
      </div>
    </section>
  )
}
