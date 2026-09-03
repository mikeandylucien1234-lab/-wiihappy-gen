import { ImagePlaceholder } from '@/components/ui'
import { useQuoteForm } from '@/features/quote-form/QuoteFormContext'
import type { ServiceContent } from '@/features/services/data'

export function ServiceCategories({ service }: { service: ServiceContent }) {
  const { openDrawer } = useQuoteForm()

  return (
    <section className="mx-auto max-w-content px-6 pt-[100px]">
      <h2 className="mb-3 text-center text-h2 text-ink">Catégories concernées</h2>
      <p className="mb-12 text-center text-base text-slate">
        Cliquez sur une catégorie pour démarrer votre demande, déjà pré-remplie
      </p>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[22px]">
        {service.categories.map((category) => (
          <button
            key={category.label}
            type="button"
            onClick={() =>
              openDrawer({
                opType: service.opType,
                category: category.formCategory,
                sourcePage: `${service.slug}-${category.formCategory.toLowerCase()}`,
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
        ))}
      </div>
    </section>
  )
}
