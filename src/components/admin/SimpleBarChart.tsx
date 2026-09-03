export interface BarDatum {
  label: string
  value: number
  color: string
}

/**
 * Minimal horizontal bar chart for admin stats — thin bars, rounded data-ends,
 * direct labels (no floating legend needed: each bar's own label names it).
 * Single-axis (value), never dual-axis.
 */
export function SimpleBarChart({ data }: { data: BarDatum[] }) {
  const max = Math.max(1, ...data.map((d) => d.value))

  return (
    <div className="flex flex-col gap-3">
      {data.map((d) => (
        <div key={d.label} className="flex items-center gap-3">
          <span className="w-28 flex-none truncate text-xs font-semibold text-slate">{d.label}</span>
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface">
            <div
              className="h-full rounded-full transition-[width] duration-500"
              style={{ width: `${(d.value / max) * 100}%`, backgroundColor: d.color }}
              title={`${d.label}: ${d.value}`}
            />
          </div>
          <span className="w-8 flex-none text-right text-xs font-bold text-ink">{d.value}</span>
        </div>
      ))}
    </div>
  )
}
