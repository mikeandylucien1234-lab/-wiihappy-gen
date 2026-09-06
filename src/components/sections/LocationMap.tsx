import { useLocale } from '@/i18n/LocaleContext'

// Placeholder — swap for the real office address once confirmed.
const ADDRESS = 'Av. Apoquindo 4700, Las Condes, Región Metropolitana, Chile'

export function LocationMap() {
  const { t } = useLocale()
  const encoded = encodeURIComponent(ADDRESS)
  const mapSrc = `https://www.google.com/maps?q=${encoded}&output=embed`
  const viewHref = `https://www.google.com/maps/search/?api=1&query=${encoded}`
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encoded}`

  return (
    <section className="mx-auto max-w-content px-6 pt-[100px]">
      <div className="mb-3 text-center text-eyebrow text-primary">{t.locationMap.eyebrow}</div>
      <h2 className="mb-10 text-center text-h2 text-ink">{t.locationMap.title}</h2>

      <div className="relative h-[420px] overflow-hidden rounded-2xl shadow-card-md">
        <iframe
          src={mapSrc}
          title={t.locationMap.title}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        <div className="absolute left-4 top-4 max-w-[260px] rounded-xl bg-white p-4 shadow-[0_8px_24px_rgba(10,42,102,0.18)]">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="truncate text-sm font-extrabold text-ink">{t.locationMap.name}</div>
              <div className="mt-1 text-xs leading-[1.5] text-slate">{ADDRESS}</div>
            </div>
            <a
              href={viewHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.locationMap.openInMaps}
              className="flex h-7 w-7 flex-none items-center justify-center rounded-md border-[1.5px] border-navy/15 text-ink"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <path d="M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
          </div>

          <a
            href={directionsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex h-9 items-center justify-center gap-1.5 rounded-md bg-primary text-[13px] font-bold text-white"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 11l18-8-8 18-2-8-8-2z" />
            </svg>
            {t.locationMap.directions}
          </a>
        </div>
      </div>
    </section>
  )
}
