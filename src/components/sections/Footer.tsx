import { Link } from '@tanstack/react-router'
import { Logo } from '@/components/ui'
import { useLocale } from '@/i18n/LocaleContext'
import { cn } from '@/lib/cn'
import type { Locale } from '@/lib/database.types'

const locales: Locale[] = ['fr', 'en', 'es']

const socialIcons = [
  {
    label: 'Facebook',
    path: 'M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.5.3v2.7h-1.4c-1.2 0-1.5.6-1.5 1.4V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z',
  },
  {
    label: 'Instagram',
    path: 'M12 2.2c2.7 0 3 0 4 .1 1 .1 1.7.2 2.3.5.6.3 1.1.6 1.6 1.1.5.5.8 1 1.1 1.6.2.6.4 1.3.5 2.3.1 1 .1 1.3.1 4s0 3-.1 4c-.1 1-.2 1.7-.5 2.3-.3.6-.6 1.1-1.1 1.6-.5.5-1 .8-1.6 1.1-.6.2-1.3.4-2.3.5-1 .1-1.3.1-4 .1s-3 0-4-.1c-1-.1-1.7-.2-2.3-.5-.6-.3-1.1-.6-1.6-1.1-.5-.5-.8-1-1.1-1.6-.2-.6-.4-1.3-.5-2.3-.1-1-.1-1.3-.1-4s0-3 .1-4c.1-1 .2-1.7.5-2.3.3-.6.6-1.1 1.1-1.6.5-.5 1-.8 1.6-1.1.6-.2 1.3-.4 2.3-.5 1-.1 1.3-.1 4-.1zm0 3.5a6.3 6.3 0 1 0 0 12.6 6.3 6.3 0 0 0 0-12.6zm0 10.4a4.1 4.1 0 1 1 0-8.2 4.1 4.1 0 0 1 0 8.2zm6.4-10.6a1.4 1.4 0 1 1-2.8 0 1.4 1.4 0 0 1 2.8 0z',
  },
  {
    label: 'LinkedIn',
    path: 'M17.5 2h-11A4.5 4.5 0 0 0 2 6.5v11A4.5 4.5 0 0 0 6.5 22h11a4.5 4.5 0 0 0 4.5-4.5v-11A4.5 4.5 0 0 0 17.5 2zM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z',
  },
]

export function Footer() {
  const { locale, setLocale, t } = useLocale()

  const navLinks = [
    { label: t.footer.navHome, hash: 'hero' },
    { label: t.footer.navServices, hash: 'services' },
    { label: t.footer.navComment, hash: 'comment' },
    { label: t.footer.navCategories, hash: 'categories' },
    { label: t.footer.navFaq, hash: 'faq' },
  ]

  return (
    <footer id="footer" className="mt-24 bg-gradient-footer px-6 pb-[30px] pt-[70px] text-white/85">
      <div className="mx-auto grid max-w-content grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-10 border-b border-white/15 pb-10">
        <div>
          <Logo variant="light" className="mb-[14px]" />
          <p className="text-sm leading-[1.6] text-white/65">{t.footer.tagline}</p>
        </div>

        <div>
          <h5 className="mb-4 text-sm font-extrabold uppercase tracking-[0.05em] text-white">{t.footer.navTitle}</h5>
          <div className="flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <Link key={link.hash} to="/" hash={link.hash} className="text-[14.5px] text-white/75">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h5 className="mb-4 text-sm font-extrabold uppercase tracking-[0.05em] text-white">{t.footer.contactTitle}</h5>
          <div className="flex flex-col gap-2.5 text-[14.5px] text-white/75">
            <span>{t.footer.contactEmail}</span>
            <span>{t.footer.contactWhatsapp}</span>
            <span>{t.footer.contactHours}</span>
          </div>
        </div>

        <div>
          <h5 className="mb-4 text-sm font-extrabold uppercase tracking-[0.05em] text-white">{t.footer.followTitle}</h5>
          <div className="mb-5 flex gap-3">
            {socialIcons.map((icon) => (
              <a
                key={icon.label}
                href="#"
                aria-label={icon.label}
                className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white/[0.12]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
                  <path d={icon.path} />
                </svg>
              </a>
            ))}
          </div>
          <div className="flex gap-2">
            {locales.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLocale(l)}
                aria-current={locale === l}
                className={cn(
                  'rounded-md px-2.5 py-[5px] text-xs font-bold uppercase transition-colors',
                  locale === l ? 'bg-white/[0.15] text-white' : 'bg-white/[0.06] text-white/50',
                )}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mx-auto mt-6 max-w-content text-center text-[13px] text-white/50">{t.footer.copyright}</p>
    </footer>
  )
}
