import { Input, Label, Select, Textarea } from '@/components/ui'
import { useQuoteForm } from '@/features/quote-form/QuoteFormContext'
import { AttachmentsField } from './AttachmentsField'

export function StepDetails() {
  const { form, setField } = useQuoteForm()

  return (
    <div>
      <h3 className="mb-1 text-lg font-extrabold text-ink">Détails du besoin</h3>
      <p className="mb-6 text-sm text-slate">Plus c&apos;est précis, plus votre devis le sera aussi.</p>

      <div className="flex flex-col gap-[18px]">
        <div>
          <Label>Catégorie de produit</Label>
          <Select value={form.category} onChange={(e) => setField('category', e.target.value)}>
            <option value="Véhicules">Véhicules</option>
            <option value="Alimentation">Alimentation</option>
            <option value="Habillement">Habillement</option>
            <option value="Autre">Autre</option>
          </Select>
        </div>

        <div>
          <Label>Description détaillée du besoin</Label>
          <Textarea
            value={form.description}
            onChange={(e) => setField('description', e.target.value)}
            placeholder="Décrivez le produit, les spécifications..."
            rows={4}
          />
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-[18px]">
          <div>
            <Label>Quantité</Label>
            <Input
              value={form.quantity}
              onChange={(e) => setField('quantity', e.target.value)}
              placeholder="ex: 500 unités"
            />
          </div>
          <div>
            <Label>Budget estimé</Label>
            <Input
              value={form.budget}
              onChange={(e) => setField('budget', e.target.value)}
              placeholder="ex: 10 000 €"
            />
          </div>
        </div>

        <div>
          <Label>Photo / fiche technique</Label>
          <AttachmentsField />
        </div>
      </div>
    </div>
  )
}
