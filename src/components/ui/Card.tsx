import { cva, type VariantProps } from 'class-variance-authority'
import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/cn'

const cardVariants = cva('bg-white', {
  variants: {
    padding: {
      none: 'p-0',
      sm: 'p-5', // 20px — compact panels, table rows
      md: 'p-[30px]', // service cards, standard panels
      lg: 'p-14', // 56px — hero/about/consultation panels
    },
    radius: {
      sm: 'rounded-lg', // 16px — small cards (FAQ item, table container)
      md: 'rounded-xl', // 20px — standard cards
      lg: 'rounded-2xl', // 24px — modals
      xl: 'rounded-3xl', // 28px — large hero panels
    },
    shadow: {
      none: 'shadow-none',
      DEFAULT: 'shadow-card',
      md: 'shadow-card-md',
      lg: 'shadow-card-lg',
    },
    hoverable: {
      true: 'transition-all duration-200 hover:-translate-y-1.5 hover:shadow-card-hover',
      false: '',
    },
  },
  defaultVariants: {
    padding: 'md',
    radius: 'md',
    shadow: 'md',
    hoverable: false,
  },
})

export interface CardProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, padding, radius, shadow, hoverable, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ padding, radius, shadow, hoverable }), className)}
        {...props}
      />
    )
  },
)
Card.displayName = 'Card'
