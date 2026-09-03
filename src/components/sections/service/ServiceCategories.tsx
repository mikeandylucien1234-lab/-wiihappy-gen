import { ImagePlaceholder } from '@/components/ui'
import { useQuoteForm } from '@/features/quote-form/QuoteFormContext'
import type { ServiceMeta } from '@/features/services/data'
import { useLocale } from '@/i18n/LocaleContext'

export function ServiceCategories({ service }: { service: ServiceMeta }) {
  const { openDrawer } = useQuoteForm()
  const { t } = useLocale()

  return (
    <section className="mx-auto max-w-content px-6 pt-[100px]">
      <h2 className="mb-3 text-center text-h2 text-ink">{t.servicePages.categoriesTitle}</h2>
      <p className="mb-12 text-center text-base text-slate">{t.servicePages.categoriesSubtitle}</p>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[22px]">
        {t.servicePages.sharedCategories.map((category, i) => {
          const formCategory = service.categoryValues[i]
          return (
            <button
              key={formCategory}
              type="button"
              onClick={() =>
                openDrawer({
                  opType: service.opType,
                  category: formCategory,
                  sourcePage: `${service.slug}-${formCategory.toLowerCase()}`,
                })
              }
              className="relative block h-[200px] overflow-hidden rounded-xl text-left"
            >
              <div className="absolute inset-0">
                <ImagePlaceholder shape="rect" label={category.placeholder} />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/10 to-primary-dark/80" />
              <span className="pointer-events-none absolute bottom-5 left-5 text-lg font-extrabold text-white">
                {category.label}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
