import { type SelectHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { fieldClassName } from './Input'

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ className, children, ...props }, ref) => {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(fieldClassName, 'appearance-none pr-10 cursor-pointer', className)}
        {...props}
      >
        {children}
      </select>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="pointer-events-none absolute right-[14px] top-1/2 -translate-y-1/2 text-slate"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  )
})
Select.displayName = 'Select'
