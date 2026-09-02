import { cva, type VariantProps } from 'class-variance-authority'
import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/cn'

const badgeVariants = cva(
  'inline-flex items-center rounded-pill px-3 py-1.5 text-xs font-bold',
  {
    variants: {
      variant: {
        success: 'bg-success/[0.12] text-success', // e.g. statut "Actif"
        neutral: 'bg-slate/[0.12] text-slate', // e.g. statut "Inactif"
        danger: 'bg-danger/[0.12] text-danger',
        info: 'bg-primary/10 text-primary', // e.g. category tags
        warning: 'bg-accent/[0.12] text-accent',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  },
)

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(({ className, variant, ...props }, ref) => {
  return <span ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
})
Badge.displayName = 'Badge'
