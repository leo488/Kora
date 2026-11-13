import { useEffect, useRef, useState } from 'react'
import './scenes.css'
import ipaybtcLogo from '../../assets/ipaybtc-logo.svg?raw'
import { AppScreen } from './AppScreen'
import type { AppFlow, Screen } from './AppScreen'

/* Plates drawn in code for the iPayBTC case study, set out like the scenes
   on the Ragged Edge Wise page. The app is the first iPayBTC UI (DM Sans,
   light). The bold condensed face is for campaign lines only. */

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
function useFit<T extends HTMLElement>(ref: React.RefObject<T | null>, frac: number, drawn: number, byHeight = false) {
  useEffect(() => {
    const el = ref.current
    const plate = el?.closest('.kora-case-plate') as HTMLElement | null
    if (!el || !plate) return
    const set = () => el.style.setProperty('--ips-s', String(((byHeight ? plate.clientHeight : plate.clientWidth) * frac) / drawn))
    set()
    const ro = new ResizeObserver(set)
    ro.observe(plate)
    return () => ro.disconnect()
  }, [ref, frac, drawn, byHeight])
}

/** A campaign poster: bold lines and the wordmark, like Wise's MIN FEES. */
export function TypePoster({ lines, tone = 'navy', size = 14 }: { lines: string[]; tone?: 'navy' | 'yellow' | 'blue'; size?: number }) {
  const [ref, on] = useInView<HTMLDivElement>(0.35, true)
  return (
    <div ref={ref} className={`ips ips-poster is-${tone}${on ? ' is-in' : ''}`}>
      <p style={{ fontSize: `${size}cqw` }}>
        {lines.map((l, k) => (
          <span key={k} style={{ transitionDelay: `${k * 90}ms` }}>
            {l}
          </span>
        ))}
      </p>
      <span className="ips-poster-logo" dangerouslySetInnerHTML={{ __html: ipaybtcLogo }} />
    </div>
  )
}

/** The wordmark alone on a brand colour. */
export function LogoTile({ tone = 'navy' }: { tone?: 'navy' | 'blue' }) {
  return (
    <div className={`ips ips-logotile is-${tone}`} role="img" aria-label="The iPayBTC wordmark">
      <span dangerouslySetInnerHTML={{ __html: ipaybtcLogo }} />
    </div>
  )
}

function Phone({ flow, hold, playing }: { flow: AppFlow; hold?: Screen; playing: boolean }) {
  return (
    <div className="ips-phone">
      <AppScreen flow={flow} hold={hold} playing={playing} />
    </div>
  )
}

/** One phone on a light ground, like Wise's app screen beside the wrap. */
export function PhonePlate({ flow = 'buy' }: { flow?: AppFlow }) {
  const [ref, on] = useInView<HTMLDivElement>(0.2, false)
  useFit(ref, 0.82, 844, true)
  return (
    <div ref={ref} className="ips ips-phoneplate">
      <Phone flow={flow} playing={on} />
    </div>
  )
}

/** Three phones on a light ground: the account, a buy in progress, the receipt. */
export function PhoneBoard() {
  const [ref, on] = useInView<HTMLDivElement>(0.2, false)
  useFit(ref, 0.2, 390)
  return (
    <div ref={ref} className="ips ips-phoneplate">
      <div className="ips-phones">
        <Phone flow="send" hold="home" playing={false} />
        <Phone flow="buy" playing={on} />
        <Phone flow="buy" hold="done" playing={false} />
      </div>
    </div>
  )
}

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '↑']
const TYPING = ['2', '20', '200', '2,000', '20,000']
const PRESS = ['2', '0', '0', '0', '0']

/** The amount keypad lifted out of the app, beside the people in a photo. */
export function KeypadCard() {
  const [ref, on] = useInView<HTMLDivElement>(0.4, false)
  const [n, setN] = useState(0)
  useFit(ref, 0.2, 360)
  useEffect(() => {
    if (!on || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t: number[] = []
    const loop = () => {
      setN(0)
      TYPING.forEach((_, k) => t.push(window.setTimeout(() => setN(k + 1), 900 + k * 420)))
      t.push(window.setTimeout(loop, 6000))
    }
    loop()
    return () => t.forEach(clearTimeout)
  }, [on])
  const pressed = n > 0 ? PRESS[n - 1] : null
  return (
    <div ref={ref} className={`ips-kcard${on ? ' is-in' : ''}`} aria-hidden>
      <div className="ips-kcard-scale">
        <div className="ips-kcard-panel">
          <div>
            <span>Send to Tolu</span>
            <span>SATS</span>
          </div>
          <strong className={n === 0 ? 'is-empty' : ''}>{n === 0 ? '0' : TYPING[n - 1]}</strong>
        </div>
        <div className="ips-kcard-keys">
          {KEYS.map((k) => (
            <span key={k} className={`${k === pressed ? 'is-pressed' : ''}${k === '↑' && n === TYPING.length ? ' is-go' : ''}`}>
              {k}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/** A photo that eases out from a slight zoom while it is on screen. */
export function ZoomImg({ src, srcSet, alt, eager }: { src?: string; srcSet?: string; alt: string; eager?: boolean }) {
  const [ref, on] = useInView<HTMLImageElement>(0.25, true)
  return (
    <img
      ref={ref}
      className={`ips-zoom${on ? ' is-in' : ''}`}
      src={src}
      srcSet={srcSet}
      sizes="100vw"
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
    />
  )
}

const DASH_ROWS = [
  { t: 'Instant Buy', m: 'Oct 20', a: '+20,000 sats', s: '₦34,200' },
  { t: 'Naira deposit', m: 'Oct 20', a: '+₦50,000', s: 'Bank transfer' },
  { t: 'Airtime · MTN', m: 'Oct 18', a: '−₦1,000', s: 'Naira wallet' },
  { t: 'Sent to Ada Okafor', m: 'Oct 16', a: '−12,500 sats', s: 'On-chain' },
]

/** iPayBTC on the web, drawn at 1440 × 900 for the laptop in the photo. */
export function WebDash({ playing }: { playing: boolean }) {
  const [fresh, setFresh] = useState(false)
  useEffect(() => {
    if (!playing || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t: number[] = []
    const loop = () => {
      setFresh(false)
      t.push(window.setTimeout(() => setFresh(true), 1800))
      t.push(window.setTimeout(loop, 7000))
    }
    loop()
    return () => t.forEach(clearTimeout)
  }, [playing])
  return (
    <div className="ips-dash">
      <header className="ips-dash-nav">
        <span className="ips-dash-logo" dangerouslySetInnerHTML={{ __html: ipaybtcLogo }} />
        <nav>
          <span className="is-on">Home</span>
          <span>Wallet</span>
          <span>Trade</span>
          <span>Pay bills</span>
        </nav>
        <span className="ips-dash-me">TA</span>
      </header>
      <h3>Welcome back, Tolu</h3>
      <div className="ips-dash-grid">
        <section className="ips-dash-card">
          <span className="ips-dash-label">Total balance</span>
          <strong className="ips-dash-big">{fresh ? '$1,252.80' : '$1,230.00'}</strong>
          <span className="ips-dash-faint">1 BTC = $114,000.30</span>
          <div className="ips-dash-btns">
            <span>↙ Receive</span>
            <span className="is-primary">↗ Send</span>
            <span>+ Buy</span>
          </div>
        </section>
        <section className="ips-dash-card ips-dash-list">
          <div className="ips-dash-head">
            <strong>Recent activity</strong>
            <span>See all</span>
          </div>
          <div className={`ips-dash-rows${fresh ? ' has-new' : ''}`}>
            <div className="ips-dash-row is-new">
              <b>Instant Buy</b>
              <em>Completed · Just now</em>
              <strong>+20,000 sats</strong>
            </div>
            {DASH_ROWS.map((r) => (
              <div key={r.t} className="ips-dash-row">
                <b>{r.t}</b>
                <em>Completed · {r.m}</em>
                <strong>{r.a}</strong>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
