import { Input, Label } from '@/components/ui'
import { useQuoteForm } from '@/features/quote-form/QuoteFormContext'

export function StepContact() {
  const { form, setField } = useQuoteForm()

  return (
    <div>
      <h3 className="mb-1 text-lg font-extrabold text-ink">Vos coordonnées</h3>
      <p className="mb-6 text-sm text-slate">Pour vous transmettre votre devis sous 24-48h.</p>

      <div className="flex flex-col gap-[18px]">
        <div>
          <Label>Nom complet</Label>
          <Input value={form.name} onChange={(e) => setField('name', e.target.value)} placeholder="Jean Dupont" />
        </div>
        <div>
          <Label>WhatsApp</Label>
          <Input
            value={form.whatsapp}
            onChange={(e) => setField('whatsapp', e.target.value)}
            placeholder="+33 6 12 34 56 78"
          />
        </div>
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => setField('email', e.target.value)}
            placeholder="jean@exemple.com"
          />
        </div>
        <p className="text-xs text-slate">Renseignez au moins un moyen de contact (WhatsApp ou email).</p>
      </div>
    </div>
  )
}
