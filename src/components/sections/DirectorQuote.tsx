import { ImagePlaceholder } from '@/components/ui'

export function DirectorQuote() {
  return (
    <section id="comment" className="mt-20 bg-gradient-hero px-6 py-[70px]">
      <div className="mx-auto flex max-w-narrow flex-col items-center gap-[26px] text-center">
        <div className="h-[120px] w-[120px] flex-none overflow-hidden rounded-full border-[3px] border-white/40">
          <ImagePlaceholder shape="circle" label="Photo du directeur" />
        </div>
        <p className="max-w-[640px] text-lg italic leading-[1.6] text-white">
          &ldquo;Un professionnel et entrepreneur incluant la direction générale d&apos;organisations de toute
          taille, le développement stratégique, les opérations et le marketing produit à l&apos;échelle
          mondiale.&rdquo;
        </p>
        <div className="text-sm font-extrabold uppercase tracking-[0.04em] text-white">
          M. Fagenson Phadael, Directeur
        </div>
      </div>
    </section>
  )
}
