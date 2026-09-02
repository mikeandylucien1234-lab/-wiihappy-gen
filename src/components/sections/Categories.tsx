import { ImagePlaceholder } from '@/components/ui'
import { useQuoteDrawer } from '@/features/quote-drawer/QuoteDrawerContext'

const categories = [
  { label: 'Véhicules', placeholder: 'Véhicules' },
  { label: 'Ciment', placeholder: 'Alimentation' },
  { label: 'Habillement', placeholder: 'Habillement' },
  { label: 'Autre / Sourcing', placeholder: 'Sourcing sur-mesure' },
]

export function Categories() {
  const { openDrawer } = useQuoteDrawer()

  return (
    <section id="categories" className="mx-auto max-w-content px-6 pt-[100px]">
      <h2 className="mb-3 text-center text-h2 text-ink">Que pouvons-nous vous procurer ?</h2>
      <p className="mb-12 text-center text-base text-slate">Quatre grandes catégories, et bien plus sur demande</p>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[22px]">
        {categories.map((category) => (
          <button
            key={category.label}
            type="button"
            onClick={openDrawer}
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
        ))}
      </div>
    </section>
  )
}
