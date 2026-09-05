import { Button } from '@/components/ui'
import { useLocale } from '@/i18n/LocaleContext'

/** Mobile-only: the text half of <About>, shown earlier in the page (right
 * before the consultation banner) — <About> itself hides this same text on
 * mobile so it isn't duplicated, keeping only its two images there. */
export function AboutIntro() {
  const { t } = useLocale()

  return (
    <section className="mx-auto max-w-content px-6 pt-[100px]">
      <div className="mb-[14px] text-eyebrow text-accent">{t.about.eyebrow}</div>
      <h2 className="mb-[18px] text-[clamp(1.5rem,3vw,2rem)] font-extrabold leading-[1.25] tracking-[-0.5px] text-ink">
        {t.about.titlePrefix}{' '}
        <span className="bg-gradient-primary bg-clip-text text-transparent">{t.about.titleHighlight}</span>
        {t.about.titleSuffix}
      </h2>
      <p className="mb-[22px] text-[15.5px] leading-[1.65] text-slate">{t.about.paragraph}</p>
      <div className="mb-[26px] flex items-center gap-3">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0057D9" strokeWidth="1.6">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a13 13 0 0 1 0 18M12 3a13 13 0 0 0 0 18" />
        </svg>
        <span className="text-sm font-semibold text-ink">{t.about.badge}</span>
      </div>
      <Button variant="outline">
        {t.about.cta} <span>→</span>
      </Button>
    </section>
  )
}
