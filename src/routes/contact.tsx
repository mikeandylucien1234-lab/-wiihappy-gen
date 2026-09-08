import { createFileRoute, Link } from '@tanstack/react-router'
import { Button, Card } from '@/components/ui'
import { Footer } from '@/components/sections/Footer'
import { Header } from '@/components/sections/Header'
import { LocationMap } from '@/components/sections/LocationMap'
import { useQuoteForm } from '@/features/quote-form/QuoteFormContext'
import { useLocale } from '@/i18n/LocaleContext'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
})

const PHONE_E164 = '+56983634549'
const WHATSAPP_NUMBER = '56983634549'

function IconPhone() {
  return <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
}
function IconMail() {
  return (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </>
  )
}
function IconWhatsapp() {
  return (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 8.5c.3-.6 1-.6 1.3 0l.6 1.2c.2.4.1.9-.2 1.2l-.4.4c.5 1 1.4 1.9 2.4 2.4l.4-.4c.3-.3.8-.4 1.2-.2l1.2.6c.6.3.6 1 0 1.3-1.4 1-3.4.7-4.8-.7s-1.7-3.4-.7-4.8z" />
    </>
  )
}
function IconClock() {
  return (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </>
  )
}

function ContactPage() {
  const { t } = useLocale()
  const { openDrawer } = useQuoteForm()
  const p = t.contactPage

  const cards = [
    { icon: IconPhone, label: p.phoneLabel, value: t.header.phone, href: `tel:${PHONE_E164}` },
    { icon: IconMail, label: p.emailLabel, value: t.footer.contactEmail, href: `mailto:${t.footer.contactEmail}` },
    { icon: IconWhatsapp, label: p.whatsappLabel, value: t.header.phone, href: `https://wa.me/${WHATSAPP_NUMBER}` },
    { icon: IconClock, label: p.hoursLabel, value: t.header.hours, href: null },
  ]

  return (
    <div className="overflow-x-hidden bg-surface text-ink">
      <Header />

      <section className="mx-auto max-w-content px-6 pb-[60px] pt-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-[13px] font-semibold text-slate">
          <Link to="/" className="hover:text-ink">
            {t.header.home}
          </Link>
          <span className="mx-2 text-muted">/</span>
          <span className="text-ink">{p.title}</span>
        </nav>

        <div className="mb-3 text-eyebrow text-primary">{p.eyebrow}</div>
        <h1 className="mb-3 max-w-[560px] text-h1 text-ink">{p.title}</h1>
        <p className="mb-10 max-w-[560px] text-body-lg text-slate">{p.subtitle}</p>

        <div className="mb-14 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
          {cards.map((card) => {
            const Icon = card.icon
            const content = (
              <>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-gradient-primary-diag text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <Icon />
                  </svg>
                </div>
                <div className="mb-1 text-xs font-extrabold uppercase tracking-[0.06em] text-slate">{card.label}</div>
                <div className="text-[15px] font-bold text-ink">{card.value}</div>
              </>
            )

            return card.href ? (
              <a
                key={card.label}
                href={card.href}
                target={card.href.startsWith('http') ? '_blank' : undefined}
                rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                <Card radius="lg" padding="md" shadow="none" hoverable className="border-[1.5px] border-navy/[0.08]">
                  {content}
                </Card>
              </a>
            ) : (
              <Card key={card.label} radius="lg" padding="md" shadow="none" className="border-[1.5px] border-navy/[0.08]">
                {content}
              </Card>
            )
          })}
        </div>

        <Button variant="accent" size="lg" onClick={() => openDrawer()} className="font-extrabold">
          {p.ctaQuote} <span>→</span>
        </Button>
      </section>

      <LocationMap />

      <Footer />
    </div>
  )
}
