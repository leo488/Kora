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
import gPlainO from '../assets/glass/koraa-glass-o-plain.webp'
import gStar from '../assets/glass/koraa-glass-star.webp'
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
      {/* For the animation only: the o before the star lands, and the star. */}
      <img src={gPlainO} alt="" draggable={false} className="nx-glass-extra" />
      <img src={gStar} alt="" draggable={false} className="nx-glass-extra" />
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

/* The brand kit's logo animation (the same one the intro plays, see
   components/Intro.tsx), applied to the flat 3D letters: they rise one by
   one with an overshoot and squash; the apostrophe drops in, a star pops out
   of it, winds up and is flung in an arc into the o; the o takes the hit,
   the star opens up as the cut-out, and the others recoil. Then a hold, and
   again. Numbers are the kit's.

   Layers 0–5 are K, o (with the star cut out), r, a, a, apostrophe; layer 6
   is the o before the star lands, layer 7 the star itself, rendered in place
   at the centre of the o (scripts/glass-logo). Every layer is the full frame,
   so moving one is a translate in % of the frame. */
const K_END = 5.4
const K_HOLD = 2.6
const POP = 1.25
const WIND = 1.72
const FLING = 1.98
const HIT = 2.62
/* Frame geometry: 25 px per logo unit on a 2786 x 814 render. */
const PX_W = 25 / 2786
const PX_H = 25 / 814
const BASE = 0.9638
const CX = [0.1062, 0.3044, 0.4751, 0.6455, 0.8564]
const APOS = '94.89% 31.02%'
/* The centre of the o, in logo units and as a share of the frame. */
const OX = 521.984
const OY = 63.0595
const O_ORIGIN = '30.44% 63.14%'
/* One pixel of the kit's 1920 frame, in logo units (logo 200 px = 31.08). */
const KPX = 31.08 / 200

const clamp = (v: number) => Math.max(0, Math.min(1, v))
const prog = (t: number, a: number, b: number) => clamp((t - a) / (b - a))
const lerp = (a: number, b: number, k: number) => a + (b - a) * k
const ease = (k: number) => -(Math.cos(Math.PI * clamp(k)) - 1) / 2
const outCubic = (k: number) => 1 - Math.pow(1 - clamp(k), 3)
const backOut = (k: number, s = 1.5) => {
  k = clamp(k)
  return 1 + (s + 1) * Math.pow(k - 1, 3) + s * Math.pow(k - 1, 2)
}
const ring = (tau: number, f = 15, d = 5.5) => (tau <= 0 ? 0 : Math.exp(-d * tau) * Math.sin(f * tau))

/* The star's path, in logo units: out of the apostrophe, then an arc that
   drops into the o. The logo runs edge to edge here, so the star waits a
   little left of the kit's spot (on screen, not past the edge), and the arc
   is lower so it stays clear of the intro text. */
const AP = [594.6, 43.3]
const REST_X = AP[0] - 9
const LAUNCH = [REST_X, AP[1] - 55 * KPX]
const CTRL = [(LAUNCH[0] + OX) / 2 + 40 * KPX, OY - 380 * KPX]
const quad = (u: number) => [
  (1 - u) ** 2 * LAUNCH[0] + 2 * (1 - u) * u * CTRL[0] + u * u * OX,
  (1 - u) ** 2 * LAUNCH[1] + 2 * (1 - u) * u * CTRL[1] + u * u * OY,
]

function useKitLoop(ref: { current: HTMLDivElement | null }) {
  useEffect(() => {
    const box = ref.current
    if (!box) return
    const imgs = Array.from(box.querySelectorAll<HTMLImageElement>('img'))
    const [, , , , , apos, plain, star] = imgs
    imgs.forEach((img, i) => {
      img.style.transformOrigin = i === 5 ? APOS : i === 7 ? O_ORIGIN : `${CX[i === 6 ? 1 : i] * 100}% ${BASE * 100}%`
    })
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let visible = true
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(box)
    let frame = 0
    const start = performance.now()
    const at = (x: number, y: number) =>
      `translate(${((x - OX) * PX_W * 100).toFixed(3)}%, ${((y - OY) * PX_H * 100).toFixed(3)}%)`

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick)
      if (!visible) return
      const t = Math.min(((now - start) / 1000) % (K_END + K_HOLD), K_END)
      const tau = t - HIT
      const recoil = [-1, 0, 1, 0.6, 0.35].map((v) => v * ring(tau, 13, 5))

      // Letters rise, overshoot and settle; the o squashes as the star hits.
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
        const tf = `translate(${(recoil[i] * PX_W * 100).toFixed(3)}%, ${(y * PX_H * 100).toFixed(3)}%) scale(${sx.toFixed(4)}, ${syy.toFixed(4)})`
        imgs[i].style.transform = tf
        if (i === 1) plain.style.transform = tf
      }

      // The o: whole until the star lands, then the cut-out opens from the
      // centre (the holed o, revealed in a growing circle over the whole one).
      const open = tau < 0 ? 0 : outCubic(prog(t, HIT, HIT + 0.32))
      plain.style.opacity = open >= 1 ? '0' : '1'
      const r = (open * 13 * 25 * box.clientWidth / 2786).toFixed(1)
      const hole = `radial-gradient(circle at ${O_ORIGIN}, transparent ${r}px, #000 ${r}px)`
      plain.style.maskImage = hole
      plain.style.webkitMaskImage = hole

      // The apostrophe drops in, winds up, flings, and wobbles.
      const ka = prog(t, 0.62, 1.12)
      const load = Math.sin((Math.PI / 2) * prog(t, WIND, FLING)) * (t < FLING ? 1 : 0)
      const fl = t >= FLING ? -16 * Math.exp(-4 * (t - FLING)) * Math.cos(11 * (t - FLING)) : 0
      const sq = 1 - 0.2 * load + (t >= FLING ? 0.18 * ring(t - FLING, 14, 6) : 0)
      const ay = ka <= 0 ? -200 : -(1 - backOut(ka, 2.4)) * 12 * PX_H * 100
      apos.style.transform = `translate(${(recoil[4] * 0.8 * PX_W * 100).toFixed(3)}%, ${ay.toFixed(3)}%) rotate(${(12 * load + fl).toFixed(3)}deg) scale(${(1 / Math.sqrt(sq)).toFixed(4)}, ${sq.toFixed(4)})`

      // The star: pops out above the apostrophe, winds up with it, is flung
      // in an arc and spins into the o. Gone the moment it lands.
      if (t >= POP && t < FLING) {
        const pop = backOut(prog(t, POP, POP + 0.34), 2.6)
        const lw = Math.sin((Math.PI / 2) * prog(t, WIND, FLING))
        const wig = 14 * Math.sin((t - POP) * 6) * (1 - lw)
        const x = REST_X
        const y = AP[1] - 95 * KPX * outCubic(prog(t, POP, POP + 0.35)) + 40 * KPX * lw
        star.style.opacity = '1'
        star.style.transform = `${at(x, y)} rotate(${(30 + wig).toFixed(2)}deg) scale(${(pop * (1 + 0.12 * lw)).toFixed(4)}, ${(pop * (1 - 0.16 * lw)).toFixed(4)})`
      } else if (t >= FLING && t < HIT) {
        const k = prog(t, FLING, HIT)
        const u = lerp(k, ease(k), 0.45)
        const [x, y] = quad(u)
        star.style.opacity = '1'
        star.style.transform = `${at(x, y)} rotate(${lerp(30, -330, u).toFixed(2)}deg)`
      } else {
        star.style.opacity = '0'
      }
    }
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      io.disconnect()
    }
  }, [ref])
}
