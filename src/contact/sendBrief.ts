/* Where a project brief goes.
   ---------------------------
   Set VITE_CONTACT_ENDPOINT to a form inbox that accepts a JSON POST
   (Formspree, Web3Forms, Basin, or the studio's own endpoint) and briefs are
   delivered there. Web3Forms also wants VITE_CONTACT_ACCESS_KEY.

   With no endpoint set, nothing can be sent from the page itself, so the
   brief is written into an email in the visitor's own mail app instead. A
   lead is never dropped silently. */

export const NEW_BUSINESS_EMAIL = 'hello@kora.studio'

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined
const ACCESS_KEY = import.meta.env.VITE_CONTACT_ACCESS_KEY as string | undefined

export interface Brief {
  services: string[]
  company: string
  goal: string
  timeline: string
  name: string
  email: string
  phone: string
  prefer: string
  /** Extra context carried in from elsewhere, such as a brand test result. */
  note: string
}

/** 'sent' went to the inbox; 'mail' was handed to the visitor's mail app. */
export type SendResult = 'sent' | 'mail'

const lines = (brief: Brief) =>
  [
    `Name: ${brief.name}`,
    `Email: ${brief.email}`,
    brief.phone && `Phone or WhatsApp: ${brief.phone}`,
    `Reply by: ${brief.prefer}`,
    `Brand or company: ${brief.company}`,
    `Needs: ${brief.services.join(', ')}`,
    brief.timeline && `Timeline: ${brief.timeline}`,
    brief.goal && `\nAbout the project:\n${brief.goal}`,
    brief.note && `\n${brief.note}`,
  ]
    .filter(Boolean)
    .join('\n')

export const briefMailto = (brief: Brief) =>
  `mailto:${NEW_BUSINESS_EMAIL}?subject=${encodeURIComponent(
    `New project: ${brief.company}`,
  )}&body=${encodeURIComponent(lines(brief))}`

export async function sendBrief(brief: Brief): Promise<SendResult> {
  if (!ENDPOINT) {
    window.location.href = briefMailto(brief)
    return 'mail'
  }

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      ...(ACCESS_KEY ? { access_key: ACCESS_KEY } : {}),
      subject: `New project: ${brief.company}`,
      from_name: brief.name,
      replyto: brief.email,
      ...brief,
      services: brief.services.join(', '),
      message: lines(brief),
    }),
  })
  if (!response.ok) throw new Error(`Brief not accepted (${response.status})`)
  return 'sent'
}
