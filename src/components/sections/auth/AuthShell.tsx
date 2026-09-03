import type { ReactNode } from 'react'
import { Footer } from '@/components/sections/Footer'
import { Header } from '@/components/sections/Header'
import { Card } from '@/components/ui'

export function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="overflow-x-hidden bg-surface text-ink">
      <Header />

      <section className="mx-auto max-w-content px-6 py-20">
        <Card radius="xl" padding="lg" shadow="md" className="mx-auto max-w-[420px]">
          <h1 className="mb-2 text-h2 text-ink">{title}</h1>
          <p className="mb-8 text-sm text-slate">{subtitle}</p>
          {children}
        </Card>
      </section>

      <Footer />
    </div>
  )
}
