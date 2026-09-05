import { Fragment } from 'react'
import { STEP_COUNT } from '@/features/booking/types'
import { useLocale } from '@/i18n/LocaleContext'
import { cn } from '@/lib/cn'

const STEP_IDS = Array.from({ length: STEP_COUNT }, (_, i) => i + 1)

export function BookingStepIndicator({ step }: { step: number }) {
  const { t } = useLocale()

  return (
    <div className="mb-8">
      <div className="flex items-center gap-1.5">
        {STEP_IDS.map((id, i) => (
          <Fragment key={id}>
            <div
              className={cn(
                'flex h-7 w-7 flex-none items-center justify-center rounded-full text-xs font-extrabold transition-colors',
                id < step && 'bg-gradient-primary text-white',
                id === step && 'bg-gradient-accent text-white',
                id > step && 'border-[1.5px] border-navy/15 bg-surface text-slate',
              )}
            >
              {id < step ? '✓' : id}
            </div>
            {i < STEP_IDS.length - 1 && (
              <div className={cn('h-[2px] flex-1 rounded-full', id < step ? 'bg-primary' : 'bg-navy/10')} />
            )}
          </Fragment>
        ))}
      </div>
      <div className="mt-2.5 text-xs font-bold text-slate">
        {t.booking.steps.indicator(step, STEP_COUNT, t.booking.steps.labels[step - 1])}
      </div>
    </div>
  )
}
