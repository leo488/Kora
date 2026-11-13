import { useEffect, useRef, useState } from 'react'
import './scenes.css'
import ipaybtcLogo from '../../assets/ipaybtc-logo.svg?raw'
import o1 from '../../assets/ipaybtc3d/o1.webp'
import o2 from '../../assets/ipaybtc3d/o2.webp'
import o3 from '../../assets/ipaybtc3d/o3.webp'
import o8 from '../../assets/ipaybtc3d/o8.webp'
import type { CaseSlot } from '../../caseStudies'
import { AppScreen, KeypadCard, ReceivedCard } from './AppScreen'

/* Scenes for the iPayBTC case study drawn in code, after the Ragged Edge
   Wise page. Light, calm, brand colours only, no shadows. */

/** True while the element is on screen (or once, with `once`). */
export function useInView<T extends Element>(threshold = 0.3, once = true) {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => (once ? e.isIntersecting && setSeen(true) : setSeen(e.isIntersecting)), { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, once])
  return [ref, seen] as const
}

/** Scale for content drawn at a fixed size: `frac` of the plate's width
    divided by the drawn width. Written to --ips-s on the element. */
function useFit<T extends HTMLElement>(ref: React.RefObject<T | null>, frac: number, drawn: number) {
  useEffect(() => {
    const el = ref.current
    const plate = el?.closest('.kora-case-plate') as HTMLElement | null
    if (!el || !plate) return
    const set = () => el.style.setProperty('--ips-s', String((plate.clientWidth * frac) / drawn))
    set()
    const ro = new ResizeObserver(set)
    ro.observe(plate)
    return () => ro.disconnect()
  }, [ref, frac, drawn])
}

function useCycle(length: number, every: number) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setInterval(() => setI((v) => (v + 1) % length), every)
    return () => clearInterval(t)
  }, [length, every])
  return i
}

/* Each line comes with one of our 3D objects. */
const LINES: Array<[string, string, string]> = [
  ['YOUR BITCOIN', 'CAN TRAVEL.', o8],
  ['BEFORE YOUR', 'TEA GETS COLD.', o1],
  ['PAY NEPA', 'IN SATS.', o2],
  ['NO BORDER.', 'NO PERMISSION.', o3],
]

/** Campaign type whose words swap, like Wise's FULL SPEED / MIN FEES, with
    one 3D object per line. */
export function TypeSwap() {
  const i = useCycle(LINES.length, 2000)
  return (
    <div className="ips ips-type">
      <div className="ips-type-lines" aria-live="off">
        {LINES.map((l, k) => (
          <p key={k} className={k === i ? 'is-on' : ''}>
            <span>{l[0]}</span>
            <span>{l[1]}</span>
          </p>
        ))}
      </div>
      <div className="ips-type-objs" aria-hidden>
        {LINES.map((l, k) => (
          <img key={k} src={l[2]} alt="" className={k === i ? 'is-on' : ''} />
        ))}
      </div>
      <span className="ips-type-logo" dangerouslySetInnerHTML={{ __html: ipaybtcLogo }} />
    </div>
  )
}

/** The app on a full-width Electric Blue ground: three phones, the middle
    one sending sats, the others resting on the wallet and the done screen. */
export function UiBoard() {
  const [ref, on] = useInView<HTMLDivElement>(0.2, false)
  useFit(ref, 0.2, 390)
  return (
    <div ref={ref} className="ips ips-uiboard">
      <div className="ips-phones">
        <div className="ips-phone is-side">
          <AppScreen flow="wallet" playing={on} />
        </div>
        <div className="ips-phone">
          <AppScreen flow="send" playing={on} />
        </div>
        <div className="ips-phone is-side">
          <AppScreen flow="done" playing={on} />
        </div>
      </div>
    </div>
  )
}

/** A component lifted out of the app, resting beside the people in a photo. */
export function PhotoCard({ kind, side, top = false }: { kind: 'keypad' | 'received'; side: 'left' | 'right'; top?: boolean }) {
  const [ref, on] = useInView<HTMLDivElement>(0.4, false)
  useFit(ref, 0.19, 360)
  return (
    <div ref={ref} className={`ips-card is-${side}${top ? ' is-top' : ''}${on ? ' is-in' : ''}`} aria-hidden>
      <div className="ips-card-scale">{kind === 'keypad' ? <KeypadCard playing={on} /> : <ReceivedCard playing={on} />}</div>
    </div>
  )
}

/** A photo that eases out from a slight zoom while it is on screen. */
export function ZoomImg({ slot, eager }: { slot: CaseSlot; eager?: boolean }) {
  const [ref, on] = useInView<HTMLImageElement>(0.25, true)
  return (
    <img
      ref={ref}
      className={`ips-zoom${on ? ' is-in' : ''}`}
      src={slot.src}
      srcSet={slot.srcSet}
      sizes="100vw"
      alt={slot.label}
      loading={eager ? 'eager' : 'lazy'}
    />
  )
}

/* ---------- Plates rebuilt from Leo's Figma layers ---------- */

/** One phone on a light ground running the buy flow, like Wise's app screen
    beside the building wrap. */
export function PhonePlate({ flow = 'buy', ground = 'light' }: { flow?: 'buy' | 'send'; ground?: 'light' | 'blue' }) {
  const [ref, on] = useInView<HTMLDivElement>(0.2, false)
  useFit(ref, 0.5, 390)
  return (
    <div ref={ref} className={`ips ips-phoneplate is-${ground}`}>
      <div className="ips-phone">
        <AppScreen flow={flow} playing={on} />
      </div>
    </div>
  )
}

/** The brand gradient with the wordmark: the pattern tile of the pair. */
export function GradientTile() {
  return (
    <div className="ips ips-gtile" role="img" aria-label="iPayBTC wordmark on the brand gradient">
      <span dangerouslySetInnerHTML={{ __html: ipaybtcLogo }} />
    </div>
  )
}

/** A Milky Yellow poster: one bold line and one 3D object. */
export function YellowPoster() {
  const [ref, on] = useInView<HTMLDivElement>(0.3, true)
  return (
    <div ref={ref} className={`ips ips-poster${on ? ' is-in' : ''}`}>
      <p>
        NEVER MEANT
        <br />
        TO SIT STILL.
      </p>
      <img src={o8} alt="" />
    </div>
  )
}

/** Frames 31 and 32: the type specimens. */
export function TypeSpecimen({ tone }: { tone: 'blue' | 'yellow' }) {
  return (
    <div className={`ips ips-spec is-${tone}`}>
      <div className="ips-spec-card">
        <p className="ips-spec-glyphs">
          abcdefghijklmn
          <br />
          opqrstuvwxyz
          <br />
          ABCDEFGHIJKLMN
          <br />
          OPQRSTUVWXYZ 1234567890
        </p>
        <p className="ips-spec-note">
          {tone === 'blue' ? 'Futura LT Condensed ExtraBold. Headlines and campaign lines.' : 'Neue Haas Grotesk. Body copy and the small print.'}
          <br />
          Built to communicate with both impact and clarity.
        </p>
      </div>
    </div>
  )
}

/** Frame 29: the watch, with the Bitcoin balance on its face. */
export function WatchPlate({ watch }: { watch: string }) {
  const [ref, on] = useInView<HTMLDivElement>(0.3, false)
  const [n, setN] = useState(false)
  useEffect(() => {
    if (!on || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t: number[] = []
    const loop = () => {
      setN(false)
      t.push(window.setTimeout(() => setN(true), 1600))
      t.push(window.setTimeout(loop, 5200))
    }
    loop()
    return () => t.forEach(clearTimeout)
  }, [on])
  return (
    <div ref={ref} className="ips ips-watch">
      <div className="ips-watch-body">
        <img src={watch} alt="" />
        <div className="ips-watch-face">
          <div className="ips-watch-top">
            <span>Bitcoin</span>
            <img src={o1} alt="" />
          </div>
          <strong>{n ? '118,559' : '87,719'}</strong>
          <span className="ips-watch-unit">SATS</span>
          <span className={`ips-watch-in${n ? ' is-on' : ''}`}>+30,840 from Ada</span>
        </div>
      </div>
    </div>
  )
}

/** Frame 30: the iPayBTC website, rebuilt from its layers, in a browser. */
export function Website({ sun, desk }: { sun: string; desk: string }) {
  const [ref, on] = useInView<HTMLDivElement>(0.25, false)
  useFit(ref, 0.86, 1440)
  const words = 'Spend Bitcoin like money, for everyday use'.split(' ')
  return (
    <div ref={ref} className={`ips ips-web${on ? ' is-in' : ''}`}>
      <div className="ips-web-window">
        <div className="ips-web-inner">
        <div className="ips-web-bar">
          <i />
          <i />
          <i />
          <span>ipaybtc.com</span>
        </div>
        <div className="ips-web-page">
          <nav className="ips-web-nav">
            <span className="ips-web-logo" dangerouslySetInnerHTML={{ __html: ipaybtcLogo }} />
            <span className="ips-web-links">
              <span>Home</span>
              <span>About us</span>
              <span>Contact us</span>
              <span>More</span>
            </span>
            <span className="ips-web-cta">Get the app</span>
          </nav>
          <h3 className="ips-web-head">
            {words.map((w, k) => (
              <span key={k} style={{ transitionDelay: `${k * 70}ms` }}>
                {w}
              </span>
            ))}
          </h3>
          <div className="ips-web-row">
            <img className="ips-web-sun" src={sun} alt="" />
            <div className="ips-web-panel" style={{ backgroundImage: `url(${desk})` }}>
              <span className="ips-web-oval a" />
              <span className="ips-web-oval b" />
              <div className="ips-web-phone">
                <AppScreen flow="buy" playing={on} />
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}
