import type { ReactNode } from 'react'
import { Button, Input, Label, Select, Textarea } from '@/components/ui'
import { useQuoteDrawer } from '@/features/quote-drawer/QuoteDrawerContext'
import { cn } from '@/lib/cn'

function TogglePill({
  active,
  gradient,
  onClick,
  children,
}: {
  active: boolean
  gradient: string
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex-1 rounded-md px-4 py-[13px] text-[14.5px] font-bold font-sans transition-colors',
        active ? `${gradient} text-white` : 'border-[1.5px] border-navy/15 bg-surface text-ink',
      )}
    >
      {children}
    </button>
  )
}

export function QuoteDrawer() {
  const {
    drawerOpen,
    closeDrawer,
    form,
    setField,
    opType,
    setOpType,
    transport,
    setTransport,
    submitted,
    hasError,
    handleSubmit,
  } = useQuoteDrawer()

  return (
    <>
      <div
        onClick={closeDrawer}
        className={cn(
          'fixed inset-0 z-[150] bg-primary-dark/45 backdrop-blur-[2px] transition-opacity duration-300',
          drawerOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      <section
        className={cn(
          'fixed right-0 top-0 z-[160] h-screen w-[min(480px,100vw)] rounded-l-3xl bg-white shadow-[-20px_0_50px_rgba(10,42,102,0.25)] transition-transform duration-[350ms] ease-out',
          drawerOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="relative box-border h-full max-w-full overflow-y-auto px-8 pb-[60px] pt-9">
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Fermer"
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] border-navy/15 bg-white text-base font-bold text-ink"
          >
            ✕
          </button>

          <h2 className="mb-2 text-2xl font-extrabold tracking-[-0.5px] text-ink">Demander un devis</h2>
          <p className="mb-8 text-[15px] text-slate">
            Remplissez ce formulaire, nous revenons vers vous sous 24-48h
          </p>

          {submitted ? (
            <div className="rounded-xl bg-gradient-primary-diag p-11 text-center text-white">
              <div className="mb-3 text-4xl">✓</div>
              <h3 className="mb-2 text-xl font-extrabold">Demande envoyée</h3>
              <p className="text-white/85">
                Merci ! Notre équipe vous contacte sous 24-48h par WhatsApp ou email.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-[18px] rounded-xl bg-surface p-[26px]">
              <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[18px]">
                <div>
                  <Label>Nom complet</Label>
                  <Input
                    value={form.name}
                    onChange={(e) => setField('name', e.target.value)}
                    placeholder="Jean Dupont"
                  />
                </div>
                <div>
                  <Label>WhatsApp</Label>
                  <Input
                    value={form.whatsapp}
                    onChange={(e) => setField('whatsapp', e.target.value)}
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>
              </div>

              <div>
                <Label>Email</Label>
                <Input
                  value={form.email}
                  onChange={(e) => setField('email', e.target.value)}
                  placeholder="jean@exemple.com"
                />
              </div>

              <div>
                <Label className="mb-2">Type d&apos;opération</Label>
                <div className="flex gap-3">
                  <TogglePill
                    active={opType === 'Import'}
                    gradient="bg-gradient-primary"
                    onClick={() => setOpType('Import')}
                  >
                    Import
                  </TogglePill>
                  <TogglePill
                    active={opType === 'Export'}
                    gradient="bg-gradient-primary"
                    onClick={() => setOpType('Export')}
                  >
                    Export
                  </TogglePill>
                </div>
              </div>

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

              <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[18px]">
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
                <Label>Photo / fiche technique / lien de référence</Label>
                <input
                  type="file"
                  className="w-full box-border rounded-md border-[1.5px] border-dashed border-navy/25 bg-surface px-[14px] py-[13px] font-sans text-sm"
                />
              </div>

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
                    active={transport === 'Aérien'}
                    gradient="bg-gradient-accent"
                    onClick={() => setTransport('Aérien')}
                  >
                    Aérien
                  </TogglePill>
                  <TogglePill
                    active={transport === 'Maritime'}
                    gradient="bg-gradient-accent"
                    onClick={() => setTransport('Maritime')}
                  >
                    Maritime
                  </TogglePill>
                </div>
              </div>

              {hasError && (
                <p className="m-0 text-sm font-semibold text-danger">
                  Merci de remplir votre nom, un contact (WhatsApp ou email) et la description du besoin.
                </p>
              )}

              <Button type="submit" variant="accent" size="lg" className="w-full font-extrabold">
                Envoyer ma demande <span>→</span>
              </Button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
