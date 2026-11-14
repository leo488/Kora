import { useEffect, useRef, useState } from 'react'
import './scenes.css'
import ipaybtcLogo from '../../assets/ipaybtc-logo.svg?raw'
import d3coin from '../../assets/ipaybtc-3d/coin.webp'
import d3ring from '../../assets/ipaybtc-3d/ring.webp'
import d3gift from '../../assets/ipaybtc-3d/gift.webp'
import d3bank from '../../assets/ipaybtc-3d/bank.webp'
import d3check from '../../assets/ipaybtc-3d/check.webp'
import d3swap from '../../assets/ipaybtc-3d/swap.webp'
import capImg from '../../assets/ipaybtc-cap-2400.jpg'
import toteImg from '../../assets/ipaybtc-tote-2400.jpg'
import wallImg from '../../assets/ipaybtc-wall-2400.jpg'
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
  ['YOUR BITCOIN', 'CAN TRAVEL.', d3swap],
  ['BEFORE YOUR', 'TEA GETS COLD.', d3coin],
  ['PAY NEPA', 'IN SATS.', d3check],
  ['NO BORDER.', 'NO PERMISSION.', d3bank],
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

/* ---------- Social posts, after the Surgepay campaign pages ---------- */

type Post = { bg: string; fg: string; lines: string[]; sub?: string; obj: string }

export const POSTS: Post[] = [
  { bg: '#0a31f5', fg: '#fff778', lines: ['Your Naira', 'can’t travel.', 'Your Bitcoin can.'], obj: d3swap },
  { bg: '#fff778', fg: '#050e7f', lines: ['Buy Bitcoin', 'before your', 'tea gets cold.'], obj: d3coin },
  { bg: '#050e7f', fg: '#fff778', lines: ['Pay NEPA', 'in sats.'], sub: 'Airtime, data and light bills, straight from your Bitcoin.', obj: d3check },
  { bg: '#88c2ed', fg: '#050e7f', lines: ['No bank opening hours.', 'No border.', 'No permission.'], obj: d3bank },
  { bg: '#0a31f5', fg: '#fff', lines: ['Bitcoin was', 'never meant', 'to sit still.'], sub: 'Spend it.', obj: d3ring },
]

/** One 4:5 social post. */
export function SocialPost({ p }: { p: Post }) {
  return (
    <div className="ips-post" style={{ background: p.bg, color: p.fg }}>
      <p className="ips-post-head">
        {p.lines.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </p>
      {p.sub && <p className="ips-post-sub">{p.sub}</p>}
      <img className="ips-post-obj" src={p.obj} alt="" />
      <div className="ips-post-foot">
        <span className="ips-post-logo" dangerouslySetInnerHTML={{ __html: ipaybtcLogo }} />
        <span className="ips-post-stores">iOS · Android</span>
      </div>
    </div>
  )
}

/** The posts sliding through an Instagram-style frame. */
export function SocialCarousel() {
  const [ref, on] = useInView<HTMLDivElement>(0.2, false)
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!on || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setInterval(() => setI((v) => (v + 1) % POSTS.length), 2600)
    return () => clearInterval(t)
  }, [on])
  const loop = [...POSTS, ...POSTS, ...POSTS]
  const at = POSTS.length + i
  return (
    <div ref={ref} className="ips ips-social">
      <div className="ips-social-track" style={{ ['--at' as string]: at }}>
        {loop.map((p, k) => (
          <SocialPost key={k} p={p} />
        ))}
      </div>
      <div className="ips-social-frame" aria-hidden>
        <div className="ips-social-top">
          <span className="ips-social-avatar" dangerouslySetInnerHTML={{ __html: ipaybtcLogo }} />
          <span>
            <b>iPayBTC</b>
            <em>Lagos, Nigeria</em>
          </span>
          <i>•••</i>
        </div>
        <div className="ips-social-hole" />
        <div className="ips-social-bottom">
          <svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" /></svg>
          <svg viewBox="0 0 24 24"><path d="M20 12a8 8 0 1 1-3.2-6.4L20 4l-1 4.3A8 8 0 0 1 20 12Z" /></svg>
          <svg viewBox="0 0 24 24"><path d="M21 3 10 14M21 3l-7 18-4-7-7-4 18-7Z" /></svg>
          <span className="ips-social-dots">
            {POSTS.map((_, k) => (
              <i key={k} className={k === i ? 'is-on' : ''} />
            ))}
          </span>
          <svg viewBox="0 0 24 24"><path d="M6 3h12v18l-6-4.5L6 21V3Z" /></svg>
        </div>
      </div>
    </div>
  )
}

/** Two rows of posts drifting past each other. */
export function PostWall() {
  const row = [...POSTS, ...POSTS]
  const row2 = [...POSTS.slice(3), ...POSTS.slice(0, 3)]
  return (
    <div className="ips ips-wall">
      <div className="ips-wall-row">
        {[...row, ...row].map((p, k) => (
          <SocialPost key={k} p={p} />
        ))}
      </div>
      <div className="ips-wall-row is-back">
        {[...row2, ...row2, ...row2, ...row2].map((p, k) => (
          <SocialPost key={k} p={p} />
        ))}
      </div>
    </div>
  )
}

const ICONS: [string, string][] = [
  [d3coin, 'The iPayBTC coin'],
  [d3ring, 'A ring of iPayBTC coins'],
  [d3swap, 'Swap arrows with a coin'],
  [d3gift, 'A gift box'],
  [d3check, 'A tick'],
  [d3bank, 'A bank'],
]

/** The 3D set on a pastel board, like Surgepay's icon grid. */
export function IconGrid() {
  const [ref, on] = useInView<HTMLDivElement>(0.3, true)
  return (
    <div ref={ref} className={`ips ips-icons${on ? ' is-in' : ''}`}>
      {ICONS.map(([src, alt], k) => (
        <img key={src} src={src} alt={alt} style={{ transitionDelay: `${k * 80}ms` }} />
      ))}
    </div>
  )
}

/** One 3D object alone on a flat colour. */
export function IconTile({ icon = 'coin', bg = '#fff9c4' }: { icon?: 'coin' | 'ring'; bg?: string }) {
  return (
    <div className="ips ips-icontile" style={{ background: bg }}>
      <img src={icon === 'ring' ? d3ring : d3coin} alt={icon === 'ring' ? 'A ring of iPayBTC coins' : 'The iPayBTC coin'} />
    </div>
  )
}

/** Cap or tote on pastel, with the real wordmark placed on the fabric. */
export function Merch({ kind }: { kind: 'cap' | 'tote' }) {
  const cap = kind === 'cap'
  return (
    <div className={`ips ips-merch is-${kind}`} style={{ background: cap ? '#c5e4fa' : '#fcf8a8' }}>
      <div className="ips-merch-box">
        <img src={cap ? capImg : toteImg} alt={cap ? 'An iPayBTC cap' : 'An iPayBTC tote bag'} />
        <span className="ips-merch-logo" dangerouslySetInnerHTML={{ __html: ipaybtcLogo }} />
      </div>
    </div>
  )
}

/** A post pasted on a concrete wall. */
export function WallPoster({ post = 1 }: { post?: number }) {
  return (
    <div className="ips ips-wallposter">
      <div className="ips-merch-box">
        <img src={wallImg} alt="An iPayBTC poster taped to a wall" />
        <div className="ips-wallposter-paper">
          <SocialPost p={POSTS[post]} />
        </div>
      </div>
    </div>
  )
}
