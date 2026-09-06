import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '@/components/sections/LegalPage'
import { useLocale } from '@/i18n/LocaleContext'

export const Route = createFileRoute('/politique-confidentialite')({
  component: PrivacyPolicyPage,
})

function PrivacyPolicyPage() {
  const { t } = useLocale()
  return <LegalPage title={t.footer.privacyPolicy} contentKey="legal.privacy" />
}
