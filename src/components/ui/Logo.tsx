import { cn } from '@/lib/cn'

export interface LogoProps {
  /** 'dark' for light backgrounds (header), 'light' for dark backgrounds (footer, hero banner). */
  variant?: 'dark' | 'light'
  className?: string
}

export function Logo({ variant = 'dark', className }: LogoProps) {
  return (
    <span className={cn('flex items-baseline text-2xl font-extrabold tracking-tight', className)}>
      <span className={variant === 'dark' ? 'text-primary' : 'text-white'}>Wii</span>
      <span className="text-accent">happy</span>
    </span>
  )
}
