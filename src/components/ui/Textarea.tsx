import { type TextareaHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { fieldClassName } from './Input'

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, rows = 4, ...props }, ref) => {
  return <textarea ref={ref} rows={rows} className={cn(fieldClassName, 'resize-y', className)} {...props} />
})
Textarea.displayName = 'Textarea'
