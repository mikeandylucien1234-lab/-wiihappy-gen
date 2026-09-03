import { ImagePlaceholder } from '@/components/ui'
import { useLocale } from '@/i18n/LocaleContext'

export function DirectorQuote() {
  const { t } = useLocale()

  return (
    <section id="comment" className="mt-20 bg-gradient-hero px-6 py-[70px]">
      <div className="mx-auto flex max-w-narrow flex-col items-center gap-[26px] text-center">
        <div className="h-[120px] w-[120px] flex-none overflow-hidden rounded-full border-[3px] border-white/40">
          <ImagePlaceholder shape="circle" label={t.directorQuote.imageLabel} />
        </div>
        <p className="max-w-[640px] text-lg italic leading-[1.6] text-white">{t.directorQuote.text}</p>
        <div className="text-sm font-extrabold uppercase tracking-[0.04em] text-white">{t.directorQuote.author}</div>
      </div>
    </section>
  )
}
