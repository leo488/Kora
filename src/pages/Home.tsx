import { useEffect, useMemo, useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useInView } from '../hooks/useInView'
import { BrandMarquee } from '../components/BrandMarquee'
import { HeroCarousel } from '../components/HeroCarousel'
import { Masthead } from '../components/Masthead'
import { POSTS, PROJECTS, buildStillReel } from '../data'
import { ClientRow, Contact, NewsCard } from '../components/Sections'

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

/** The clients Home features, in order. The Work page still shows them all. */
const HOME_PROJECTS = ['Ipaybtc', '3Projects', 'Refreeg', 'Tagmi']

/** The hero plates: the heads-together shot, then the Tagmi 3D scene. */
const HERO_STILLS: Array<[string, number]> = [
  ['Refreeg', 0],
  ['Tagmi', 0],
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
        {/* The statement has no ground of its own: it rises over the hero
            while the hero washes out to the page colour behind it. */}
        <Statement />
        <div className="kora-rx-page-body">
          <Partnerships />
          <Brands />
          <Happenings />
          <Newsletter />
          <Contact />
        </div>
      </div>
    </div>
  )
}

function Hero() {
  const [slideIndex, setSlideIndex] = useState(0)
  const slides = useMemo(() => buildStillReel(HERO_STILLS), [])

  return (
    <section className="kora-rx-hero" aria-label="Koraa’">
      <HeroCarousel
        slides={slides}
        index={slideIndex}
        onIndexChange={setSlideIndex}
        intervalMs={7000}
      />
      {/* The page colour, faded in by scroll as the statement rises over. */}
      <div className="kora-rx-hero-wash" aria-hidden="true" />
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
      <h1 className="kora-rx-statement-line">
        Koraa’ helps ambitious startups and businesses build brands and digital
        products that are ready to compete globally.
      </h1>
    </section>
  )
}

function Partnerships() {
  return (
    <section className="kora-rx-work" aria-labelledby="kora-rx-work-label">
      <p className="kora-label kora-rx-work-label" id="kora-rx-work-label">
        Selected work <sup>({HOME_PROJECTS.length})</sup>
      </p>
      <ul className="kora-rx-rows">
        {HOME_PROJECTS.map((name) => {
          const project = PROJECTS.find((p) => p.name === name)
          return project && <ClientRow key={name} project={project} index={HOME_PROJECTS.indexOf(name)} />
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
            <NewsCard post={post} />
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
      <h2 id="kora-rx-newsletter-heading">From Koraa’ to your inbox</h2>

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
