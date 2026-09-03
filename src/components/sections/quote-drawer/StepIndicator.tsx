import { Fragment } from 'react'
import { STEPS } from '@/features/quote-form/types'
import { useLocale } from '@/i18n/LocaleContext'
import { cn } from '@/lib/cn'

export function StepIndicator({ step }: { step: number }) {
  const { t } = useLocale()

  return (
    <div className="mb-8">
      <div className="flex items-center gap-1.5">
        {STEPS.map((s, i) => (
          <Fragment key={s.id}>
            <div
              className={cn(
                'flex h-7 w-7 flex-none items-center justify-center rounded-full text-xs font-extrabold transition-colors',
                s.id < step && 'bg-gradient-primary text-white',
                s.id === step && 'bg-gradient-accent text-white',
                s.id > step && 'border-[1.5px] border-navy/15 bg-surface text-slate',
              )}
            >
              {s.id < step ? '✓' : s.id}
            </div>
            {i < STEPS.length - 1 && (
              <div className={cn('h-[2px] flex-1 rounded-full', s.id < step ? 'bg-primary' : 'bg-navy/10')} />
            )}
          </Fragment>
        ))}
      </div>
      <div className="mt-2.5 text-xs font-bold text-slate">
        {t.quoteSteps.indicator(step, STEPS.length, t.quoteSteps.labels[step - 1])}
      </div>
    </div>
  )
}
