import { useEffect, useRef, useState } from 'react'
import ilSend from '../../assets/ipaybtc-ill/ipaybtc-send-transparent.webp'
import './extras.css'
import ipaybtcLogo from '../../assets/ipaybtc-logo.svg?raw'
import art0 from '../../assets/ipaybtc-onboard/ob0-art.jpg'
import art1 from '../../assets/ipaybtc-onboard/ob1-art.jpg'
import art2 from '../../assets/ipaybtc-onboard/ob2-art.jpg'
import artD0 from '../../assets/ipaybtc-onboard/obd0-art.jpg'
import artD1 from '../../assets/ipaybtc-onboard/obd1-art.jpg'
import artD2 from '../../assets/ipaybtc-onboard/obd2-art.jpg'
import { SwapApp } from './SwapApp'
import mkTote from '../../assets/ipaybtc-mk/tote.webp'
import mkTee from '../../assets/ipaybtc-mk/tee.webp'
import mkWatch from '../../assets/ipaybtc-mk/watch.webp'
import mkPass from '../../assets/ipaybtc-mk/pass.webp'
import { useInView } from './Scenes'

/* iPayBTC case study, Nov 20 pass: the onboarding as a real tap-through,
   the merch reel, and the website rebuilt live. */

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Scales a box drawn at w × h to fit inside its parent at `frac` of its height. */
function useScaleTo<T extends HTMLElement>(w: number, h: number, frac: number) {
  const ref = useRef<T>(null)
  const [s, setS] = useState(0.5)
  useEffect(() => {
    const el = ref.current?.parentElement
    if (!el) return
    const set = () => setS(Math.min((el.clientHeight * frac) / h, (el.clientWidth * 0.9) / w))
    set()
    const ro = new ResizeObserver(set)
    ro.observe(el)
    return () => ro.disconnect()
  }, [w, h, frac])
  return [ref, s] as const
}

/* ------------------------------------------------------------------ */
/* Onboarding: a finger taps Next, and the next screen's art and words
   animate in, rather than whole screens sliding past. */

const DARK_ART = [artD0, artD1, artD2]
const SLIDES = [
  { art: art0, head: ['Your Bitcoin', 'can travel.'], sub: 'Send sats to anyone, anywhere, in seconds. No border, no bank hours.' },
  { art: art1, head: ['Buy Bitcoin', 'before your tea', 'gets cold.'], sub: 'Buy, swap and hold Bitcoin and stablecoins in one app.' },
  { art: art2, head: ['Pay NEPA', 'in sats.'], sub: 'Airtime, data and light bills, straight from your Bitcoin.' },
]

type Phase = 'in' | 'tap' | 'out'

/** The onboarding screen itself, drawn at 390 × 844 (for a photo's phone). */
export function OnboardScreen({ playing = true, dark = false }: { playing?: boolean; dark?: boolean }) {
  const [step, setStep] = useState(0)
  const [phase, setPhase] = useState<Phase>('in')
  const [prev, setPrev] = useState<number | null>(null)

  useEffect(() => {
    if (!playing || reduced()) return
    const t = [
      window.setTimeout(() => setPhase('tap'), 2600),
      // The tap pushes the next page in while the current one leaves.
      window.setTimeout(() => {
        setPrev(step)
        setStep((v) => (v + 1) % SLIDES.length)
        setPhase('in')
      }, 3000),
    ]
    return () => t.forEach(clearTimeout)
  }, [playing, step])

  const last = step === SLIDES.length - 1
  const body = (k: number, ph: Phase) => {
    const slide = SLIDES[k]
    return (
      <div key={k} className={`ipx-ob-body is-${ph}`}>
        <img className="ipx-ob-art" src={dark ? DARK_ART[k] : slide.art} alt="" />
        <h3 className="ipx-ob-head">
          {slide.head.map((l, j) => (
            <span key={l} style={{ animationDelay: `${180 + j * 90}ms` }}>
              <i>{l}</i>
            </span>
          ))}
        </h3>
        <p className="ipx-ob-sub">{slide.sub}</p>
      </div>
    )
  }

  return (
    <div className={`ipx-ob-screen${dark ? ' is-dark' : ''}`}>
      <div className="ipx-ob-status">
        <b>9:41</b>
        <span className="ipx-ob-icons" />
      </div>
      <div className="ipx-ob-top">
        <span className="ipx-ob-logo" dangerouslySetInnerHTML={{ __html: ipaybtcLogo }} />
        <span>Skip</span>
      </div>

      {prev !== null && prev !== step && body(prev, 'out')}
      {body(step, phase === 'out' ? 'in' : phase)}

      <div className="ipx-ob-dots">
        {SLIDES.map((_, k) => (
          <i key={k} className={k === step ? 'is-on' : ''} />
        ))}
      </div>

      <div className="ipx-ob-actions">
        <button className={`ipx-ob-next${phase === 'tap' ? ' is-pressed' : ''}`}>
          <span key={last ? 'g' : 'n'}>{last ? 'Get started' : 'Next'}</span>
          {phase === 'tap' && <em className="ipx-ob-touch" />}
        </button>
        <button className="ipx-ob-alt">I already have an account</button>
      </div>
      <span className="ipx-ob-homebar" />
    </div>
  )
}

export function OnboardTap() {
  const [view, on] = useInView<HTMLDivElement>(0.3, false)
  const [ref, s] = useScaleTo<HTMLDivElement>(390, 844, 0.86)
  return (
    <div ref={view} className="ips ipx-ob" role="img" aria-label="iPayBTC onboarding: tapping Next brings in each screen">
      <div ref={ref} className="ipx-ob-phone" style={{ transform: `scale(${s})` }}>
        <OnboardScreen playing={on} />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Merch reel: the tee eases in on a slow zoom, then hands over to the
   watch and the rest of the Figma frames. Every frame is shown whole. */

export interface ReelFrame {
  src: string
  srcSet?: string
  label: string
}

export function MerchReel({ frames, every = 4200 }: { frames: ReelFrame[]; every?: number }) {
  const [ref, on] = useInView<HTMLDivElement>(0.3, false)
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!on || reduced()) return
    const t = window.setTimeout(() => setI((v) => (v + 1) % frames.length), every)
    return () => clearTimeout(t)
  }, [on, i, every, frames.length])

  return (
    <div ref={ref} className="ips ipx-reel" role="img" aria-label={frames.map((f) => f.label).join(', ')}>
      {frames.map((f, k) => (
        <div
          key={f.src}
          className={`ipx-reel-frame${k === i ? ' is-on' : k === (i - 1 + frames.length) % frames.length ? ' is-prev' : ''}`}
        >
          <img className="ipx-reel-fill" src={f.src} alt="" loading="lazy" />
          <img className="ipx-reel-img" src={f.src} srcSet={f.srcSet} sizes="70vw" alt="" loading="lazy" />
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* The website, rebuilt in code in the layout of Leo's Figma frame, with
   the current app live in the right-hand panel. */

export function WebsiteHero() {
  const [ref, on] = useInView<HTMLDivElement>(0.25, false)
  const [phone, s] = useScaleTo<HTMLDivElement>(390, 844, 1.0)
  return (
    <div ref={ref} className={`ips ipx-web${on ? ' is-on' : ''}`} role="img" aria-label="The iPayBTC website">
      <div className="ipx-web-page">
        <nav className="ipx-web-nav">
          <span className="ipx-web-logo" dangerouslySetInnerHTML={{ __html: ipaybtcLogo }} />
          <span className="ipx-web-links">
            <span>Home</span>
            <span>About us</span>
            <span>Contact us</span>
            <span>More</span>
          </span>
          <span className="ipx-web-cta">Get the app</span>
        </nav>
        <h3 className="ipx-web-head">
          {['Spend Bitcoin', 'like money, for', 'everyday use.'].map((l, k) => (
            <span key={l} style={{ transitionDelay: `${150 + k * 110}ms` }}>
              <i>{l}</i>
            </span>
          ))}
        </h3>
        <div className="ipx-web-row">
          <div className="ipx-web-photo">
            <img className="ipx-web-ill" src={ilSend} alt="" />
          </div>
          <div className="ipx-web-app">
            <div ref={phone} className="ipx-web-phone" style={{ transform: `scale(${s})` }}>
              <SwapApp playing={on} tone="dark" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/** The colour pairs at work: each deep square holds its bright card, and the
    cards cut through the campaign lines while they are on screen. */
const PAIRS = [
  // The full palette (Nov 21): every square and card is one of the seven brand colours.
  { deep: '#040246', bright: '#ff8619', ink: '#040246' },
  { deep: '#050e7f', bright: '#ffef6b', ink: '#050e7f' },
  { deep: '#0a31f5', bright: '#f7a6d6', ink: '#040246' },
  { deep: '#ff8619', bright: '#040246', ink: '#fff8e7' },
  { deep: '#f7a6d6', bright: '#0a31f5', ink: '#fff8e7' },
  { deep: '#8cc4ee', bright: '#050e7f', ink: '#ffef6b' },
  { deep: '#ffef6b', bright: '#0a31f5', ink: '#fff8e7' },
]
const LINES: Array<{ head: string[]; sub?: string }> = [
  { head: ['Your Naira', "can't travel.", 'Your Bitcoin', 'can.'] },
  { head: ['Pay NEPA', 'in sats.'], sub: 'Airtime, data and light bills, straight from your Bitcoin.' },
  { head: ['Buy Bitcoin', 'before your', 'tea gets', 'cold.'] },
  { head: ['No border.', 'No permission.'], sub: 'No bank opening hours.' },
  { head: ['Bitcoin was', 'never meant', 'to sit still.', 'Spend it.'] },
]

export function ColourCards() {
  const [ref, on] = useInView<HTMLDivElement>(0.3, false)
  const [step, setStep] = useState(0)
  useEffect(() => {
    if (!on || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setInterval(() => setStep((s) => s + 1), 2600)
    return () => clearInterval(t)
  }, [on])
  return (
    <div ref={ref} className={`ipx-cc${on ? ' is-on' : ''}`} aria-hidden>
      {[0, 1, 2].map((slot) => {
        const k = (step + slot * 2) % PAIRS.length
        const p = PAIRS[k]
        const l = LINES[(step + slot) % LINES.length]
        return (
          <div key={slot} className="ipx-cc-sq" style={{ background: p.deep }}>
            <div key={step} className="ipx-cc-card" style={{ background: p.bright, color: p.ink, animationDelay: `${slot * 160}ms` }}>
              <b>
                {l.head.map((h) => (
                  <span key={h}>{h}</span>
                ))}
              </b>
              {l.sub && <span>{l.sub}</span>}
              <i dangerouslySetInnerHTML={{ __html: ipaybtcLogo }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

/** The merch, one piece at a time on its own ground, hard cuts between:
    tee on blue, tote, staff pass, then the watch. */
const MOCKS = [
  { src: mkTee, cls: 'is-tee', bg: '#0a31f5', alt: 'The iPayBTC tee on a hanger' },
  { src: mkTote, cls: 'is-tote', bg: '#0a31f5', alt: 'The iPayBTC tote' },
  { src: mkPass, cls: 'is-pass', bg: '#0a31f5', alt: 'The iPayBTC staff pass on its lanyard' },
  { src: mkWatch, cls: 'is-watch', bg: '#0a31f5', alt: 'The iPayBTC app on a watch' },
]

export function MockupBoard() {
  const [ref, on] = useInView<HTMLDivElement>(0.3, false)
  const [step, setStep] = useState(0)
  useEffect(() => {
    if (!on || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setInterval(() => setStep((s) => (s + 1) % MOCKS.length), 2600)
    return () => clearInterval(t)
  }, [on])
  const m = MOCKS[step]
  return (
    <div ref={ref} className="ipx-mk2" style={{ background: m.bg }}>
      <img key={step} className={m.cls} src={m.src} alt={m.alt} />
      {MOCKS.map((x) => (
        <link key={x.cls} rel="preload" as="image" href={x.src} />
      ))}
    </div>
  )
}

/* ---------- Brand gradients (Nov 21) ----------
   The two iPayBTC gradients, built from the palette, with the wordmark in
   the middle and each stop's hex written where it sits. They swap with a
   clean wipe, never a fade. */

const GRADIENTS: Array<{ name: string; stops: Array<[string, string, number]> }> = [
  { name: 'Deep to Sat', stops: [['Midnight', '#040246', 0], ['Deep Blue', '#050E7F', 30], ['Sat Blue', '#0A31F5', 72], ['Harmattan Sky', '#8CC4EE', 100]] },
  { name: 'Sunrise', stops: [['Sats Orange', '#FF8619', 0], ['Plantain', '#FFEF6B', 18], ['Sat Blue', '#0A31F5', 64], ['Harmattan Sky', '#8CC4EE', 100]] },
]

export function BrandGradients() {
  const [ref, on] = useInView<HTMLDivElement>(0.3, false)
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!on || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setI((n) => (n + 1) % GRADIENTS.length), 4200)
    return () => clearInterval(id)
  }, [on])
  return (
    <div ref={ref} className="ipg" aria-hidden>
      {GRADIENTS.map((g, k) => (
        <div key={g.name} className={`ipg-layer${k === i ? ' is-on' : ''}`} style={{ background: `linear-gradient(180deg, ${g.stops.map(([, h, p]) => `${h} ${p}%`).join(', ')})`, zIndex: k === i ? 2 : 1 }}>
          <span className="ipg-logo" dangerouslySetInnerHTML={{ __html: ipaybtcLogo }} />
          {g.stops.map(([n, h, p]) => (
            <span key={h} className="ipg-stop" style={{ color: ['#FFEF6B', '#8CC4EE'].includes(h) ? '#040246' : '#fff', top: `${Math.min(Math.max(p, 4), 96)}%`, ['--align' as string]: p > 90 ? '-100%' : p < 5 ? '0%' : '-50%' }}>
              <i />
              <b>{h}</b>
              <small>{n} · {p}%</small>
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

/* ---------- Brand guide, stacked in one frame (Nov 21) ---------- */

export function GuideStack({ pages }: { pages: Array<{ src: string; srcSet: string; label: string }> }) {
  return (
    <div className="ipgs">
      {pages.map((p, k) => (
        <img key={p.src} className={`ipgs-page ipgs-${k}`} src={p.src} srcSet={p.srcSet} sizes="40vw" alt={p.label} loading="lazy" />
      ))}
    </div>
  )
}
