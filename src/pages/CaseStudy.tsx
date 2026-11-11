import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { PROJECTS } from '../data'
import { caseStudyFor } from '../caseStudies'
import type { CaseBlock, CaseSlot } from '../caseStudies'

/* One case study: hero plate, intro with the facts beside it, the work told
   in images, then the next project and a contact form. */

export function CaseStudy() {
  const { slug } = useParams()
  const study = caseStudyFor(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!study) return <Navigate to="/work" replace />

  const next = PROJECTS.find((p) => p.name === study.next)
  const nextStudy = caseStudyFor(study.next)

  return (
    <article className="kora-case">
      <div className="kora-case-hero">
        <Plate slot={study.hero} eager />
      </div>

      <section className="kora-case-intro">
        <aside className="kora-case-facts">
          <dl>
            {study.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </aside>

        <div className="kora-case-copy">
          <h1>{study.title}</h1>
          <p className="kora-case-summary">{study.summary}</p>

          {study.highlights.length > 0 && (
            <ul className="kora-case-highlights">
              {study.highlights.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          )}

          {study.sections.map((section) => (
            <section key={section.heading} className="kora-case-section">
              <h2>{section.heading}</h2>
              {section.paragraphs.map((text) => (
                <p key={text.slice(0, 32)}>{text}</p>
              ))}
            </section>
          ))}

          {study.liveUrl && (
            <a
              className="kora-case-live"
              href={study.liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              Visit the live site
            </a>
          )}
        </div>
      </section>

      <div className="kora-case-gallery">
        {study.gallery.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>

      {next && (
        <Link
          to={nextStudy ? `/work/${nextStudy.slug}` : '/work'}
          className="kora-case-next"
        >
          <div className="kora-case-next-text">
            <span>Next project</span>
            <strong>{next.brand}</strong>
          </div>
          <div className="kora-case-next-media">
            <img src={next.images[0].src} alt="" loading="lazy" />
          </div>
        </Link>
      )}

      <CaseContact />
    </article>
  )
}

function Block({ block }: { block: CaseBlock }) {
  switch (block.kind) {
    case 'full':
      return <Plate slot={block.slot} />
    case 'pair':
      return (
        <div className="kora-case-pair">
          <Plate slot={block.slots[0]} />
          <Plate slot={block.slots[1]} />
        </div>
      )
    case 'grid':
      return (
        <div
          className="kora-case-grid"
          style={{ gridTemplateColumns: `repeat(${block.columns}, minmax(0, 1fr))` }}
        >
          {block.slots.map((s) => (
            <Plate key={s.label} slot={s} />
          ))}
        </div>
      )
    case 'collage':
      return (
        <div className="kora-case-collage">
          {block.slots.map((s) => (
            <Plate key={s.label} slot={s} />
          ))}
        </div>
      )
  }
}

/** An image or loop — or, until it exists, a grey panel naming what goes
 *  there. */
function Plate({ slot, eager = false }: { slot: CaseSlot; eager?: boolean }) {
  return (
    <figure className="kora-case-plate" style={{ aspectRatio: slot.ratio }}>
      {slot.src ? (
        slot.video ? (
          <video src={slot.src} muted loop autoPlay playsInline aria-label={slot.label} />
        ) : (
          <img src={slot.src} alt={slot.label} loading={eager ? 'eager' : 'lazy'} />
        )
      ) : (
        <figcaption>{slot.label}</figcaption>
      )}
    </figure>
  )
}

function CaseContact() {
  const [sent, setSent] = useState(false)

  // TODO(kora): wire this to the studio inbox. Until then the form only
  // confirms on screen, and nothing is sent anywhere.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <section className="kora-case-contact" id="contact" aria-labelledby="kora-case-contact-heading">
      <div className="kora-case-contact-text">
        <h2 id="kora-case-contact-heading">Let’s get in touch</h2>
        <dl>
          <dt>Email</dt>
          <dd>
            <a href="mailto:hello@kora.studio">hello@kora.studio</a>
          </dd>
        </dl>
      </div>

      {sent ? (
        <p className="kora-case-contact-done" role="status">
          Thanks. We’ll be in touch shortly.
        </p>
      ) : (
        <form className="kora-case-form" onSubmit={onSubmit}>
          <label>
            <span>Name</span>
            <input name="name" required autoComplete="name" />
          </label>
          <label>
            <span>Email</span>
            <input name="email" type="email" required autoComplete="email" />
          </label>
          <label>
            <span>Message</span>
            <textarea name="message" rows={5} required />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
    </section>
  )
}
