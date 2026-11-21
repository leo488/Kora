import { useEffect, useRef, useState } from 'react'
import type { PointerEvent, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { srcSetFor } from '../data'
import type { Post, Project, ProjectImage } from '../data'
import { caseLinkFor, CASE_STUDY_DUE } from '../caseStudies'
import { CheckIcon, CopyIcon } from './icons'
import { useContact } from '../contact/useContact'
import { NEW_BUSINESS_EMAIL } from '../contact/sendBrief'
import onboarderArt from '../assets/onboarder-illustration.jpg'

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
            {hasStat && project.statNote && <p className="kora-rx-row-note">{project.statNote}</p>}
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
            {project.film?.afterImageMs ? (
              <FilmAfterImage
                src={project.film.src}
                delayMs={project.film.afterImageMs}
                still={lead}
                alt={project.brand}
              />
            ) : project.film ? (
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

/** The still shows first; once the row is in view the film fades in over it
 *  and loops. Reduced motion keeps the still. */
function FilmAfterImage({ src, delayMs, still, alt }: { src: string; delayMs: number; still: ProjectImage; alt: string }) {
  const box = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const el = box.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let timer = 0
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !timer) {
        timer = window.setTimeout(() => {
          const v = video.current
          if (!v) return
          v.play().then(() => setPlaying(true)).catch(() => {})
        }, delayMs)
        io.disconnect()
      }
    }, { threshold: 0.4 })
    io.observe(el)
    return () => { io.disconnect(); window.clearTimeout(timer) }
  }, [delayMs])

  return (
    <div ref={box} className={`kora-film-after${playing ? ' is-playing' : ''}`}>
      <img src={still.src} srcSet={srcSetFor(still)} sizes="(max-width: 760px) 100vw, 66vw" alt={alt} loading="lazy" draggable={false} />
      <video ref={video} src={src} muted loop playsInline preload="none" aria-hidden="true" disablePictureInPicture />
    </div>
  )
}

/** One post as a card: blank picture slot, kind, title, byline. */
export function NewsCard({ post }: { post: Post }) {
  return (
    <Link to={`/blog/${post.slug}`} className="kora-rx-card">
      <div className="kora-rx-card-media kora-rx-media" aria-hidden="true">
        <div className="kora-flare">
          {post.image && <img src={post.image} alt="" loading="lazy" draggable={false} />}
        </div>
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

      {/* Onboarder line illustration on Dusk purple. */}
      <div className="kora-rx-contact-photo" aria-hidden="true">
        <img src={onboarderArt} alt="" loading="lazy" draggable={false} />
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
