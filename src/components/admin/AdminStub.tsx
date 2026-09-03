import { Card } from '@/components/ui'

export function AdminStub({ title }: { title: string }) {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-extrabold tracking-[-0.5px] text-ink">{title}</h1>
      <Card radius="lg" padding="md" shadow="none" className="border-[1.5px] border-dashed border-navy/15">
        <p className="text-sm text-slate">Ce module arrive bientôt.</p>
      </Card>
    </div>
  )
}
