import { useState } from 'react'
import { OFFICES } from '../../data'
import { FlareMedia } from './Flare'

const NEW_BUSINESS_EMAIL = 'hello@kora.studio'

/** "Ready to start?" — heading and addresses on the left, a portrait top
 *  right. Every page ends on it, so the Contact pill always has a target. */
export function Contact() {
  const rows = [
    { label: 'New business', value: NEW_BUSINESS_EMAIL },
    ...OFFICES.map((office) => ({ label: office.city, value: office.email })),
  ]

  return (
    <section className="kora-rx-contact" id="contact" aria-labelledby="kora-rx-contact-heading">
      <div className="kora-rx-contact-text">
        <h2 id="kora-rx-contact-heading">Ready to start?</h2>
        <dl className="kora-rx-contact-rows">
          {rows.map((row) => (
            <div key={row.label}>
              <dt>{row.label}</dt>
              <dd>
                <a href={`mailto:${row.value}`}>{row.value}</a>
              </dd>
              <CopyButton text={row.value} />
            </div>
          ))}
        </dl>
      </div>

      {/* A portrait of the studio goes here, as on the reference. Left blank
          until there is a photo. */}
      <FlareMedia className="kora-rx-contact-photo">
        <span aria-hidden="true" />
      </FlareMedia>
    </section>
  )
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard blocked; the address is still a mailto link beside it.
    }
  }
  return (
    <button type="button" className="kora-rx-copy" onClick={copy}>
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}
