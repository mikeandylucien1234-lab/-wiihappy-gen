import { jsPDF } from 'jspdf'
import { statusLabels } from '@/features/account/status'
import type { Database } from '@/lib/database.types'

type DevisRow = Database['public']['Tables']['devis']['Row']

const PRIMARY = [0, 87, 217] as const
const INK = [16, 31, 51] as const
const SLATE = [91, 107, 130] as const

function field(doc: jsPDF, label: string, value: string, x: number, y: number) {
  doc.setFontSize(9)
  doc.setTextColor(...SLATE)
  doc.text(label.toUpperCase(), x, y)
  doc.setFontSize(11)
  doc.setTextColor(...INK)
  doc.text(value || '—', x, y + 5.5)
}

export function generateDevisPdf(devis: DevisRow) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const marginX = 18
  let y = 20

  doc.setFontSize(22)
  doc.setTextColor(...PRIMARY)
  doc.setFont('helvetica', 'bold')
  doc.text('Wii', marginX, y)
  doc.setTextColor(255, 140, 0)
  doc.text('happy', marginX + doc.getTextWidth('Wii'), y)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(...SLATE)
  doc.text('Courtage et sourcing international', marginX, y + 6)

  doc.setFontSize(10)
  doc.setTextColor(...INK)
  doc.text(`Devis ${devis.id.slice(0, 8).toUpperCase()}`, 210 - marginX, y, { align: 'right' })
  doc.setTextColor(...SLATE)
  doc.text(new Date(devis.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }), 210 - marginX, y + 6, {
    align: 'right',
  })

  y += 18
  doc.setDrawColor(230, 232, 238)
  doc.line(marginX, y, 210 - marginX, y)
  y += 12

  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...INK)
  doc.text(`${devis.op_type} — ${devis.category}`, marginX, y)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(...PRIMARY)
  doc.text(statusLabels[devis.status], 210 - marginX, y, { align: 'right' })

  y += 14
  const colWidth = (210 - marginX * 2) / 2
  field(doc, 'Client', devis.name, marginX, y)
  field(doc, 'Contact', devis.email ?? devis.whatsapp ?? '—', marginX + colWidth, y)
  y += 14
  field(doc, 'Quantité', devis.quantity ?? '—', marginX, y)
  field(doc, 'Budget estimé', devis.budget ?? '—', marginX + colWidth, y)
  y += 14
  field(doc, 'Pays de livraison', devis.country ?? '—', marginX, y)
  field(doc, 'Transport', devis.transport ?? '—', marginX + colWidth, y)

  y += 16
  doc.setDrawColor(230, 232, 238)
  doc.line(marginX, y, 210 - marginX, y)
  y += 10

  doc.setFontSize(9)
  doc.setTextColor(...SLATE)
  doc.text('DESCRIPTION DU BESOIN', marginX, y)
  y += 6
  doc.setFontSize(10.5)
  doc.setTextColor(...INK)
  const lines = doc.splitTextToSize(devis.description, 210 - marginX * 2)
  doc.text(lines, marginX, y)

  doc.setFontSize(8.5)
  doc.setTextColor(...SLATE)
  doc.text('Wiihappy Gen — document généré automatiquement, à usage interne et client.', marginX, 287)

  doc.save(`devis-${devis.id.slice(0, 8)}.pdf`)
}
