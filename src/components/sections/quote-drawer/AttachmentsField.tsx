import { useRef } from 'react'
import { useQuoteForm } from '@/features/quote-form/QuoteFormContext'
import { useLocale } from '@/i18n/LocaleContext'

export function AttachmentsField() {
  const { form, addAttachments, removeAttachment } = useQuoteForm()
  const { t } = useLocale()
  const a = t.quoteSteps.attachmentsField
  const inputRef = useRef<HTMLInputElement>(null)

  function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} ${a.unitByte}`
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} ${a.unitKilo}`
    return `${(bytes / (1024 * 1024)).toFixed(1)} ${a.unitMega}`
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
        className="hidden"
        onChange={(e) => {
          if (e.target.files) addAttachments(Array.from(e.target.files))
          e.target.value = ''
        }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex w-full items-center justify-center gap-2 rounded-md border-[1.5px] border-dashed border-navy/25 bg-surface px-[14px] py-[13px] font-sans text-sm text-slate"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 3v12m0-12 4 4m-4-4-4 4" />
          <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
        </svg>
        {a.add}
      </button>

      {form.attachments.length > 0 && (
        <ul className="mt-3 flex flex-col gap-2">
          {form.attachments.map((file, i) => (
            <li
              key={`${file.name}-${file.size}-${i}`}
              className="flex items-center justify-between gap-3 rounded-md bg-surface px-3 py-2 text-xs"
            >
              <span className="truncate font-semibold text-ink">{file.name}</span>
              <span className="flex flex-none items-center gap-2 text-slate">
                {formatSize(file.size)}
                <button
                  type="button"
                  onClick={() => removeAttachment(i)}
                  aria-label={a.removeAria(file.name)}
                  className="font-bold text-danger"
                >
                  ✕
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
