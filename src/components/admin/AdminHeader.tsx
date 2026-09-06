import { Link } from '@tanstack/react-router'
import { useUnreadNotificationsCount } from '@/features/admin/notifications'
import { useLocale } from '@/i18n/LocaleContext'

export function AdminHeader({ name, onMenuClick }: { name: string; onMenuClick: () => void }) {
  const { data: unreadCount } = useUnreadNotificationsCount()
  const { t } = useLocale()
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <header className="flex flex-none items-center gap-3 border-b border-navy/[0.08] bg-white px-4 py-3 sm:gap-5 sm:px-7 sm:py-3.5">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label={t.admin.header.openMenu}
        className="flex h-9 w-9 flex-none items-center justify-center rounded-md border-[1.5px] border-navy/10 text-ink md:hidden"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      <div className="relative max-w-[420px] flex-1">
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#5B6B82"
          strokeWidth="1.8"
          className="absolute left-3.5 top-1/2 -translate-y-1/2"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
        <input
          placeholder={t.admin.header.searchPlaceholder}
          className="w-full rounded-md border-[1.5px] border-navy/10 bg-surface py-2.5 pl-[38px] pr-3.5 text-sm text-ink placeholder:text-slate focus:outline-none focus:border-primary/60"
        />
      </div>

      <div className="flex-1" />

      <Link
        to="/admin/notifications"
        className="relative flex h-[38px] w-[38px] items-center justify-center rounded-full border-[1.5px] border-navy/10 bg-white"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#101F33" strokeWidth="1.7">
          <path d="M18 8a6 6 0 1 0-12 0c0 4-2 5-2 7h16c0-2-2-3-2-7" />
          <path d="M10 20a2 2 0 0 0 4 0" />
        </svg>
        {!!unreadCount && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-pill bg-gradient-accent px-1 text-[10px] font-extrabold text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Link>

      <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-light text-sm font-extrabold text-white">
        {initials}
      </div>
    </header>
  )
}
