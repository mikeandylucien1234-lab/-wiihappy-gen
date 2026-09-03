import type { ServiceContent } from '@/features/services/data'

export function ServiceSteps({ service }: { service: ServiceContent }) {
  return (
    <section className="mx-auto max-w-content px-6 pt-[100px]">
      <div className="mb-3 text-center text-eyebrow text-primary">COMMENT ÇA MARCHE</div>
      <h2 className="mb-12 text-center text-h2 text-ink">Le déroulé de votre demande</h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
        {service.steps.map((step, i) => (
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
