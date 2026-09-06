import { useEffect, useRef, useState } from 'react'
import { useLocale } from '@/i18n/LocaleContext'
import { cn } from '@/lib/cn'

const COUNT_DURATION_MS = 1400

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, inView }
}

interface StatValueProps {
  value: number | null
  prefix: string
  suffix: string
  active: boolean
}

function StatValue({ value, prefix, suffix, active }: StatValueProps) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!active || value === null) return
    const target = value
    const start = performance.now()
    let raf: number
    function tick(now: number) {
      const progress = Math.min((now - start) / COUNT_DURATION_MS, 1)
      const eased = 1 - (1 - progress) * (1 - progress)
      setDisplay(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, value])

  return (
    <span className={cn('transition-opacity duration-700', active ? 'opacity-100' : 'opacity-0')}>
      {prefix}
      {value === null ? '∞' : display}
      {suffix}
    </span>
  )
}

export function VisionStats() {
  const { t } = useLocale()
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <section className="hidden md:block bg-gradient-stats px-6 py-16">
      <div ref={ref} className="mx-auto grid max-w-content grid-cols-4 gap-8 text-center text-white">
        {t.visionStats.items.map((item) => (
          <div key={item.title}>
            <div className="text-[3.25rem] font-extralight leading-none tracking-tight">
              <StatValue value={item.value} prefix={item.prefix} suffix={item.suffix} active={inView} />
            </div>
            <div className="mt-4 text-[13px] font-bold uppercase tracking-[0.14em] text-white/85">{item.title}</div>
            <div className="mt-1.5 text-sm text-white/65">{item.text}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
