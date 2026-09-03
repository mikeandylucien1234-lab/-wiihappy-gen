import { Button, Card, ImagePlaceholder } from '@/components/ui'
import { useLocale } from '@/i18n/LocaleContext'

export function About() {
  const { t } = useLocale()

  return (
    <section id="apropos" className="mx-auto max-w-content px-6 pt-20">
      <Card radius="xl" padding="lg" shadow="lg" className="flex flex-wrap items-center gap-12">
        <div className="min-w-[320px] flex-1">
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
        </div>

        <div className="flex min-w-[320px] flex-1 gap-4">
          <div className="h-80 flex-1 overflow-hidden rounded-xl">
            <ImagePlaceholder shape="rect" label={t.about.image1Label} />
          </div>
          <div className="mt-9 h-80 flex-1 overflow-hidden rounded-xl">
            <ImagePlaceholder shape="rect" label={t.about.image2Label} />
          </div>
        </div>
      </Card>
    </section>
  )
}
