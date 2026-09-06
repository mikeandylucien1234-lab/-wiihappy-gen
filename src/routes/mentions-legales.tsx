import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '@/components/sections/LegalPage'
import { useLocale } from '@/i18n/LocaleContext'

export const Route = createFileRoute('/mentions-legales')({
  component: LegalNoticePage,
})

function LegalNoticePage() {
  const { t } = useLocale()
  return <LegalPage title={t.footer.legalNotice} contentKey="legal.mentions" />
}
