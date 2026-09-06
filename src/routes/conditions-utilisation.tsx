import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '@/components/sections/LegalPage'
import { useLocale } from '@/i18n/LocaleContext'

export const Route = createFileRoute('/conditions-utilisation')({
  component: TermsOfServicePage,
})

function TermsOfServicePage() {
  const { t } = useLocale()
  return <LegalPage title={t.footer.termsOfService} contentKey="legal.terms" />
}
