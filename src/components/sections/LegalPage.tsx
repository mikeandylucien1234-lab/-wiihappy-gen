import { Link } from '@tanstack/react-router'
import { Footer } from '@/components/sections/Footer'
import { Header } from '@/components/sections/Header'
import { useSiteContent } from '@/features/content/useSiteContent'
import { useLocale } from '@/i18n/LocaleContext'

export function LegalPage({ title, contentKey }: { title: string; contentKey: string }) {
  const { data, isLoading } = useSiteContent(contentKey)
  const { t } = useLocale()

  return (
    <div className="overflow-x-hidden bg-surface text-ink">
      <Header />

      <section className="mx-auto max-w-[760px] px-6 pb-[100px] pt-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-[13px] font-semibold text-slate">
          <Link to="/" className="hover:text-ink">
            {t.header.home}
          </Link>
          <span className="mx-2 text-muted">/</span>
          <span className="text-ink">{title}</span>
        </nav>

        <h1 className="mb-8 text-h1 text-ink">{title}</h1>

        {isLoading ? (
          <p className="text-sm text-slate">{t.common.loading}</p>
        ) : (
          <div className="whitespace-pre-wrap text-[15px] leading-[1.75] text-slate">{data}</div>
        )}
      </section>

      <Footer />
    </div>
  )
}
