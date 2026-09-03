import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function TogglePill({
  active,
  gradient,
  onClick,
  children,
}: {
  active: boolean
  gradient: string
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex-1 rounded-md px-4 py-[13px] font-sans text-[14.5px] font-bold transition-colors',
        active ? `${gradient} text-white` : 'border-[1.5px] border-navy/15 bg-surface text-ink',
      )}
    >
      {children}
    </button>
  )
}
