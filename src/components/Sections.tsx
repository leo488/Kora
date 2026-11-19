import { useState } from 'react'
import type { PointerEvent, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { srcSetFor } from '../data'
import type { Post, Project } from '../data'
import { caseLinkFor, CASE_STUDY_DUE } from '../caseStudies'
import { CheckIcon, CopyIcon } from './icons'
import { useContact } from '../contact/useContact'
import { NEW_BUSINESS_EMAIL } from '../contact/sendBrief'
import talkingHead from '../assets/kora-talking-head.mp4'
import talkingHeadPoster from '../assets/kora-talking-head-poster.jpg'

/* The homepage's building blocks, shared so every page is made of the same
   parts: client rows, news cards and the contact block. */

/** "Brand — Line" headlines lose the brand, which the row already names. */
function lineOf(project: Project) {
  const [, rest] = project.headline.split(/\s+—\s+/)
  return (rest ?? project.headline).replace(/\.$/, '')
}

/** One client: the name top left, the line and the result bottom left, the
 *  work large on the right. */
/** Keeps the "View" pill under the pointer while it is over a project image. */
function followCursor(event: PointerEvent<HTMLDivElement>) {
  if (event.pointerType !== 'mouse') return
  const box = event.currentTarget.getBoundingClientRect()
  event.currentTarget.style.setProperty('--kora-vx', `${event.clientX - box.left}px`)
  event.currentTarget.style.setProperty('--kora-vy', `${event.clientY - box.top}px`)
}

/** A published case study links through; the rest are a plain block. */
function RowLink({ to, children }: { to?: string; children: ReactNode }) {
  return to ? (
    <Link to={to} className="kora-rx-row-link">
      {children}
    </Link>
  ) : (
    <div className="kora-rx-row-link is-soon">{children}</div>
  )
}

export function ClientRow({ project, index }: { project: Project; index?: number }) {
  const lead = project.images[0]
  const hasStat = project.stat && project.stat !== '—'
  const to = caseLinkFor(project.name)

  return (
    <li className="kora-rx-row">
      <RowLink to={to}>
        <div className="kora-rx-row-text">
          <div className="kora-rx-row-head">
            {index !== undefined && (
              <span className="kora-rx-row-index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
            )}
            <h2>{project.brand}</h2>
          </div>

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

        <div
          className="kora-rx-row-media kora-rx-media"
          onPointerMove={followCursor}
        >
          <div className="kora-flare">
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
          <span className="kora-rx-view" aria-hidden={to ? true : undefined}>
            {to ? 'View' : `Case study out ${CASE_STUDY_DUE}`}
          </span>
        </div>
      </RowLink>
    </li>
  )
}

/** One post as a card: blank picture slot, kind, title, byline. */
export function NewsCard({ post }: { post: Post }) {
  return (
    <Link to="/blog" className="kora-rx-card">
      {/* Left blank until the posts have art of their own. */}
      <div className="kora-rx-card-media kora-rx-media" aria-hidden="true">
        <div className="kora-flare" />
      </div>
      <div className="kora-rx-card-body">
        <span className="kora-rx-card-kind">{post.category}</span>
        <h3>{post.title}</h3>
        <span className="kora-rx-card-by">Koraa’, {post.date}</span>
      </div>
    </Link>
  )
}

/** The closing block on every page: one clear ask, the brief one click away,
 *  and one inbox for anyone who would rather write. */
export function Contact() {
  const openContact = useContact()

  return (
    <section className="kora-rx-contact" id="contact" aria-labelledby="kora-rx-contact-heading">
      <div className="kora-rx-contact-text">
        <div className="kora-rx-contact-ask">
          <h2 id="kora-rx-contact-heading">Tell us what you’re building.</h2>
          <p>
            Three short questions, about a minute. We reply within one working day
            with how we would approach it.
          </p>
          <div className="kora-rx-contact-actions">
            <button type="button" className="kora-pill is-solid is-large" onClick={() => openContact()}>
              Start a project
            </button>
            <Link to="/brand-test" className="kora-pill is-outline is-large">
              Take the brand test
            </Link>
          </div>
        </div>

        <div className="kora-rx-contact-mail">
          <a href={`mailto:${NEW_BUSINESS_EMAIL}`}>{NEW_BUSINESS_EMAIL}</a>
          <CopyButton text={NEW_BUSINESS_EMAIL} />
        </div>
      </div>

      {/* A silent talking-head loop of a studio creative. */}
      <div className="kora-rx-contact-photo" aria-hidden="true">
        <video
          src={talkingHead}
          poster={talkingHeadPoster}
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
          disablePictureInPicture
        />
      </div>
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
    <button
      type="button"
      className={`kora-rx-copy${copied ? ' is-copied' : ''}`}
      onClick={copy}
      aria-label={copied ? 'Copied' : 'Copy email address'}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </button>
  )
}
