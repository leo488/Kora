import { useState } from 'react'
import { Link } from 'react-router-dom'
import { OFFICES, srcSetFor } from '../data'
import type { Post, Project } from '../data'
import { caseLinkFor } from '../caseStudies'

/* The homepage's building blocks, shared so every page is made of the same
   parts: client rows, news cards and the contact block. */

const NEW_BUSINESS_EMAIL = 'hello@kora.studio'

/** "Brand — Line" headlines lose the brand, which the row already names. */
function lineOf(project: Project) {
  const [, rest] = project.headline.split(/\s+—\s+/)
  return (rest ?? project.headline).replace(/\.$/, '')
}

/** One client: the name top left, the line and the result bottom left, the
 *  work large on the right. */
export function ClientRow({ project }: { project: Project }) {
  const lead = project.images[0]
  const hasStat = project.stat && project.stat !== '—'

  return (
    <li className="kora-rx-row">
      <Link to={caseLinkFor(project.name) ?? '/work'} className="kora-rx-row-link">
        <div className="kora-rx-row-text">
          <h2>{project.brand}</h2>

          <div className="kora-rx-row-detail">
            <p className="kora-rx-row-line">
              {project.brand} — {lineOf(project)}.
            </p>
            {hasStat && (
              <p className="kora-rx-row-stat">
                <span className="kora-rx-dot" aria-hidden="true" />
                {project.stat}
              </p>
            )}
            <p className="kora-rx-row-meta">
              {project.category}, {project.year}
            </p>
          </div>
        </div>

        <div className="kora-rx-row-media kora-rx-curve">
          {project.film ? (
            <video
              src={project.film.src}
              poster={project.film.poster.src}
              muted
              loop
              autoPlay
              playsInline
              preload="metadata"
              aria-label={project.brand}
              disablePictureInPicture
            />
          ) : (
            <img
              src={lead.src}
              srcSet={srcSetFor(lead)}
              sizes="(max-width: 760px) 100vw, 66vw"
              alt={project.brand}
              loading="lazy"
              draggable={false}
            />
          )}
        </div>
      </Link>
    </li>
  )
}

/** One post as a card: blank picture slot, kind, title, byline. */
export function NewsCard({ post }: { post: Post }) {
  return (
    <Link to="/blog" className="kora-rx-card">
      {/* Left blank until the posts have art of their own. */}
      <div className="kora-rx-card-media kora-rx-curve" aria-hidden="true" />
      <div className="kora-rx-card-body">
        <span className="kora-rx-card-kind">{post.category}</span>
        <h3>{post.title}</h3>
        <span className="kora-rx-card-by">Kora, {post.date}</span>
      </div>
    </Link>
  )
}

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
      <div className="kora-rx-contact-photo" aria-hidden="true" />
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
