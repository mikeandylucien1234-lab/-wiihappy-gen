import { Button, ImagePlaceholder } from '@/components/ui'
import { useQuoteForm } from '@/features/quote-form/QuoteFormContext'
import { useLocale } from '@/i18n/LocaleContext'

const featureMeta = [
  {
    color: '#0057D9',
    iconBg: 'bg-primary/10',
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
      </>
    ),
  },
  {
    color: '#FF8C00',
    iconBg: 'bg-accent/[0.12]',
    icon: <path d="M2 12h13m0 0-4-4m4 4-4 4M15 6h5v12h-5" />,
  },
  {
    color: '#0057D9',
    iconBg: 'bg-primary/10',
    icon: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 8h6M9 12h6M9 16h4" />
      </>
    ),
  },
] as const

export function GlobalReach() {
  const { openDrawer } = useQuoteForm()
  const { t } = useLocale()

  return (
    <section className="mx-auto max-w-content px-6 pt-[100px]">
      <div className="mb-[14px] text-center text-eyebrow text-primary">{t.globalReach.eyebrow}</div>
      <h2 className="mb-12 text-center text-h2 text-ink">{t.globalReach.title}</h2>

      <div className="flex flex-wrap items-center gap-14">
        <div className="flex min-w-[320px] flex-1 flex-col gap-[26px]">
          {featureMeta.map((meta, i) => {
            const feature = t.globalReach.features[i]
            return (
              <div key={feature.title} className="flex items-start gap-4">
                <div className={`flex h-12 w-12 flex-none items-center justify-center rounded-full ${meta.iconBg}`}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={meta.color} strokeWidth="1.6">
                    {meta.icon}
                  </svg>
                </div>
                <div>
                  <h4 className="mb-1.5 text-base font-bold text-ink">{feature.title}</h4>
                  <p className="text-[14.5px] leading-[1.55] text-slate">{feature.description}</p>
                </div>
              </div>
            )
          })}
          <Button variant="accent" onClick={() => openDrawer()} className="mt-1.5 self-start">
            {t.globalReach.cta} <span>→</span>
          </Button>
        </div>

        <div className="min-w-[320px] flex-1">
          <div className="h-[340px]">
            <ImagePlaceholder shape="rect" label={t.globalReach.imageLabel} />
          </div>
        </div>
      </div>
    </section>
  )
}
