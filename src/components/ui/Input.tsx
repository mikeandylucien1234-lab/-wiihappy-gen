import { type InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/cn'

export const fieldClassName =
  'w-full box-border rounded-md border-[1.5px] border-navy/[0.12] bg-surface px-[14px] py-[13px] font-sans text-sm text-ink placeholder:text-muted focus:outline-none focus:border-primary/60 transition-colors'

export type InputProps = InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return <input ref={ref} className={cn(fieldClassName, className)} {...props} />
})
Input.displayName = 'Input'
