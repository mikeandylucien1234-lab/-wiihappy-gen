import { Link } from '@tanstack/react-router'
import type { ServiceMeta } from '@/features/services/data'
import { useLocale } from '@/i18n/LocaleContext'

/** Small "you are here" trail so a service page never reads like an accidental
 * redirect back to the homepage — shown right under the header. */
export function ServiceBreadcrumb({ service }: { service?: ServiceMeta }) {
  const { t } = useLocale()
  const current = service ? t.servicePages.pages[service.slug].shortTitle : undefined

  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-content px-6 pt-6 text-[13px] font-semibold text-slate">
      <Link to="/" className="hover:text-ink">
        {t.header.home}
      </Link>
      <span className="mx-2 text-muted">/</span>
      {current ? (
        <Link to="/services" className="hover:text-ink">
          {t.servicesIndex.breadcrumbLabel}
        </Link>
      ) : (
        <span className="text-ink">{t.servicesIndex.breadcrumbLabel}</span>
      )}
      {current && (
        <>
          <span className="mx-2 text-muted">/</span>
          <span className="text-ink">{current}</span>
        </>
      )}
    </nav>
  )
}
