import { Link } from '@tanstack/react-router'
import { Logo } from '@/components/ui'
import { adminNavItems } from '@/features/admin/nav'
import { useLocale } from '@/i18n/LocaleContext'
import type { AdminRole } from '@/lib/database.types'
import { cn } from '@/lib/cn'

interface AdminSidebarProps {
  name: string
  role: AdminRole
  mobileOpen: boolean
  onClose: () => void
}

export function AdminSidebar({ name, role, mobileOpen, onClose }: AdminSidebarProps) {
  const { t } = useLocale()
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <>
      <div
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-[190] bg-primary-dark/45 backdrop-blur-[2px] transition-opacity duration-300 md:hidden',
          mobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-[200] flex w-[260px] flex-none flex-col border-r border-navy/[0.08] bg-white transition-transform duration-300 ease-out',
          'md:sticky md:top-0 md:h-screen md:w-[250px] md:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex flex-none items-center justify-between gap-2.5 px-5 py-[22px]">
          <div className="flex items-center gap-2.5">
            <Logo className="h-7" />
            <span className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-slate">Admin</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.common.close}
            className="flex h-8 w-8 flex-none items-center justify-center rounded-full border-[1.5px] border-navy/15 text-sm font-bold text-ink md:hidden"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-[3px] overflow-y-auto px-3 py-2">
          {adminNavItems.map((item) => (
            <Link
              key={item.id}
              to={item.to}
              onClick={onClose}
              className="flex items-center gap-3 rounded-md px-3.5 py-2.5 font-semibold text-slate transition-colors"
              activeProps={{
                className: 'bg-gradient-to-r from-primary-light/[0.14] to-accent/10 font-bold text-primary',
              }}
            >
              <span className="flex flex-none">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  {item.icon}
                </svg>
              </span>
              <span className="text-sm">{t.admin.nav[item.id]}</span>
            </Link>
          ))}
        </nav>

        <div className="flex flex-none items-center gap-2.5 border-t border-navy/[0.08] px-5 py-4">
          <div className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-full bg-gradient-primary-diag text-sm font-extrabold text-white">
            {initials}
          </div>
          <div className="min-w-0">
            <div className="truncate text-[13.5px] font-bold text-ink">{name}</div>
            <div className="text-xs text-slate">{t.admin.equipe.roleLabels[role]}</div>
          </div>
        </div>
      </aside>
    </>
  )
}
