// Triggered hourly by pg_cron (see supabase/migrations/0005_email_notifications.sql).
// Finds devis still 'nouveau' more than 24h after submission and not yet alerted on,
// sends one alert email listing them, then marks them so the same devis doesn't
// trigger a repeat alert every hour. Not meant to be called from the browser.
import { createClient } from 'jsr:@supabase/supabase-js@2'
import { emailLayout, sendTeamEmail } from '../_shared/resend.ts'

const STALE_AFTER_MS = 24 * 60 * 60 * 1000

Deno.serve(async (_req: Request) => {
  try {
    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
    const cutoff = new Date(Date.now() - STALE_AFTER_MS).toISOString()

    const { data: stale, error } = await supabase
      .from('devis')
      .select('*')
      .eq('status', 'nouveau')
      .is('stale_alert_sent_at', null)
      .lt('created_at', cutoff)

    if (error) throw error
    if (!stale || stale.length === 0) {
      return new Response('no stale devis', { status: 200 })
    }

    const rows = stale
      .map((d) => {
        const hours = Math.floor((Date.now() - new Date(d.created_at).getTime()) / (60 * 60 * 1000))
        return `<tr>
          <td style="padding:8px 0;border-bottom:1px solid #F1F3F7;color:#101F33;font-size:13px;font-weight:700;">${d.name}</td>
          <td style="padding:8px 0;border-bottom:1px solid #F1F3F7;color:#5B6B82;font-size:13px;">${d.op_type} / ${d.category}</td>
          <td style="padding:8px 0;border-bottom:1px solid #F1F3F7;color:#D9480F;font-size:13px;font-weight:700;text-align:right;">${hours}h</td>
        </tr>`
      })
      .join('')

    const bodyHtml = `
      <p style="font-size:14px;color:#101F33;margin:0 0 16px;">
        ${stale.length} devis n'ont reçu aucun traitement depuis plus de 24h :
      </p>
      <table style="width:100%;border-collapse:collapse;">${rows}</table>
      <a href="https://wiihappy.com/admin/devis"
         style="display:inline-block;margin-top:20px;background:linear-gradient(90deg,#FF8C00,#FFB800);color:#fff;padding:12px 22px;border-radius:999px;font-weight:700;font-size:14px;text-decoration:none;">
        Voir les devis →
      </a>
    `

    await sendTeamEmail(`⚠ ${stale.length} devis en attente depuis 24h+`, emailLayout('Devis sans traitement', bodyHtml))

    const ids = stale.map((d) => d.id)
    const { error: updateError } = await supabase
      .from('devis')
      .update({ stale_alert_sent_at: new Date().toISOString() })
      .in('id', ids)
    if (updateError) throw updateError

    return new Response(`alerted ${ids.length} devis`, { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response(String(err), { status: 500 })
  }
})
