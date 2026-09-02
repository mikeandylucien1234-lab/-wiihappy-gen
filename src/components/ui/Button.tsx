import { cva, type VariantProps } from 'class-variance-authority'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill font-bold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        accent: 'bg-gradient-accent text-white shadow-button hover:shadow-button-lg',
        primary: 'bg-gradient-primary text-white shadow-button hover:shadow-button-lg',
        outline: 'border-[1.5px] border-navy/20 bg-transparent text-ink hover:bg-surface',
        ghost: 'border-[1.5px] border-navy/15 bg-surface text-ink hover:bg-white',
        danger: 'border-[1.5px] border-danger/20 bg-danger/[0.08] text-danger hover:bg-danger/[0.12]',
        success: 'border-[1.5px] border-success/25 bg-success/10 text-success hover:bg-success/15',
      },
      size: {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-[22px] py-3 text-sm',
        lg: 'px-[30px] py-[17px] text-base',
      },
    },
    defaultVariants: {
      variant: 'accent',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  },
)
Button.displayName = 'Button'
