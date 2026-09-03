import type { ServiceMeta } from '@/features/services/data'
import { useLocale } from '@/i18n/LocaleContext'

export function ServiceSteps({ service }: { service: ServiceMeta }) {
  const { t } = useLocale()
  const content = t.servicePages.pages[service.slug]

  return (
    <section className="mx-auto max-w-content px-6 pt-[100px]">
      <div className="mb-3 text-center text-eyebrow text-primary">{t.servicePages.stepsEyebrow}</div>
      <h2 className="mb-12 text-center text-h2 text-ink">{t.servicePages.stepsTitle}</h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
        {content.steps.map((step, i) => (
          <div key={step.title} className="rounded-xl bg-white p-6 shadow-card-md">
            <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary text-sm font-extrabold text-white">
              {i + 1}
            </div>
            <h4 className="mb-1.5 text-[15px] font-bold text-ink">{step.title}</h4>
            <p className="text-[13.5px] leading-[1.55] text-slate">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
