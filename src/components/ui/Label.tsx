import { type LabelHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/cn'

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement>

export const Label = forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => {
  return <label ref={ref} className={cn('mb-1.5 block text-xs font-bold text-ink', className)} {...props} />
})
Label.displayName = 'Label'
