import { useState } from 'react'
import { useFaqItems } from '@/features/faq/useFaqItems'
import { useLocale } from '@/i18n/LocaleContext'

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const { locale, t } = useLocale()
  const { data: items, isLoading } = useFaqItems()

  return (
    <section id="faq" className="mx-auto max-w-narrow px-6 pt-[100px]">
      <h2 className="mb-3 text-center text-h2 text-ink">{t.faq.title}</h2>
      <p className="mb-11 text-center text-base text-slate">{t.faq.subtitle}</p>

      {isLoading && <p className="text-center text-sm text-slate">{t.common.loading}</p>}

      <div className="flex flex-col gap-3">
        {items?.map((item, i) => {
          const open = openIndex === i
          const question = item[`question_${locale}`]
          const answer = item[`answer_${locale}`]
          return (
            <div key={item.id} className="overflow-hidden rounded-lg bg-white shadow-card">
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex w-full items-center justify-between gap-3 bg-transparent px-6 py-5 text-left font-sans"
              >
                <span className="text-[15.5px] font-bold text-ink">{question}</span>
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
                <p className="mx-6 mb-5 text-[14.5px] leading-[1.6] text-slate">{answer}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
