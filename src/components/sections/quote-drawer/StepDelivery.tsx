import { Input, Label } from '@/components/ui'
import { useQuoteForm } from '@/features/quote-form/QuoteFormContext'
import { useLocale } from '@/i18n/LocaleContext'
import { TogglePill } from './TogglePill'

export function StepDelivery() {
  const { form, setField } = useQuoteForm()
  const { t } = useLocale()

  return (
    <div>
      <h3 className="mb-1 text-lg font-extrabold text-ink">{t.quoteSteps.delivery.title}</h3>
      <p className="mb-6 text-sm text-slate">{t.quoteSteps.delivery.subtitle}</p>

      <div className="flex flex-col gap-[18px]">
        <div>
          <Label>{t.quoteSteps.delivery.country}</Label>
          <Input
            value={form.country}
            onChange={(e) => setField('country', e.target.value)}
            placeholder={t.quoteSteps.delivery.countryPlaceholder}
          />
        </div>

        <div>
          <Label className="mb-2">{t.quoteSteps.delivery.transport}</Label>
          <div className="flex gap-3">
            <TogglePill
              active={form.transport === 'Aérien'}
              gradient="bg-gradient-accent"
              onClick={() => setField('transport', 'Aérien')}
            >
              {t.quoteSteps.delivery.transportAerien}
            </TogglePill>
            <TogglePill
              active={form.transport === 'Maritime'}
              gradient="bg-gradient-accent"
              onClick={() => setField('transport', 'Maritime')}
            >
              {t.quoteSteps.delivery.transportMaritime}
            </TogglePill>
          </div>
        </div>
      </div>
    </div>
  )
}
