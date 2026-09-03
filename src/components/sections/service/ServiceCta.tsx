import { Button } from '@/components/ui'
import { useQuoteForm } from '@/features/quote-form/QuoteFormContext'
import type { ServiceMeta } from '@/features/services/data'
import { useLocale } from '@/i18n/LocaleContext'

export function ServiceCta({ service }: { service: ServiceMeta }) {
  const { openDrawer } = useQuoteForm()
  const { t } = useLocale()
  const content = t.servicePages.pages[service.slug]

  return (
    <section className="mx-auto max-w-content px-6 pt-[100px]">
      <div className="rounded-3xl bg-gradient-hero px-8 py-16 text-center text-white">
        <h2 className="mx-auto mb-3 max-w-[560px] text-h2">{content.ctaTitle}</h2>
        <p className="mx-auto mb-8 max-w-[480px] text-base text-white/85">{content.ctaDescription}</p>
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
          {content.ctaLabel} <span>→</span>
        </Button>
      </div>
    </section>
  )
}
