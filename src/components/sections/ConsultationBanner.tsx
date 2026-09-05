import { useLocale } from '@/i18n/LocaleContext'

/** Mobile-only replacement for <Consultation> — a single pre-composed banner
 * image instead of the 4-card layout, per request. */
export function ConsultationBanner() {
  const { t } = useLocale()

  return (
    <section className="mx-auto max-w-content px-6 pt-[100px]">
      <img src="/images/consultation-banner.png" alt={t.consultation.title} className="w-full rounded-2xl" />
    </section>
  )
}
