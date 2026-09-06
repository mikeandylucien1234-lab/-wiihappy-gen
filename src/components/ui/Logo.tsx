import { cn } from '@/lib/cn'

export interface LogoProps {
  /** 'light' adds a drop shadow so the mark stays legible over photos/video (e.g. the transparent header on the mobile hero). */
  variant?: 'dark' | 'light'
  className?: string
}

export function Logo({ variant = 'dark', className }: LogoProps) {
  return (
    <img
      src="/images/wiihappy-logo.png"
      alt="Wiihappy"
      className={cn('h-8 w-auto object-contain', variant === 'light' && 'drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]', className)}
    />
  )
}
