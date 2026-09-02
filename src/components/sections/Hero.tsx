import { ImagePlaceholder } from '@/components/ui'

const avatarStack = [
  'bg-gradient-primary-diag',
  'bg-gradient-accent-diag',
  'bg-gradient-to-br from-primary to-primary-dark',
]

export function Hero() {
  return (
    <section id="hero" className="mx-auto max-w-content px-6 pt-14">
      <div className="flex flex-wrap items-center gap-14">
        <div className="min-w-[340px] flex-1">
          <div className="mb-[18px] text-eyebrow text-primary">SOURCING &amp; LOGISTIQUE INTERNATIONALE</div>
          <h1 className="mb-[22px] text-hero text-ink">
            Développons votre business
            <br />à l&apos;international
            <br />
            avec un partenaire
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">de confiance</span>
          </h1>
          <p className="mb-8 max-w-[480px] text-body-lg text-slate">
            Sourcing fiable de produits en Chine et à l&apos;international — véhicules, alimentation, textile,
            électronique. De la vérification fournisseur jusqu&apos;à la livraison.
          </p>
        </div>

        <div className="relative min-w-[340px] flex-1">
          <div className="h-[440px] overflow-hidden rounded-3xl">
            <ImagePlaceholder shape="rect" label="Photo réaliste : avion cargo, globe, camion et conteneurs" />
          </div>
          <div className="absolute -left-6 bottom-6 flex items-center gap-3 rounded-[18px] bg-white p-[14px_20px] shadow-[0_14px_36px_rgba(10,42,102,0.18)]">
            <div className="flex">
              {avatarStack.map((gradient, i) => (
                <div
                  key={i}
                  className={`-ml-2 h-[34px] w-[34px] rounded-full border-2 border-white first:ml-0 ${gradient}`}
                />
              ))}
            </div>
            <div className="text-[13.5px] leading-tight">
              <div className="font-extrabold text-ink">500+</div>
              <div className="text-xs text-slate">clients nous font confiance</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
