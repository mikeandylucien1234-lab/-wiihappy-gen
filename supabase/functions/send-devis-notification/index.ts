// Triggered by a Postgres AFTER INSERT trigger on public.devis (see
// supabase/migrations/0005_email_notifications.sql). Sends a "new devis" email
// to the team via Resend. Not meant to be called from the browser.
import { createClient } from 'jsr:@supabase/supabase-js@2'
import { emailLayout, fieldRow, sendTeamEmail } from '../_shared/resend.ts'

Deno.serve(async (req: Request) => {
  try {
    const { devis_id } = await req.json()
    if (!devis_id) {
      return new Response('Missing devis_id', { status: 400 })
    }

    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

    const { data: devis, error } = await supabase.from('devis').select('*').eq('id', devis_id).maybeSingle()
    if (error) throw error
    if (!devis) return new Response('devis not found', { status: 404 })

    const bodyHtml = `
      <p style="font-size:14px;color:#101F33;margin:0 0 16px;">
        Une nouvelle demande de devis vient d'être soumise.
      </p>
      <table style="width:100%;border-collapse:collapse;">
        ${fieldRow('Client', devis.name)}
        ${fieldRow('Contact', devis.email ?? devis.whatsapp)}
        ${fieldRow('Type', devis.op_type)}
        ${fieldRow('Catégorie', devis.category)}
        ${fieldRow('Quantité', devis.quantity)}
        ${fieldRow('Budget', devis.budget)}
        ${fieldRow('Pays', devis.country)}
        ${fieldRow('Transport', devis.transport)}
      </table>
      <p style="font-size:13px;color:#5B6B82;margin:16px 0 0;line-height:1.6;">${devis.description}</p>
      <a href="https://wiihappy.com/admin/devis/${devis.id}"
         style="display:inline-block;margin-top:20px;background:linear-gradient(90deg,#FF8C00,#FFB800);color:#fff;padding:12px 22px;border-radius:999px;font-weight:700;font-size:14px;text-decoration:none;">
        Voir le devis →
      </a>
    `

    await sendTeamEmail(`Nouveau devis — ${devis.name}`, emailLayout('Nouveau devis reçu', bodyHtml))

    return new Response('ok', { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response(String(err), { status: 500 })
  }
})
