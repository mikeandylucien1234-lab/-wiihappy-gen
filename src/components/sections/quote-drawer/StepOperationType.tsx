import { useQuoteForm } from '@/features/quote-form/QuoteFormContext'
import type { OperationType } from '@/features/quote-form/types'
import { useLocale } from '@/i18n/LocaleContext'
import { cn } from '@/lib/cn'

const icons: Record<OperationType, React.ReactNode> = {
  Import: <path d="M2 12h13m0 0-4-4m4 4-4 4M15 6h5v12h-5" />,
  Export: (
    <>
      <rect x="3" y="10" width="14" height="8" rx="1.5" />
      <path d="M3 10l3-5h6l3 5M17 13h4l2 3v2h-6" />
    </>
  ),
}

export function StepOperationType() {
  const { form, setField } = useQuoteForm()
  const { t } = useLocale()

  const options: { value: OperationType; title: string; description: string }[] = [
    { value: 'Import', title: t.quoteSteps.operationType.importTitle, description: t.quoteSteps.operationType.importDescription },
    { value: 'Export', title: t.quoteSteps.operationType.exportTitle, description: t.quoteSteps.operationType.exportDescription },
  ]

  return (
    <div>
      <h3 className="mb-1 text-lg font-extrabold text-ink">{t.quoteSteps.operationType.title}</h3>
      <p className="mb-6 text-sm text-slate">{t.quoteSteps.operationType.subtitle}</p>

      <div className="flex flex-col gap-3">
        {options.map((option) => {
          const active = form.opType === option.value
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setField('opType', option.value)}
              className={cn(
                'flex items-start gap-4 rounded-xl border-[1.5px] p-4 text-left transition-colors',
                active ? 'border-primary bg-primary/5' : 'border-navy/10 bg-white',
              )}
            >
              <span
                className={cn(
                  'flex h-11 w-11 flex-none items-center justify-center rounded-md',
                  active ? 'bg-gradient-primary' : 'bg-surface',
                )}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={active ? '#fff' : '#5B6B82'}
                  strokeWidth="1.6"
                >
                  {icons[option.value]}
                </svg>
              </span>
              <span>
                <span className="mb-1 block text-[15px] font-extrabold text-ink">{option.title}</span>
                <span className="block text-[13px] leading-[1.5] text-slate">{option.description}</span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
