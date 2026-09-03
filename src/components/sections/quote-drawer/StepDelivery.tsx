import { Input, Label } from '@/components/ui'
import { useQuoteForm } from '@/features/quote-form/QuoteFormContext'
import { TogglePill } from './TogglePill'

export function StepDelivery() {
  const { form, setField } = useQuoteForm()

  return (
    <div>
      <h3 className="mb-1 text-lg font-extrabold text-ink">Livraison</h3>
      <p className="mb-6 text-sm text-slate">Où et comment souhaitez-vous recevoir votre marchandise ?</p>

      <div className="flex flex-col gap-[18px]">
        <div>
          <Label>Pays / adresse de livraison</Label>
          <Input
            value={form.country}
            onChange={(e) => setField('country', e.target.value)}
            placeholder="Pays, ville"
          />
        </div>

        <div>
          <Label className="mb-2">Mode de transport préféré</Label>
          <div className="flex gap-3">
            <TogglePill
              active={form.transport === 'Aérien'}
              gradient="bg-gradient-accent"
              onClick={() => setField('transport', 'Aérien')}
            >
              Aérien
            </TogglePill>
            <TogglePill
              active={form.transport === 'Maritime'}
              gradient="bg-gradient-accent"
              onClick={() => setField('transport', 'Maritime')}
            >
              Maritime
            </TogglePill>
          </div>
        </div>
      </div>
    </div>
  )
}
