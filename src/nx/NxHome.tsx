import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { BrandMarquee } from '../components/BrandMarquee'
import g0 from '../assets/glass/koraa-glass-0.webp'
import g1 from '../assets/glass/koraa-glass-1.webp'
import g2 from '../assets/glass/koraa-glass-2.webp'
import g3 from '../assets/glass/koraa-glass-3.webp'
import g4 from '../assets/glass/koraa-glass-4.webp'
import g5 from '../assets/glass/koraa-glass-5.webp'
import { POSTS, SERVICES } from '../data'
import { NxArrow } from './NxHeader'
import { NxWorkList } from './NxWorkList'

/* Home, laid out after Nonstop: the intro on the right half, the wordmark
   across the whole page, the client logos, then the work one row at a time,
   services as an accordion, happenings, the newsletter. Every section keeps
   the same split: a small label on the left half, the content on the right. */

export const FEATURED = ['Ipaybtc', 'Refreeg', '3Projects', 'Tagmi']

export function NxHome() {
  return (
    <div className="nx-page nx-home">
      <section className="nx-hero">
        <div className="nx-split nx-intro">
          <div />
          <p className="nx-lead">
            We help ambitious startups and businesses build brands and digital
            products that are ready to compete globally.
          </p>
        </div>
        <HeroMark />
        <p className="nx-label nx-hero-brands">Some of the brands we have worked with:</p>
      </section>

      {/* Everything below is one sheet that slides up over the pinned logo. */}
      <div className="nx-sheet">
      <section className="nx-logos" aria-label="Brands we have worked with">
        <BrandMarquee />
      </section>

      <section className="nx-split nx-section">
        <p className="nx-label">Selected work</p>
        <p className="nx-lead">
          Brand identities, products and campaigns for founders in Nigeria and
          beyond.
        </p>
      </section>

      <NxWorkList names={FEATURED} />

      <div className="nx-split nx-more">
        <div />
        <Link to="/work" className="nx-link">
          All work <NxArrow />
        </Link>
      </div>

      <section className="nx-split nx-section">
        <p className="nx-label">Services</p>
        <Accordion items={SERVICES.map((s) => ({ title: s.name, body: s.description }))} />
      </section>

      <section className="nx-split nx-section">
        <p className="nx-label">Happenings</p>
        <ul className="nx-list">
          {POSTS.slice(0, 3).map((post) => (
            <li key={post.title}>
              <Link to="/blog" className="nx-list-row">
                <span className="nx-list-thumb">
                  {post.image && <img src={post.image} alt="" loading="lazy" />}
                </span>
                <span className="nx-list-title">{post.title}</span>
                <span className="nx-meta">
                  {post.category} · {post.date}
                </span>
                <NxArrow />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Newsletter />
      </div>
    </div>
  )
}

const GLASS = [g0, g1, g2, g3, g4, g5]

/* The 3D wordmark sits at the foot of the first screen, cropped by its
   bottom edge. It drifts at half the scroll speed, so the sheet below
   catches up with it and covers it. */
function HeroMark() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const update = () => {
      frame = 0
      const y = Math.min(window.scrollY, window.innerHeight * 1.5)
      el.style.translate = `0 calc(30% + ${(y * 0.5).toFixed(1)}px)`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])
  return (
    <div ref={ref} className="nx-hero-mark nx-glass" role="img" aria-label="Koraa’">
      {GLASS.map((src) => (
        <img key={src} src={src} alt="" draggable={false} fetchPriority="high" />
      ))}
    </div>
  )
}

export function Accordion({
  items,
  open: first = -1,
}: {
  items: Array<{ title: string; body: string | string[] }>
  open?: number
}) {
  const [open, setOpen] = useState(first)
  return (
    <ul className="nx-acc">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <li key={item.title} className={isOpen ? 'is-open' : undefined}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span>{item.title}</span>
              <span className="nx-acc-sign" aria-hidden="true">
                {isOpen ? '−' : '+'}
              </span>
            </button>
            {isOpen && (
              <div className="nx-acc-body">
                {(Array.isArray(item.body) ? item.body : [item.body]).map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

function Newsletter() {
  const [sent, setSent] = useState(false)
  // TODO(kora): wire to the mailing-list provider; for now it only confirms.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
  }
  return (
    <section className="nx-split nx-section">
      <p className="nx-label">From Koraa’ to your inbox</p>
      {sent ? (
        <p className="nx-lead" role="status">
          Thanks, you’re on the list.
        </p>
      ) : (
        <form className="nx-inline-form" onSubmit={onSubmit}>
          <label htmlFor="nx-news-email" className="kora-visually-hidden">
            Your email address
          </label>
          <input
            id="nx-news-email"
            type="email"
            required
            autoComplete="email"
            placeholder="Your email address"
          />
          <button type="submit" className="nx-btn">
            Sign up <NxArrow />
          </button>
        </form>
      )}
    </section>
  )
}
