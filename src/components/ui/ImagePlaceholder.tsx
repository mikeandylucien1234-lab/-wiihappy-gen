import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export interface ImagePlaceholderProps extends HTMLAttributes<HTMLDivElement> {
  /** Description of the final photo/illustration, shown as a hint. */
  label: string
  shape?: 'rect' | 'circle'
}

/**
 * Stand-in for the <image-slot> elements in the reference prototype.
 * Swap for a real <img> once photography/illustrations are available —
 * the label documents what each slot is meant to show.
 */
export function ImagePlaceholder({ label, shape = 'rect', className, ...props }: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/[0.08] to-accent/[0.08] p-4 text-center',
        shape === 'circle' && 'rounded-full',
        className,
      )}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-primary/40">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="8.5" cy="9.5" r="1.75" />
          <path d="M21 16l-5-5-4.5 4.5" />
        </svg>
        <span className="max-w-[180px] text-[11px] font-semibold leading-snug text-slate">{label}</span>
      </div>
    </div>
  )
}
