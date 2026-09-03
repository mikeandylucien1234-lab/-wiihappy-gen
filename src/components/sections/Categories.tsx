import { ImagePlaceholder } from '@/components/ui'
import { useQuoteForm } from '@/features/quote-form/QuoteFormContext'
import { useLocale } from '@/i18n/LocaleContext'

const formCategories = ['Véhicules', 'Alimentation', 'Habillement', 'Autre'] as const

export function Categories() {
  const { openDrawer } = useQuoteForm()
  const { t } = useLocale()

  return (
    <section id="categories" className="mx-auto max-w-content px-6 pt-[100px]">
      <h2 className="mb-3 text-center text-h2 text-ink">{t.homeCategories.title}</h2>
      <p className="mb-12 text-center text-base text-slate">{t.homeCategories.subtitle}</p>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[22px]">
        {t.homeCategories.items.map((category, i) => {
          const formCategory = formCategories[i]
          return (
            <button
              key={formCategory}
              type="button"
              onClick={() =>
                openDrawer({
                  category: formCategory,
                  sourcePage: `categories-${formCategory.toLowerCase()}`,
                })
              }
              className="relative block h-[260px] overflow-hidden rounded-xl text-left"
            >
              <div className="absolute inset-0">
                <ImagePlaceholder shape="rect" label={category.placeholder} />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/10 to-primary-dark/80" />
              <span className="pointer-events-none absolute bottom-5 left-5 text-xl font-extrabold text-white">
                {category.label}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
