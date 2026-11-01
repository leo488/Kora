import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useInView } from '../hooks/useInView'
import { HeroCarousel } from '../components/HeroCarousel'
import { BrandMarquee } from '../components/BrandMarquee'
import { ArrowIcon } from '../components/icons'
import {
  AMBIENT_FILM,
  POSTS,
  PROJECTS,
  buildHeroReel,
  leadImageOf,
  srcSetFor,
} from '../data'
import type { Project } from '../data'

/* Home, editorial layout
   ----------------------
   Type first, then the reel, then the work as a wall of case-study cards,
   then news, a newsletter sign-up and a contact band. The offices band and
   the footer come from Layout and are untouched.

   The old immersive hero (reel full-bleed under floating bars) and the
   "This Is Kora" collage are in git history if they are wanted back. */

const NEW_BUSINESS_EMAIL = 'hello@kora.studio'

export function Home() {
  return (
    <>
      <Intro />
      <Showreel />
      <SelectedWork />
      <Brands />
      <Happenings />
      <Newsletter />
      <StartBand />
    </>
  )
}

/* Lifts a section in once it is scrolled to, like every other band. */
function useReveal<T extends HTMLElement>() {
  const [ref, visible] = useInView<T>()
  return [ref, visible ? ' is-visible' : ''] as const
}

function Intro() {
  return (
    <section className="kora-home-intro kora-container">
      <h1 className="kora-home-title">
        Brands that refuse to blend in.
      </h1>
      <p className="kora-home-lede">
        Kora is a global creative studio. Through strategic branding and
        storytelling, we help businesses stand out, connect, and grow.
      </p>
    </section>
  )
}

function Showreel() {
  const [slideIndex, setSlideIndex] = useState(0)
  const slides = useMemo(() => buildHeroReel(), [])
  const slide = slides[slideIndex]

  return (
    <section className="kora-home-reel kora-container" aria-label="Showreel">
      <div className="kora-home-reel-frame">
        <HeroCarousel
          slides={slides}
          index={slideIndex}
          onIndexChange={setSlideIndex}
        />

        {/* The closing film runs without a caption — it belongs to no project. */}
        {slide.caption && (
          <div className="kora-home-reel-caption" key={slide.key}>
            <span>{slide.caption.brand}</span>
            <span>{slide.caption.category}</span>
          </div>
        )}
      </div>
    </section>
  )
}

function SelectedWork() {
  const [ref, cls] = useReveal<HTMLElement>()

  return (
    <section
      className={`kora-home-work kora-container kora-home-reveal${cls}`}
      ref={ref}
      aria-labelledby="kora-home-work-heading"
    >
      <header className="kora-home-section-head">
        <h2 id="kora-home-work-heading">Selected work</h2>
        <p>Brands we have helped stand out.</p>
      </header>

      <ul className="kora-home-work-grid">
        {PROJECTS.map((project) => (
          <CaseCard key={project.name} project={project} />
        ))}
      </ul>

      <Link to="/work" className="kora-home-more">
        All work <ArrowIcon className="kora-home-more-arrow" />
      </Link>
    </section>
  )
}

/** One project on the home wall: plate on top, then the brand, the line, and
 *  the headline number set large. A project with a film plays it, muted and
 *  looping, in place of the still. */
function CaseCard({ project }: { project: Project }) {
  const lead = project.film?.poster ?? project.images[0]
  const hasStat = project.stat && project.stat !== '—'

  return (
    <li className="kora-case">
      <Link to="/work" className="kora-case-link">
        <div className="kora-case-media">
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
              sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
              alt={project.brand}
              loading="lazy"
              draggable={false}
            />
          )}
        </div>

        <div className="kora-case-body">
          <span className="kora-case-meta">
            {project.brand} &middot; {project.category}
          </span>
          <p className="kora-case-line">{headlineOf(project)}</p>
          {hasStat && <span className="kora-case-stat">{project.stat}</span>}
        </div>
      </Link>
    </li>
  )
}

/** "Brand — Line" headlines lose the brand, which the meta row already shows. */
function headlineOf(project: Project) {
  const [, rest] = project.headline.split(/\s+—\s+/)
  return rest ?? project.headline
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
      className={`kora-home-news kora-container kora-home-reveal${cls}`}
      ref={ref}
      aria-labelledby="kora-home-news-heading"
    >
      <header className="kora-home-section-head">
        <h2 id="kora-home-news-heading">Happenings</h2>
        <p>Updates and opinions.</p>
      </header>

      <ul className="kora-home-news-grid">
        {POSTS.slice(0, 3).map((post) => {
          const image = leadImageOf(post.project)
          return (
            <li key={post.title}>
              <Link to="/blog" className="kora-news-card">
                <div className="kora-news-media">
                  {image && (
                    <img
                      src={image.widths[0].url}
                      alt=""
                      loading="lazy"
                      draggable={false}
                    />
                  )}
                </div>
                <span className="kora-news-kind">{post.category}</span>
                <h3>{post.title}</h3>
                <span className="kora-news-date">{post.date}</span>
              </Link>
            </li>
          )
        })}
      </ul>

      <Link to="/blog" className="kora-home-more">
        There’s more happening <ArrowIcon className="kora-home-more-arrow" />
      </Link>
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
      className={`kora-home-newsletter kora-home-reveal${cls}`}
      ref={ref}
      aria-labelledby="kora-home-newsletter-heading"
    >
      <div className="kora-container kora-home-newsletter-inner">
        <h2 id="kora-home-newsletter-heading">From Kora to your inbox</h2>

        {sent ? (
          <p className="kora-home-newsletter-done" role="status">
            Thanks — you’re on the list.
          </p>
        ) : (
          <form className="kora-home-newsletter-form" onSubmit={onSubmit}>
            <label htmlFor="kora-newsletter-email">Your email address</label>
            <div className="kora-home-newsletter-row">
              <input
                id="kora-newsletter-email"
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="you@company.com"
              />
              <button type="submit" className="kora-cta">
                Sign up
              </button>
            </div>
            <small>We’ll never share your details anywhere else.</small>
          </form>
        )}
      </div>
    </section>
  )
}

function StartBand() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(NEW_BUSINESS_EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard blocked; the address is still a mailto link right beside it.
    }
  }

  return (
    <section className="kora-home-start" aria-labelledby="kora-home-start-heading">
      <video
        className="kora-home-start-film"
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

      <div className="kora-container kora-home-start-inner">
        <h2 id="kora-home-start-heading">Ready to stand out?</h2>

        <div className="kora-home-start-row">
          <span className="kora-home-start-label">New business</span>
          <a href={`mailto:${NEW_BUSINESS_EMAIL}`}>{NEW_BUSINESS_EMAIL}</a>
          <button type="button" className="kora-home-copy" onClick={copy}>
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        <a href="#" className="kora-cta kora-home-start-cta">
          Book A Call
        </a>
      </div>
    </section>
  )
}
