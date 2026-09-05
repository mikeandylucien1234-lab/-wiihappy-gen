import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Button, ImagePlaceholder } from '@/components/ui'
import { useQuoteForm } from '@/features/quote-form/QuoteFormContext'
import { useLocale } from '@/i18n/LocaleContext'

const avatarStack = [
  'bg-gradient-primary-diag',
  'bg-gradient-accent-diag',
  'bg-gradient-to-br from-primary to-primary-dark',
]

/** Matches Header's MOBILE_BREAKPOINT — the video hero is mobile-only, so the
 * desktop hero below doesn't even mount the <video> (no point loading it just
 * to hide it with CSS). */
const MOBILE_BREAKPOINT = 768

function useIsMobileViewport() {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return isMobile
}

function MobileVideoHero() {
  const { openDrawer } = useQuoteForm()
  const { t } = useLocale()

  return (
    <div className="relative flex h-screen min-h-screen w-full items-center justify-center overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover object-center"
        src="/videos/hero-background.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#061A4A]/60 via-transparent to-[#061A4A]/55" />

      <div className="relative z-10 mx-auto flex max-w-narrow flex-col items-center px-6 pt-16 text-center text-white">
        <div className="mb-[18px] text-eyebrow text-white/90">{t.hero.eyebrow}</div>
        <h1 className="mb-[22px] text-hero">
          {t.hero.titleLine1}
          <br />
          {t.hero.titleLine2}
          <br />
          {t.hero.titleLine3}
          <br />
          <span className="bg-gradient-primary bg-clip-text text-transparent">{t.hero.titleHighlight}</span>
        </h1>
        <p className="mb-9 max-w-[560px] text-body-lg text-white/85">{t.hero.paragraph}</p>

        <div className="mb-11 flex flex-wrap items-center justify-center gap-4">
          <Button variant="accent" size="lg" onClick={() => openDrawer()}>
            {t.header.ctaQuote} <span>→</span>
          </Button>
          <Link to="/" hash="comment">
            <Button
              variant="outline"
              size="lg"
              className="border-white/50 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
            >
              {t.hero.ctaSecondary}
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-3 rounded-[18px] bg-white/10 px-5 py-3 backdrop-blur-sm">
          <div className="flex">
            {avatarStack.map((gradient, i) => (
              <div
                key={i}
                className={`-ml-2 h-[34px] w-[34px] rounded-full border-2 border-white/70 first:ml-0 ${gradient}`}
              />
            ))}
          </div>
          <div className="text-left text-[13.5px] leading-tight">
            <div className="font-extrabold text-white">{t.hero.trustCount}</div>
            <div className="text-xs text-white/75">{t.hero.trustLabel}</div>
          </div>
        </div>
      </div>

      <Link
        to="/"
        hash="apropos"
        aria-label={t.hero.scrollCta}
        className="absolute bottom-7 left-1/2 z-10 flex h-11 w-11 -translate-x-1/2 animate-bounce items-center justify-center rounded-full text-white"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </Link>
    </div>
  )
}

function DesktopHero() {
  const { t } = useLocale()

  return (
    <div className="mx-auto max-w-content px-6 pt-14">
      <div className="flex flex-wrap items-center gap-14">
        <div className="min-w-[340px] flex-1">
          <div className="mb-[18px] text-eyebrow text-primary">{t.hero.eyebrow}</div>
          <h1 className="mb-[22px] text-hero text-ink">
            {t.hero.titleLine1}
            <br />
            {t.hero.titleLine2}
            <br />
            {t.hero.titleLine3}
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">{t.hero.titleHighlight}</span>
          </h1>
          <p className="mb-8 max-w-[480px] text-body-lg text-slate">{t.hero.paragraph}</p>
        </div>

        <div className="relative min-w-[340px] flex-1">
          <div className="h-[440px] overflow-hidden rounded-3xl">
            <ImagePlaceholder shape="rect" label={t.hero.imageLabel} />
          </div>
          <div className="absolute -left-6 bottom-6 flex items-center gap-3 rounded-[18px] bg-white p-[14px_20px] shadow-[0_14px_36px_rgba(10,42,102,0.18)]">
            <div className="flex">
              {avatarStack.map((gradient, i) => (
                <div
                  key={i}
                  className={`-ml-2 h-[34px] w-[34px] rounded-full border-2 border-white first:ml-0 ${gradient}`}
                />
              ))}
            </div>
            <div className="text-[13.5px] leading-tight">
              <div className="font-extrabold text-ink">{t.hero.trustCount}</div>
              <div className="text-xs text-slate">{t.hero.trustLabel}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  const isMobile = useIsMobileViewport()

  return <section id="hero">{isMobile ? <MobileVideoHero /> : <DesktopHero />}</section>
}
