// Shared Resend helper for Wiihappy Gen edge functions.
// Requires the RESEND_API_KEY secret to be set on the project
// (Project Settings -> Edge Functions -> Secrets, or `supabase secrets set`).

const TEAM_EMAIL = 'contact@wiihappy.com'
const FROM_ADDRESS = 'Wiihappy Gen <notifications@wiihappy.com>'

export async function sendTeamEmail(subject: string, html: string): Promise<void> {
  const apiKey = Deno.env.get('RESEND_API_KEY')
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured for this project')
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: [TEAM_EMAIL],
      subject,
      html,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Resend API error (${res.status}): ${body}`)
  }
}

export function emailLayout(title: string, bodyHtml: string): string {
  return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#F7F8FA;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <div style="max-width:560px;margin:0 auto;padding:32px 24px;">
      <div style="font-size:22px;font-weight:800;letter-spacing:-0.5px;margin-bottom:24px;">
        <span style="color:#0057D9;">Wii</span><span style="color:#FF8C00;">happy</span>
      </div>
      <div style="background:#ffffff;border-radius:16px;padding:28px;box-shadow:0 4px 16px rgba(10,42,102,0.05);">
        <h1 style="font-size:18px;font-weight:800;color:#101F33;margin:0 0 16px;">${title}</h1>
        ${bodyHtml}
      </div>
      <p style="font-size:12px;color:#5B6B82;margin-top:20px;">
        Wiihappy Gen — notification interne, envoyée automatiquement.
      </p>
    </div>
  </body>
</html>`
}

export function fieldRow(label: string, value: string | null | undefined): string {
  if (!value) return ''
  return `<tr>
    <td style="padding:6px 0;color:#5B6B82;font-size:13px;">${label}</td>
    <td style="padding:6px 0;color:#101F33;font-size:13px;font-weight:700;text-align:right;">${value}</td>
  </tr>`
}
