import { useLocale } from '@/i18n/LocaleContext'

/** Mobile-only scrolling banner shown right after the hero. Desktop has
 * enough visual weight already (photo + trust badge), so this is hidden
 * there via md:hidden. */
export function HeroMarquee() {
  const { t } = useLocale()
  const items = t.hero.marquee

  return (
    <div className="mt-6 overflow-hidden bg-gradient-primary py-3.5 md:hidden">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex flex-none items-center" aria-hidden={copy === 1}>
            {items.map((item, i) => (
              <span key={i} className="flex items-center whitespace-nowrap px-4 text-sm font-bold uppercase tracking-[0.08em] text-white">
                {item}
                <span className="ml-4 text-white/50">•</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
