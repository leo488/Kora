/* Start a project → the studio inbox.
   ----------------------------------
   The site's forms POST the brief here. It is sent from the studio's own
   Zoho mailbox to itself, with the visitor as Reply-To, so answering a lead
   is just pressing Reply.

   Needs, in Vercel → Project → Settings → Environment Variables:
     ZOHO_USER           the Zoho address that sends (e.g. hello@wearekoraa.com)
     ZOHO_APP_PASSWORD   an app-specific password made in Zoho Mail
   Optional:
     ZOHO_SMTP_HOST      smtp.zoho.com (default), smtp.zoho.eu, smtp.zoho.in …
     BRIEF_TO            where briefs land (defaults to ZOHO_USER)

   Without the two required values it answers 503, and the page falls back to
   opening the visitor's own mail app, so a lead is never lost. */

import nodemailer from 'nodemailer'

const MAX = 5000
const clean = (v: unknown, max = 300) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
const json = (status: number, body: object) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

export async function POST(request: Request) {
  const user = process.env.ZOHO_USER
  const pass = process.env.ZOHO_APP_PASSWORD
  if (!user || !pass) return json(503, { ok: false, error: 'Mail is not set up yet' })

  let data: Record<string, unknown>
  try {
    data = await request.json()
  } catch {
    return json(400, { ok: false, error: 'Bad request' })
  }

  // The forms' hidden honeypot: people never fill it, bots do.
  if (clean(data.website_url)) return json(200, { ok: true })

  const name = clean(data.name, 120)
  const email = clean(data.email, 200)
  const company = clean(data.company, 200) || name
  const message = clean(data.message, MAX)
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message) {
    return json(400, { ok: false, error: 'Name, email and details are required' })
  }

  const transport = nodemailer.createTransport({
    host: process.env.ZOHO_SMTP_HOST || 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: { user, pass },
  })

  try {
    await transport.sendMail({
      from: `"Koraa’ website" <${user}>`,
      to: process.env.BRIEF_TO || user,
      replyTo: `"${name.replace(/"/g, '')}" <${email}>`,
      subject: `New project: ${company}`,
      text: `${message}\n\n—\nSent from the Start a project form on the Koraa’ website.`,
    })
  } catch (error) {
    console.error('Brief mail failed', error)
    return json(502, { ok: false, error: 'Could not send' })
  }
  return json(200, { ok: true })
}
