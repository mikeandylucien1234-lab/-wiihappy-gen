import { Input, Label, Select, Textarea } from '@/components/ui'
import { useBookingForm } from '@/features/booking/BookingFormContext'
import { useLocale } from '@/i18n/LocaleContext'
import type { ReservationMotif } from '@/lib/database.types'

const motifValues: ReservationMotif[] = ['Importation', 'Exportation', 'Sourcing personnalisé', 'Question générale']

export function StepContact() {
  const { form, setField } = useBookingForm()
  const { t } = useLocale()
  const s = t.booking.step2

  return (
    <div>
      <h3 className="mb-1 text-lg font-extrabold text-ink">{s.title}</h3>
      <p className="mb-6 text-sm text-slate">{s.subtitle}</p>

      <div className="flex flex-col gap-[18px]">
        <div>
          <Label>{s.name}</Label>
          <Input value={form.nomComplet} onChange={(e) => setField('nomComplet', e.target.value)} placeholder={s.namePlaceholder} />
        </div>
        <div>
          <Label>{s.whatsapp}</Label>
          <Input value={form.whatsapp} onChange={(e) => setField('whatsapp', e.target.value)} placeholder={s.whatsappPlaceholder} />
        </div>
        <div>
          <Label>{s.email}</Label>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => setField('email', e.target.value)}
            placeholder={s.emailPlaceholder}
          />
        </div>
        <div>
          <Label>{s.motif}</Label>
          <Select value={form.motif} onChange={(e) => setField('motif', e.target.value as ReservationMotif)}>
            {motifValues.map((value) => (
              <option key={value} value={value}>
                {s.motifOptions[value]}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label>{s.notes}</Label>
          <Textarea value={form.notes} onChange={(e) => setField('notes', e.target.value)} placeholder={s.notesPlaceholder} rows={3} />
        </div>
      </div>
    </div>
  )
}
