import { useEffect, useRef, useState } from 'react'
import type { FormEvent, Ref } from 'react'
import { Link } from 'react-router-dom'
import { useInView } from '../hooks/useInView'
import { BrandMarquee } from '../components/BrandMarquee'
import { KoraMark } from '../components/KoraMark'
import { PillNav } from '../components/PillNav'
import { AMBIENT_FILM, OFFICES, POSTS, PROJECTS, srcSetFor } from '../data'
import type { Project } from '../data'

/* Home
   ----
   A full-screen moving gradient with the Kora lockup animating in across it
   and the navigation floating as pills, then a short statement, four clients
   one per row, news, a newsletter sign-up and a contact block. The offices
   band and the footer come from Layout and are untouched.

   The old film reel (HeroCarousel + buildHeroReel) is no longer on Home but is
   kept in the codebase in case it comes back. */

const NEW_BUSINESS_EMAIL = 'hello@kora.studio'

/** The clients Home features, in order. The Work page still shows them all. */
const HOME_PROJECTS = ['Ipaybtc', '3Projects', 'Refreeg', 'Tagmi']

export function Home() {
  const heroRef = useRef<HTMLElement>(null)
  const [heroInView, setHeroInView] = useState(true)

  // The pills sit at the foot of the hero, and move to the top of the screen
  // as soon as the hero starts to scroll away from under them.
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setHeroInView(entry.isIntersecting),
      { threshold: 0, rootMargin: '-88% 0px 0px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <PillNav docked={heroInView ? 'bottom' : 'top'} />
      <Hero ref={heroRef} />
      <Statement />
      <Partnerships />
      <Brands />
      <Happenings />
      <Newsletter />
      <Contact />
    </>
  )
}

function Hero({ ref }: { ref: Ref<HTMLElement> }) {
  // One frame after mount, so the lockup's starting pose paints first and the
  // animation has something to run from.
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <section className={`kora-rx-hero${ready ? ' is-ready' : ''}`} ref={ref} aria-label="Kora">
      <div className="kora-rx-gradient" aria-hidden="true">
        <span className="kora-rx-gradient-a" />
        <span className="kora-rx-gradient-b" />
        <span className="kora-rx-gradient-rays" />
        <span className="kora-rx-gradient-glow" />
      </div>
      <div className="kora-rx-hero-mark">
        <KoraMark className="kora-rx-hero-logo" />
      </div>
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
    <section className={`kora-rx-statement kora-container kora-rx-reveal${cls}`} ref={ref}>
      <h1>Brands that refuse to blend in</h1>
      <p>
        Kora is a global creative studio. Through strategic branding and
        storytelling, we help businesses stand out, connect, and grow.
      </p>
    </section>
  )
}

function Partnerships() {
  return (
    <section className="kora-rx-work kora-container" aria-label="Selected work">
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
  return rest ?? project.headline
}

/** One client: the name and the result on the left, the work large on the right. */
function ClientRow({ project }: { project: Project }) {
  const [ref, cls] = useReveal<HTMLLIElement>()
  const lead = project.images[0]
  const hasStat = project.stat && project.stat !== '—'

  return (
    <li className={`kora-rx-row kora-rx-reveal${cls}`} ref={ref}>
      <Link to="/work" className="kora-rx-row-link">
        <div className="kora-rx-row-text">
          <h2>{project.brand}</h2>

          <div className="kora-rx-row-detail">
            <p>{lineOf(project)}.</p>
            {hasStat && <p className="kora-rx-row-stat">{project.stat}</p>}
            <p className="kora-rx-row-meta">
              {project.category} &middot; {project.year}
            </p>
          </div>
        </div>

        <div className="kora-rx-row-media kora-rx-fold">
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
  const [ref, cls] = useReveal<HTMLElement>()
  return (
    <section
      className={`kora-rx-news kora-container kora-rx-reveal${cls}`}
      ref={ref}
      aria-labelledby="kora-rx-news-heading"
    >
      <header className="kora-rx-head">
        <h2 id="kora-rx-news-heading">Happenings</h2>
        <p>Updates and opinions</p>
      </header>

      <ul className="kora-rx-news-grid">
        {POSTS.slice(0, 3).map((post) => {
          return (
            <li key={post.title}>
              <Link to="/blog" className="kora-rx-card">
                {/* Left blank until the posts have art of their own. */}
                <div className="kora-rx-card-media kora-rx-fold" aria-hidden="true" />
                <div className="kora-rx-card-body">
                  <span className="kora-rx-card-kind">{post.category}</span>
                  <h3>{post.title}</h3>
                  <span className="kora-rx-card-by">Kora &middot; {post.date}</span>
                </div>
              </Link>
            </li>
          )
        })}
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
  const [ref, cls] = useReveal<HTMLElement>()
  const [sent, setSent] = useState(false)

  // TODO(kora): wire this to the mailing-list provider. Until then the form
  // only confirms on screen, and nothing is sent anywhere.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <section
      className={`kora-rx-newsletter kora-container kora-rx-reveal${cls}`}
      ref={ref}
      aria-labelledby="kora-rx-newsletter-heading"
    >
      <h2 id="kora-rx-newsletter-heading">From Kora to your inbox</h2>

      {sent ? (
        <p className="kora-rx-newsletter-done" role="status">
          Thanks — you’re on the list.
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
    <section className="kora-rx-contact kora-container" id="contact" aria-labelledby="kora-rx-contact-heading">
      <div className="kora-rx-contact-text">
        <h2 id="kora-rx-contact-heading">Ready to stand out?</h2>
        <dl className="kora-rx-contact-rows">
          {rows.map((row) => (
            <div key={row.label}>
              <dt>{row.label}</dt>
              <dd>
                <a href={`mailto:${row.value}`}>{row.value}</a>
                <CopyButton text={row.value} />
              </dd>
            </div>
          ))}
        </dl>
        <a href="#" className="kora-pill is-solid is-large">
          Book A Call
        </a>
      </div>

      <div className="kora-rx-contact-media kora-rx-fold">
        <video
          src={AMBIENT_FILM.src}
          poster={AMBIENT_FILM.poster.src}
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
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
    <button type="button" className="kora-rx-copy" onClick={copy}>
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}
