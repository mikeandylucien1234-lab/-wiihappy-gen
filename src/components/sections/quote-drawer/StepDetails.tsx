import { Input, Label, Select, Textarea } from '@/components/ui'
import { useQuoteForm } from '@/features/quote-form/QuoteFormContext'
import { useLocale } from '@/i18n/LocaleContext'
import { AttachmentsField } from './AttachmentsField'

const categoryValues = ['Véhicules', 'Alimentation', 'Habillement', 'Autre'] as const

export function StepDetails() {
  const { form, setField } = useQuoteForm()
  const { t } = useLocale()

  return (
    <div>
      <h3 className="mb-1 text-lg font-extrabold text-ink">{t.quoteSteps.details.title}</h3>
      <p className="mb-6 text-sm text-slate">{t.quoteSteps.details.subtitle}</p>

      <div className="flex flex-col gap-[18px]">
        <div>
          <Label>{t.quoteSteps.details.category}</Label>
          <Select value={form.category} onChange={(e) => setField('category', e.target.value)}>
            {categoryValues.map((value) => (
              <option key={value} value={value}>
                {t.quoteSteps.details.categoryOptions[value]}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label>{t.quoteSteps.details.description}</Label>
          <Textarea
            value={form.description}
            onChange={(e) => setField('description', e.target.value)}
            placeholder={t.quoteSteps.details.descriptionPlaceholder}
            rows={4}
          />
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-[18px]">
          <div>
            <Label>{t.quoteSteps.details.quantity}</Label>
            <Input
              value={form.quantity}
              onChange={(e) => setField('quantity', e.target.value)}
              placeholder={t.quoteSteps.details.quantityPlaceholder}
            />
          </div>
          <div>
            <Label>{t.quoteSteps.details.budget}</Label>
            <Input
              value={form.budget}
              onChange={(e) => setField('budget', e.target.value)}
              placeholder={t.quoteSteps.details.budgetPlaceholder}
            />
          </div>
        </div>

        <div>
          <Label>{t.quoteSteps.details.attachments}</Label>
          <AttachmentsField />
        </div>
      </div>
    </div>
  )
}
