import { Button, ImagePlaceholder } from '@/components/ui'
import { useQuoteForm } from '@/features/quote-form/QuoteFormContext'
import type { ServiceMeta } from '@/features/services/data'
import { useLocale } from '@/i18n/LocaleContext'

export function ServiceHero({ service }: { service: ServiceMeta }) {
  const { openDrawer } = useQuoteForm()
  const { t } = useLocale()
  const content = t.servicePages.pages[service.slug]

  return (
    <section className="mx-auto max-w-content px-6 pt-14">
      <div className="flex flex-wrap items-center gap-14">
        <div className="min-w-[340px] flex-1">
          <div className="mb-[18px] text-eyebrow text-primary">{content.eyebrow}</div>
          <h1 className="mb-[22px] text-hero text-ink">{content.title}</h1>
          <p className="mb-8 max-w-[480px] text-body-lg text-slate">{content.description}</p>
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
            {t.header.ctaQuote} <span>→</span>
          </Button>
        </div>

        <div className="min-w-[340px] flex-1">
          <div className="h-[380px] overflow-hidden rounded-3xl">
            <ImagePlaceholder shape="rect" label={content.heroImageLabel} />
          </div>
        </div>
      </div>
    </section>
  )
}
