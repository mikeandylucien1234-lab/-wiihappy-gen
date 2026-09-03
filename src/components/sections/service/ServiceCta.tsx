import { Button } from '@/components/ui'
import { useQuoteForm } from '@/features/quote-form/QuoteFormContext'
import type { ServiceContent } from '@/features/services/data'

export function ServiceCta({ service }: { service: ServiceContent }) {
  const { openDrawer } = useQuoteForm()

  return (
    <section className="mx-auto max-w-content px-6 pt-[100px]">
      <div className="rounded-3xl bg-gradient-hero px-8 py-16 text-center text-white">
        <h2 className="mx-auto mb-3 max-w-[560px] text-h2">{service.ctaTitle}</h2>
        <p className="mx-auto mb-8 max-w-[480px] text-base text-white/85">{service.ctaDescription}</p>
        <Button
          variant="accent"
          size="lg"
          onClick={() =>
            openDrawer({
              opType: service.opType,
              category: service.defaultCategory,
              sourcePage: service.slug,
            })
          }
          className="font-extrabold"
        >
          {service.ctaLabel} <span>→</span>
        </Button>
      </div>
    </section>
  )
}
