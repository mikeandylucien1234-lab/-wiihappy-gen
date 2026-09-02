import { useState } from 'react'

const faqs = [
  {
    q: 'Comment se passe le paiement ?',
    a: "Le paiement s'effectue par virement bancaire sécurisé, selon les modalités précisées dans votre devis.",
  },
  {
    q: 'Quels délais pour recevoir un devis ?',
    a: 'Nous vous transmettons une proposition détaillée sous 24 à 48h après réception de votre demande.',
  },
  {
    q: 'Puis-je suivre ma commande en ligne ?',
    a: 'Oui, un suivi personnalisé vous est communiqué par WhatsApp ou email à chaque étape.',
  },
  {
    q: 'Quels pays sont desservis ?',
    a: 'Nous travaillons principalement avec la Chine, mais aussi de nombreux autres pays fournisseurs à travers le monde.',
  },
  {
    q: "Que faire si le produit n'est pas dans votre catalogue ?",
    a: 'Décrivez-le dans le formulaire de sourcing personnalisé : nous le trouvons et l’expédions pour vous.',
  },
]

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="mx-auto max-w-narrow px-6 pt-[100px]">
      <h2 className="mb-3 text-center text-h2 text-ink">Questions fréquentes</h2>
      <p className="mb-11 text-center text-base text-slate">Tout ce qu&apos;il faut savoir avant de commencer</p>

      <div className="flex flex-col gap-3">
        {faqs.map((faq, i) => {
          const open = openIndex === i
          return (
            <div key={faq.q} className="overflow-hidden rounded-lg bg-white shadow-card">
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex w-full items-center justify-between gap-3 bg-transparent px-6 py-5 text-left font-sans"
              >
                <span className="text-[15.5px] font-bold text-ink">{faq.q}</span>
                <span
                  className={`flex-none text-xl font-bold text-primary transition-transform duration-200 ${
                    open ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                style={{ maxHeight: open ? '300px' : '0px' }}
              >
                <p className="mx-6 mb-5 text-[14.5px] leading-[1.6] text-slate">{faq.a}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
