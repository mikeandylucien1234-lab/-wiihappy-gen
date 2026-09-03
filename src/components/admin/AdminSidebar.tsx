import { Link } from '@tanstack/react-router'
import { adminNavItems } from '@/features/admin/nav'
import { useLocale } from '@/i18n/LocaleContext'
import type { AdminRole } from '@/lib/database.types'

export function AdminSidebar({ name, role }: { name: string; role: AdminRole }) {
  const { t } = useLocale()
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <aside className="flex w-[250px] flex-none flex-col border-r border-navy/[0.08] bg-white">
      <div className="flex flex-none items-center gap-2.5 px-5 py-[22px]">
        <span className="text-xl font-extrabold tracking-tight text-primary">Wii<span className="text-accent">happy</span></span>
        <span className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-slate">Admin</span>
      </div>

      <nav className="flex flex-1 flex-col gap-[3px] overflow-y-auto px-3 py-2">
        {adminNavItems.map((item) => (
          <Link
            key={item.id}
            to={item.to}
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
  )
}
