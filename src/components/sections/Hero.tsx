import { ImagePlaceholder } from '@/components/ui'
import { useLocale } from '@/i18n/LocaleContext'

const avatarStack = [
  'bg-gradient-primary-diag',
  'bg-gradient-accent-diag',
  'bg-gradient-to-br from-primary to-primary-dark',
]

export function Hero() {
  const { t } = useLocale()

  return (
    <section id="hero" className="mx-auto max-w-content px-6 pt-14">
      <div className="flex flex-wrap items-center gap-14">
        <div className="min-w-[340px] flex-1">
          <div className="mb-[18px] text-eyebrow text-primary">{t.hero.eyebrow}</div>
          <h1 className="mb-[22px] text-hero text-ink">
            {t.hero.titleLine1}
            <br />
            {t.hero.titleLine2}
            <br />
            {t.hero.titleLine3}
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">{t.hero.titleHighlight}</span>
          </h1>
          <p className="mb-8 max-w-[480px] text-body-lg text-slate">{t.hero.paragraph}</p>
        </div>

        <div className="relative min-w-[340px] flex-1">
          <div className="h-[440px] overflow-hidden rounded-3xl">
            <ImagePlaceholder shape="rect" label={t.hero.imageLabel} />
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
              <div className="font-extrabold text-ink">{t.hero.trustCount}</div>
              <div className="text-xs text-slate">{t.hero.trustLabel}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
