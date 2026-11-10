import { useEffect, useMemo, useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useInView } from '../hooks/useInView'
import { BrandMarquee } from '../components/BrandMarquee'
import { HeroCarousel } from '../components/HeroCarousel'
import { KoraMark } from '../components/KoraMark'
import { PillNav } from '../components/PillNav'
import { OFFICES, POSTS, PROJECTS, buildStillReel, srcSetFor } from '../data'
import type { Project } from '../data'

/* Home
   ----
   Laid out after the Ragged Edge homepage:

   - A full-screen hero (two calm stills, crossfading) with the Kora lockup set
     across it. The page scrolls up over the hero, and as it does the lockup
     rises and docks at the top, cropped so only its lower edge shows, with
     the pill navigation tucked under it.
   - A statement, then one client per row: name at the top left, the line and
     the result small at the bottom left, the work large on the right. Images
     come in with a curved leading edge that straightens as they arrive.
   - Happenings, a newsletter sign-up and a contact block.

   The offices band and the footer come from Layout. */

const NEW_BUSINESS_EMAIL = 'hello@kora.studio'

/** The clients Home features, in order. The Work page still shows them all. */
const HOME_PROJECTS = ['Ipaybtc', '3Projects', 'Refreeg', 'Tagmi']

/** The hero plates: the heads-together shot, then the 3PROJECTS billboard. */
const HERO_STILLS: Array<[string, number]> = [
  ['Refreeg', 0],
  ['3Projects', 0],
]

export function Home() {
  // 0 while the hero fills the screen, 1 once the page has covered it.
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const read = () => {
      frame = 0
      const p = Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1)
      setProgress(p)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read)
    }
    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  const docked = progress >= 0.999

  return (
    <div
      className={`kora-rx${docked ? ' is-docked' : ''}`}
      style={{ '--kora-p': progress } as CSSProperties}
    >
      <Masthead docked={docked} />
      <Hero />
      <div className="kora-rx-page">
        <Statement />
        <Partnerships />
        <Brands />
        <Happenings />
        <Newsletter />
        <Contact />
      </div>
    </div>
  )
}

/** The lockup and the pills, fixed over everything. Their positions are
 *  driven from --kora-p in CSS, so they glide with the scroll. */
function Masthead({ docked }: { docked: boolean }) {
  // One frame after mount, so the lockup's starting pose paints first and the
  // build-in has something to run from.
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <>
      <div className="kora-rx-masthead-bar" aria-hidden="true" />
      <Link
        to="/"
        className={`kora-rx-masthead-logo${ready ? ' is-ready' : ''}`}
        aria-label="Kora — home"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <KoraMark className="kora-rx-logo" />
      </Link>
      <PillNav docked={docked ? 'top' : 'bottom'} />
    </>
  )
}

function Hero() {
  const [slideIndex, setSlideIndex] = useState(0)
  const slides = useMemo(() => buildStillReel(HERO_STILLS), [])

  return (
    <section className="kora-rx-hero" aria-label="Kora">
      <HeroCarousel
        slides={slides}
        index={slideIndex}
        onIndexChange={setSlideIndex}
        intervalMs={7000}
      />
    </section>
  )
}

/* Lifts a section in once it is scrolled to. */
function useReveal<T extends HTMLElement>() {
  const [ref, visible] = useInView<T>()
  return [ref, visible ? ' is-visible' : ''] as const
}

function Statement() {
  const [ref, cls] = useReveal<HTMLElement>()
  return (
    <section className={`kora-rx-statement kora-rx-reveal${cls}`} ref={ref}>
      <h1>
        Kora helps ambitious startups and businesses build brands and digital
        products that are ready to compete globally.
      </h1>
    </section>
  )
}

function Partnerships() {
  return (
    <section className="kora-rx-work" aria-label="Selected work">
      <ul className="kora-rx-rows">
        {HOME_PROJECTS.map((name) => {
          const project = PROJECTS.find((p) => p.name === name)
          return project && <ClientRow key={name} project={project} />
        })}
      </ul>
      <div className="kora-rx-center">
        <Link to="/work" className="kora-pill is-solid is-large">
          All work
        </Link>
      </div>
    </section>
  )
}

/** "Brand — Line" headlines lose the brand, which the row already names. */
function lineOf(project: Project) {
  const [, rest] = project.headline.split(/\s+—\s+/)
  return (rest ?? project.headline).replace(/\.$/, '')
}

/** One client: the name top left, the line and the result bottom left, the
 *  work large on the right. */
function ClientRow({ project }: { project: Project }) {
  const lead = project.images[0]
  const hasStat = project.stat && project.stat !== '—'

  return (
    <li className="kora-rx-row">
      <Link to="/work" className="kora-rx-row-link">
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

function Brands() {
  const [ref, cls] = useReveal<HTMLElement>()
  return (
    <section
      className={`kora-brands${cls}`}
      aria-label="Brands we have worked with"
      ref={ref}
    >
      <span className="kora-brands-label">Brands we have worked with</span>
      <BrandMarquee />
    </section>
  )
}

function Happenings() {
  return (
    <section className="kora-rx-news" aria-labelledby="kora-rx-news-heading">
      <header className="kora-rx-news-head">
        <h2 id="kora-rx-news-heading">Happenings</h2>
        <p>Updates and opinions</p>
      </header>

      <ul className="kora-rx-news-grid">
        {POSTS.slice(0, 3).map((post) => (
          <li key={post.title}>
            <Link to="/blog" className="kora-rx-card">
              {/* Left blank until the posts have art of their own. */}
              <div className="kora-rx-card-media kora-rx-curve" aria-hidden="true" />
              <div className="kora-rx-card-body">
                <span className="kora-rx-card-kind">{post.category}</span>
                <h3>{post.title}</h3>
                <span className="kora-rx-card-by">Kora, {post.date}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="kora-rx-center">
        <Link to="/blog" className="kora-pill is-solid is-large">
          There’s more happening
        </Link>
      </div>
    </section>
  )
}

function Newsletter() {
  const [sent, setSent] = useState(false)

  // TODO(kora): wire this to the mailing-list provider. Until then the form
  // only confirms on screen, and nothing is sent anywhere.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <section className="kora-rx-newsletter" aria-labelledby="kora-rx-newsletter-heading">
      <h2 id="kora-rx-newsletter-heading">From Kora to your inbox</h2>

      {sent ? (
        <p className="kora-rx-newsletter-done" role="status">
          Thanks, you’re on the list.
        </p>
      ) : (
        <form className="kora-rx-newsletter-form" onSubmit={onSubmit}>
          <label htmlFor="kora-newsletter-email" className="kora-visually-hidden">
            Your email address
          </label>
          <input
            id="kora-newsletter-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="Your email address"
          />
          <button type="submit" className="kora-pill is-solid is-large">
            Sign up
          </button>
        </form>
      )}
      <small>We’ll never share your details anywhere else.</small>
    </section>
  )
}

function Contact() {
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
