import { Button } from '@/components/ui'
import { useCallbackForm } from '@/features/callback/CallbackFormContext'
import { useLocale } from '@/i18n/LocaleContext'
import { featureMeta } from './GlobalReach'

export function GlobalReachMobile() {
  const { openDrawer } = useCallbackForm()
  const { t } = useLocale()

  return (
    <section className="mx-auto max-w-content px-6 pt-[100px]">
      <div className="mb-[14px] text-center text-eyebrow text-primary">{t.globalReach.eyebrow}</div>
      <h2 className="mb-6 text-center text-h2 text-ink">{t.globalReach.title}</h2>

      <div className="mb-10 flex justify-center">
        <Button variant="accent" onClick={openDrawer}>
          {t.globalReach.ctaMobile} <span>→</span>
        </Button>
      </div>

      <div className="flex flex-col gap-[26px]">
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
      </div>
    </section>
  )
}
