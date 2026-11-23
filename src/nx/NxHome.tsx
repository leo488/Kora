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
          Brand identities, products and campaigns for ambitious brands,
          wherever they are.
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
  useKitLoop(ref)
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

/* The brand kit's logo animation (the same one the grey hero loop and the
   intro play), applied to the six 3D letters: they rise one by one with an
   overshoot and squash, the apostrophe drops in, winds up and flings, and
   the o takes the hit and the others recoil. Then a hold, and again.
   Numbers are the kit's (see components/Intro.tsx). */
const K_END = 5.4
const K_HOLD = 2.6
const HIT = 2.62
const WIND = 1.72
const FLING = 1.98
/* Glass layer geometry: about 25 px per logo unit on a 2675 x 805 render. */
const PX_W = 25 / 2675
const PX_H = 25 / 805
const BASE = 0.947
const CX = [0.126, 0.3187, 0.4961, 0.6591, 0.8686]

const clamp = (v: number) => Math.max(0, Math.min(1, v))
const prog = (t: number, a: number, b: number) => clamp((t - a) / (b - a))
const backOut = (k: number, s = 1.5) => {
  k = clamp(k)
  return 1 + (s + 1) * Math.pow(k - 1, 3) + s * Math.pow(k - 1, 2)
}
const ring = (tau: number, f = 15, d = 5.5) => (tau <= 0 ? 0 : Math.exp(-d * tau) * Math.sin(f * tau))

function useKitLoop(ref: { current: HTMLDivElement | null }) {
  useEffect(() => {
    const box = ref.current
    if (!box) return
    const imgs = Array.from(box.querySelectorAll<HTMLImageElement>('img'))
    imgs.forEach((img, i) => {
      img.style.transformOrigin = i < 5 ? `${CX[i] * 100}% ${BASE * 100}%` : '95% 33.7%'
    })
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let visible = true
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(box)
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick)
      if (!visible) return
      const t = Math.min(((now - start) / 1000) % (K_END + K_HOLD), K_END)
      const tau = t - HIT
      const recoil = [-1, 0, 1, 0.6, 0.35].map((v) => v * ring(tau, 13, 5))
      for (let i = 0; i < 5; i++) {
        const kk = prog(t, 0.1 + i * 0.075, 0.82 + i * 0.075)
        const y = (1 - backOut(kk, 2.1)) * 34
        const sy = kk <= 0 ? 1 : 1 + 0.17 * Math.sin(2 * Math.PI * kk) * (1 - kk)
        let sx = 1 / Math.sqrt(Math.max(0.5, sy))
        let syy = sy
        if (i === 1) {
          const ant = Math.sin(Math.PI * prog(t, HIT - 0.22, HIT)) * 0.05
          const hit = tau >= 0 ? 0.16 * Math.exp(-4.5 * tau) * Math.cos(13 * tau) : 0
          sx *= (1 + ant * 0.6) * (1 + hit)
          syy *= (1 - ant) * (1 + hit * 0.8)
        }
        imgs[i].style.transform = `translate(${(recoil[i] * PX_W * 100).toFixed(3)}%, ${(y * PX_H * 100).toFixed(3)}%) scale(${sx.toFixed(4)}, ${syy.toFixed(4)})`
      }
      const ka = prog(t, 0.62, 1.12)
      const load = Math.sin((Math.PI / 2) * prog(t, WIND, FLING)) * (t < FLING ? 1 : 0)
      const fl = t >= FLING ? -16 * Math.exp(-4 * (t - FLING)) * Math.cos(11 * (t - FLING)) : 0
      const sq = 1 - 0.2 * load + (t >= FLING ? 0.18 * ring(t - FLING, 14, 6) : 0)
      const ay = ka <= 0 ? -200 : -(1 - backOut(ka, 2.4)) * 12 * PX_H * 100
      imgs[5].style.transform = `translate(${(recoil[4] * 0.8 * PX_W * 100).toFixed(3)}%, ${ay.toFixed(3)}%) rotate(${(12 * load + fl).toFixed(3)}deg) scale(${(1 / Math.sqrt(sq)).toFixed(4)}, ${sq.toFixed(4)})`
    }
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      io.disconnect()
    }
  }, [ref])
}
