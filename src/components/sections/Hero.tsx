import { useEffect, useState } from 'react'
import { ImagePlaceholder } from '@/components/ui'
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
  return (
    <div className="relative h-screen min-h-screen w-full overflow-hidden">
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
