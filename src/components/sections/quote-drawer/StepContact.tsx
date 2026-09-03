import { Input, Label } from '@/components/ui'
import { useQuoteForm } from '@/features/quote-form/QuoteFormContext'
import { useLocale } from '@/i18n/LocaleContext'

export function StepContact() {
  const { form, setField } = useQuoteForm()
  const { t } = useLocale()

  return (
    <div>
      <h3 className="mb-1 text-lg font-extrabold text-ink">{t.quoteSteps.contact.title}</h3>
      <p className="mb-6 text-sm text-slate">{t.quoteSteps.contact.subtitle}</p>

      <div className="flex flex-col gap-[18px]">
        <div>
          <Label>{t.quoteSteps.contact.name}</Label>
          <Input
            value={form.name}
            onChange={(e) => setField('name', e.target.value)}
            placeholder={t.quoteSteps.contact.namePlaceholder}
          />
        </div>
        <div>
          <Label>{t.quoteSteps.contact.whatsapp}</Label>
          <Input
            value={form.whatsapp}
            onChange={(e) => setField('whatsapp', e.target.value)}
            placeholder={t.quoteSteps.contact.whatsappPlaceholder}
          />
        </div>
        <div>
          <Label>{t.quoteSteps.contact.email}</Label>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => setField('email', e.target.value)}
            placeholder={t.quoteSteps.contact.emailPlaceholder}
          />
        </div>
        <p className="text-xs text-slate">{t.quoteSteps.contact.helper}</p>
      </div>
    </div>
  )
}
