import { useEffect, useRef, useState } from 'react'
import ilSend from '../../assets/ipaybtc-ill/ipaybtc-send-transparent.webp'
import './extras.css'
import ipaybtcLogo from '../../assets/ipaybtc-logo.svg?raw'
import art0 from '../../assets/ipaybtc-onboard/ob0-art.jpg'
import art1 from '../../assets/ipaybtc-onboard/ob1-art.jpg'
import art2 from '../../assets/ipaybtc-onboard/ob2-art.jpg'
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

const SLIDES = [
  { art: art0, head: ['Your Bitcoin', 'can travel.'], sub: 'Send sats to anyone, anywhere, in seconds. No border, no bank hours.' },
  { art: art1, head: ['Buy Bitcoin', 'before your tea', 'gets cold.'], sub: 'Buy, swap and hold Bitcoin and stablecoins in one app.' },
  { art: art2, head: ['Pay NEPA', 'in sats.'], sub: 'Airtime, data and light bills, straight from your Bitcoin.' },
]

type Phase = 'in' | 'tap' | 'out'

/** The onboarding screen itself, drawn at 390 × 844 (for a photo's phone). */
export function OnboardScreen({ playing = true }: { playing?: boolean }) {
  const [step, setStep] = useState(0)
  const [phase, setPhase] = useState<Phase>('in')

  useEffect(() => {
    if (!playing || reduced()) return
    const t = [
      window.setTimeout(() => setPhase('tap'), 2600),
      window.setTimeout(() => setPhase('out'), 3000),
      window.setTimeout(() => {
        setStep((v) => (v + 1) % SLIDES.length)
        setPhase('in')
      }, 3450),
    ]
    return () => t.forEach(clearTimeout)
  }, [playing, step])

  const slide = SLIDES[step]
  const last = step === SLIDES.length - 1

  return (
    <div className="ipx-ob-screen">
      <div className="ipx-ob-status">
        <b>9:41</b>
        <span className="ipx-ob-icons" />
      </div>
      <div className="ipx-ob-top">
        <span className="ipx-ob-logo" dangerouslySetInnerHTML={{ __html: ipaybtcLogo }} />
        <span>Skip</span>
      </div>

      <div key={step} className={`ipx-ob-body is-${phase}`}>
        <img className="ipx-ob-art" src={slide.art} alt="" />
        <h3 className="ipx-ob-head">
          {slide.head.map((l, k) => (
            <span key={l} style={{ animationDelay: `${180 + k * 90}ms` }}>
              <i>{l}</i>
            </span>
          ))}
        </h3>
        <p className="ipx-ob-sub">{slide.sub}</p>
      </div>

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
  { deep: '#3f1407', bright: '#8ce8b4', ink: '#0a3a2a' },
  { deep: '#0a3a2a', bright: '#ffb28c', ink: '#3f1407' },
  { deep: '#050e7f', bright: '#fff778', ink: '#050e7f' },
  { deep: '#06205e', bright: '#a9d2ff', ink: '#06205e' },
  { deep: '#0a31f5', bright: '#ffffff', ink: '#050e7f' },
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
            <div key={step} className="ipx-cc-card" style={{ background: p.bright, color: p.ink, animationDelay: `${slot * 90}ms` }}>
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

/** The merch on one plain ground: tote, tee, watch and staff pass rise in
    one after another, then drift slowly while they are on screen. */
const MOCKS = [
  { src: mkTote, cls: 'is-tote', alt: 'The iPayBTC tote' },
  { src: mkTee, cls: 'is-tee', alt: 'The iPayBTC tee on a hanger' },
  { src: mkWatch, cls: 'is-watch', alt: 'The iPayBTC app on a watch' },
  { src: mkPass, cls: 'is-pass', alt: 'The iPayBTC staff pass on its lanyard' },
]

export function MockupBoard() {
  const [ref, on] = useInView<HTMLDivElement>(0.3, true)
  return (
    <div ref={ref} className={`ipx-mk${on ? ' is-on' : ''}`}>
      {MOCKS.map((m, i) => (
        <img key={m.cls} className={m.cls} src={m.src} alt={m.alt} loading="lazy" style={{ ['--i' as string]: i }} />
      ))}
    </div>
  )
}
