import { Button } from '@/components/ui'
import { useBookingForm } from '@/features/booking/BookingFormContext'
import { useLocale } from '@/i18n/LocaleContext'

/** Mobile-only replacement for <Consultation> — a single pre-composed banner
 * image instead of the 4-card layout, per request. */
export function ConsultationBanner() {
  const { openDrawer } = useBookingForm()
  const { t } = useLocale()

  return (
    <section className="mx-auto max-w-content px-6 pt-[100px]">
      <img src="/images/consultation-banner.png" alt={t.consultation.title} className="w-full rounded-2xl" />
      <div className="mt-6 flex justify-center">
        <Button variant="accent" size="lg" onClick={openDrawer} className="font-extrabold">
          {t.consultation.mobileBannerCta} <span>→</span>
        </Button>
      </div>
    </section>
  )
}
