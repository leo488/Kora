import { useEffect, useRef, useState } from 'react'
import logo from '../../assets/ipaybtc-logo.svg?raw'
import coin from '../../assets/ipaybtc3d/o1.webp'
import coins from '../../assets/ipaybtc3d/o2.webp'
import plane from '../../assets/ipaybtc3d/o8.webp'
import './app-screen.css'

/* The iPayBTC app running on a phone. Drawn at the phone's own size,
   390 × 844; whatever holds it scales or maps that box onto a screen.
   Clean, light wallet screens after the Wise app: one big bold number per
   screen, round keys, our 3D coin, real transactions only. A short script
   steps through one transaction and loops; CSS transitions do the moving. */

export type AppFlow = 'send' | 'buy' | 'launch' | 'wallet' | 'done'

type Screen = 'home' | 'amount' | 'done' | 'icons' | 'splash'

interface State {
  screen: Screen
  press: string | null
  digits: number
  done: boolean
}

const BASE: State = { screen: 'home', press: null, digits: 0, done: false }
const START: Record<AppFlow, State> = {
  send: BASE,
  buy: BASE,
  wallet: BASE,
  done: { ...BASE, screen: 'done', digits: 5 },
  launch: { ...BASE, screen: 'icons' },
}

/** [time in ms, change]. The loop restarts after the last step. */
type Step = [number, Partial<State>]

const typing = (keys: string[], from: number): Step[] =>
  keys.flatMap((k, i): Step[] => [
    [from + i * 380, { digits: i + 1, press: `k${k}` }],
    [from + i * 380 + 150, { press: null }],
  ])

const txn = (keys: string[], action: string): Step[] => [
  [1500, { press: action }],
  [1750, { press: null, screen: 'amount' }],
  ...typing(keys, 2400),
  [4500, { press: 'cta' }],
  [4750, { press: null, screen: 'done' }],
  [7200, { press: 'close' }],
  [7400, { press: null, screen: 'home', done: true }],
  [10600, {}],
]

const SCRIPT: Record<AppFlow, Step[]> = {
  send: txn(['2', '0', '0', '0', '0'], 'send'),
  buy: txn(['5', '0', '0', '0', '0'], 'buy'),
  wallet: [
    [2600, { done: true }],
    [6000, {}],
  ],
  done: [[6000, {}]],
  launch: [
    [1500, { press: 'icon' }],
    [1750, { press: null, screen: 'splash' }],
    [2900, { screen: 'home' }],
    [6600, { screen: 'icons' }],
    [8400, {}],
  ],
}

/* What the keypad shows after each key. */
const TYPED: Record<'send' | 'buy', string[]> = {
  send: ['0', '2', '20', '200', '2,000', '20,000'],
  buy: ['0', '5', '50', '500', '5,000', '50,000'],
}

const COPY = {
  send: {
    head: 'Send to Tolu',
    unit: 'SATS',
    prefix: '',
    note: (full: boolean) => (full ? '≈ ₦32,400 · Fee 0 sats' : 'You have 87,719 sats'),
    cta: 'Send',
    art: plane,
    title: ['SENT IN', 'SECONDS'],
    body: '20,000 sats are on their way to Tolu. Lightning fast, no fees.',
    row: { title: 'Tolu Adeyemi', sub: 'Sent · Lightning', amount: '−20,000 sats', kind: 'out' },
  },
  buy: {
    head: 'Buy Bitcoin',
    unit: 'NGN',
    prefix: '₦',
    note: (full: boolean) => (full ? 'You get 30,840 sats · Fee ₦0' : '1 BTC = ₦162,120,000'),
    cta: 'Buy',
    art: coins,
    title: ['SATS', 'ARE IN'],
    body: '30,840 sats just landed in your Bitcoin wallet. Just like that.',
    row: { title: 'Bought Bitcoin', sub: 'From Naira wallet', amount: '+30,840 sats', kind: 'buy' },
  },
} as const

const ACTIVITY = [
  { title: 'Ada Okafor', sub: 'Received · Lightning', amount: '+12,500 sats', kind: 'in' },
  { title: 'Bought Bitcoin', sub: 'From Naira wallet', amount: '+61,200 sats', kind: 'buy' },
  { title: 'MTN Airtime', sub: 'Paid · Naira', amount: '−₦2,000', kind: 'out' },
] as const

export function AppScreen({ flow, playing = true }: { flow: AppFlow; playing?: boolean }) {
  const [s, setS] = useState<State>(START[flow])
  const timers = useRef<number[]>([])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!playing || reduce) return
    const steps = SCRIPT[flow]
    const loop = () => {
      setS(START[flow])
      for (const [at, change] of steps) {
        timers.current.push(window.setTimeout(() => setS((p) => ({ ...p, ...change })), at))
      }
      timers.current.push(window.setTimeout(loop, steps[steps.length - 1][0]))
    }
    loop()
    const list = timers.current
    return () => {
      list.forEach(clearTimeout)
      list.length = 0
    }
  }, [flow, playing])

  if (flow === 'launch') return <Launch s={s} />
  if (flow === 'wallet')
    return (
      <div className="ias" data-screen="home">
        <Home s={s} flow="buy" />
      </div>
    )
  if (flow === 'done')
    return (
      <div className="ias" data-screen="done">
        <Done flow="buy" s={s} />
      </div>
    )
  return <Transaction flow={flow} s={s} />
}

/* ---------- Pieces ---------- */

function StatusBar({ light = false }: { light?: boolean }) {
  return (
    <div className={`ias-status${light ? ' is-light' : ''}`}>
      <span>9:41</span>
      <span className="ias-island" />
      <span className="ias-status-icons">
        <svg width="18" height="11" viewBox="0 0 18 11" aria-hidden>
          <rect x="0" y="7" width="3" height="4" rx="1" />
          <rect x="5" y="5" width="3" height="6" rx="1" />
          <rect x="10" y="2.5" width="3" height="8.5" rx="1" />
          <rect x="15" y="0" width="3" height="11" rx="1" />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" aria-hidden>
          <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" fill="none" stroke="currentColor" opacity="0.4" />
          <rect x="2" y="2" width="18" height="8" rx="2" />
          <rect x="23" y="4" width="1.5" height="4" rx="0.75" opacity="0.4" />
        </svg>
      </span>
    </div>
  )
}

const ICON: Record<string, string> = {
  out: 'M10 16V4M5 9l5-5 5 5',
  in: 'M10 4v12M5 11l5 5 5-5',
  buy: 'M10 4v12M4 10h12',
  swap: 'M4 7h12l-3-3M16 13H4l3 3',
  home: 'M3 9l7-6 7 6v8H3z',
  wallet: 'M3 6h14v11H3zM3 9h14M13 13h1',
  card: 'M2 5h16v10H2zM2 8h16',
  more: 'M4 4h5v5H4zM11 4h5v5h-5zM4 11h5v5H4zM11 11h5v5h-5z',
  bell: 'M5 14V9a5 5 0 0 1 10 0v5l1.5 2h-13zM8 18a2 2 0 0 0 4 0',
  back: 'M12 4l-6 6 6 6',
  close: 'M5 5l10 10M15 5L5 15',
}

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden>
      <path d={ICON[name]} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Row({ r, className = '' }: { r: { title: string; sub: string; amount: string; kind: string }; className?: string }) {
  return (
    <div className={`ias-row ${className}`}>
      <span className={`ias-glyph is-${r.kind}`}>
        {r.kind === 'buy' ? <img src={coin} alt="" /> : <Icon name={r.kind} size={18} />}
      </span>
      <div className="ias-row-main">
        <strong>{r.title}</strong>
        <span>{r.sub}</span>
      </div>
      <strong className={`ias-row-amount${r.amount.startsWith('+') ? ' is-plus' : ''}`}>{r.amount}</strong>
    </div>
  )
}

function Home({ s, flow }: { s: State; flow: 'send' | 'buy' | 'launch' }) {
  const newRow = flow === 'launch' ? null : COPY[flow].row
  const sats = !s.done ? '87,719' : flow === 'send' ? '67,719' : '118,559'
  return (
    <div className="ias-page ias-home">
      <StatusBar />
      <div className="ias-home-head">
        <span className="ias-avatar">TA</span>
        <span className="ias-hi">Hi, Tolu</span>
        <span className="ias-round">
          <Icon name="bell" />
        </span>
      </div>
      <div className="ias-balance">
        <span className="ias-label">Bitcoin balance</span>
        <strong key={sats} className="ias-balance-num">
          {sats} <small>SATS</small>
        </strong>
        <span className="ias-faint">≈ ₦{!s.done ? '142,210' : flow === 'send' ? '109,790' : '192,210'}</span>
      </div>
      <div className="ias-wallets">
        <div className="ias-wallet is-btc">
          <img src={coin} alt="" />
          <span>Bitcoin</span>
          <strong>{sats} sats</strong>
        </div>
        <div className="ias-wallet">
          <span className="ias-naira">₦</span>
          <span>Naira</span>
          <strong>{s.done && flow === 'buy' ? '₦45,000.00' : '₦95,000.00'}</strong>
        </div>
      </div>
      <div className="ias-actions">
        {[
          ['buy', 'Buy'],
          ['out', 'Send'],
          ['in', 'Receive'],
          ['swap', 'Swap'],
        ].map(([k, label]) => {
          const key = k === 'out' ? 'send' : k
          return (
            <span key={k} className={`ias-action${s.press === key ? ' is-pressed' : ''}`}>
              <i>
                <Icon name={k} size={22} />
              </i>
              {label}
            </span>
          )
        })}
      </div>
      <div className="ias-section-head">
        <strong>Activity</strong>
        <span>See all</span>
      </div>
      <div className={`ias-list${s.done ? ' has-new' : ''}`}>
        {newRow && <Row r={newRow} className="ias-row-new" />}
        {ACTIVITY.map((r) => (
          <Row key={r.title} r={r} />
        ))}
      </div>
      <nav className="ias-tabs" aria-hidden>
        {[
          ['home', 'Home'],
          ['wallet', 'Wallets'],
          ['out', 'Send'],
          ['card', 'Card'],
          ['more', 'More'],
        ].map(([k, t], i) => (
          <span key={t} className={`${i === 0 ? 'is-on' : ''}${k === 'out' ? ' is-send' : ''}`}>
            <i>
              <Icon name={k} size={k === 'out' ? 20 : 22} />
            </i>
            {t}
          </span>
        ))}
      </nav>
      <span className="ias-homebar" />
    </div>
  )
}

function Done({ flow, s }: { flow: 'send' | 'buy'; s: State }) {
  const c = COPY[flow]
  return (
    <div className="ias-page ias-done">
      <StatusBar />
      <span className="ias-round ias-close">
        <Icon name="close" size={18} />
      </span>
      <div className="ias-done-body">
        <img className="ias-done-art" src={c.art} alt="" />
        <strong className="ias-display">
          {c.title[0]}
          <br />
          {c.title[1]}
        </strong>
        <p>{c.body}</p>
      </div>
      <button className={`ias-btn is-primary ias-cta${s.press === 'close' ? ' is-pressed' : ''}`}>Done</button>
      <span className="ias-homebar" />
    </div>
  )
}

function Transaction({ flow, s }: { flow: 'send' | 'buy'; s: State }) {
  const c = COPY[flow]
  const typed = TYPED[flow][s.digits]
  const full = s.digits === 5
  return (
    <div className={`ias is-${flow}`} data-screen={s.screen}>
      <Home s={s} flow={flow} />

      <div className="ias-page ias-amount">
        <StatusBar />
        <div className="ias-bar">
          <span className="ias-round">
            <Icon name="back" size={18} />
          </span>
        </div>
        <div className="ias-panel">
          <div className="ias-panel-head">
            <span>{c.head}</span>
            <span>{c.unit}</span>
          </div>
          <strong className={`ias-panel-num${s.digits === 0 ? ' is-empty' : ''}`}>
            {c.prefix}
            {typed}
          </strong>
          <span className="ias-panel-note">{c.note(full)}</span>
        </div>
        <div className="ias-keys">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '→'].map((k) => (
            <span
              key={k}
              className={`${s.press === `k${k}` ? 'is-pressed' : ''}${k === '→' ? ' is-go' : ''}${k === '→' && full ? ' is-ready' : ''}${k === '→' && s.press === 'cta' ? ' is-pressed' : ''}`}
            >
              {k === '→' ? <Icon name="out" size={26} /> : k}
            </span>
          ))}
        </div>
        <span className="ias-homebar" />
      </div>

      <Done flow={flow} s={s} />
    </div>
  )
}

const ICONS: Array<{ name: string; bg: string; fg: string; d: string }> = [
  { name: 'Camera', bg: '#2B2F3A', fg: '#E9EAEE', d: 'M8 13h24v16H8zM15 13l2-3h6l2 3M20 25a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z' },
  { name: 'Photos', bg: '#FFFFFF', fg: '#F5BF0F', d: 'M20 9v22M9 20h22M12 12l16 16M28 12 12 28' },
  { name: 'Mail', bg: '#4DA3FF', fg: '#FFFFFF', d: 'M9 13h22v14H9zM9 13l11 8 11-8' },
  { name: 'Notes', bg: '#F5E27A', fg: '#0B0F2E', d: 'M11 15h18M11 20h18M11 25h12' },
  { name: 'Clock', bg: '#0B0F2E', fg: '#FFFFFF', d: 'M20 31a11 11 0 1 0 0-22 11 11 0 0 0 0 22ZM20 14v6l4 3' },
  { name: 'Maps', bg: '#88C2ED', fg: '#050E7F', d: 'M10 12l7-2 6 2 7-2v18l-7 2-6-2-7 2zM17 10v18M23 12v18' },
  { name: 'Music', bg: '#FF5A36', fg: '#FFFFFF', d: 'M16 27V13l12-3v14M16 27a3 3 0 1 1-3-3 3 3 0 0 1 3 3ZM28 24a3 3 0 1 1-3-3 3 3 0 0 1 3 3Z' },
  { name: 'Weather', bg: '#4DA3FF', fg: '#FFF778', d: 'M17 17a4 4 0 1 0 0-.1M14 27h13a4 4 0 0 0 0-8 6 6 0 0 0-11 2 3 3 0 0 0-2 6Z' },
  { name: 'Calendar', bg: '#FFFFFF', fg: '#FF5A36', d: 'M11 12h18v17H11zM11 17h18M16 10v4M24 10v4' },
  { name: 'Settings', bg: '#8A8FA3', fg: '#FFFFFF', d: 'M20 25a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM20 8v4M20 28v4M8 20h4M28 20h4M11.5 11.5l3 3M25.5 25.5l3 3M28.5 11.5l-3 3M14.5 25.5l-3 3' },
  { name: 'Messages', bg: '#0D8A5F', fg: '#FFFFFF', d: 'M10 18c0-4 4-7 10-7s10 3 10 7-4 7-10 7l-6 4v-5c-2-1-4-3-4-6Z' },
  { name: 'Files', bg: '#FFFFFF', fg: '#0A31F5', d: 'M10 13h8l2 2h10v13H10z' },
  { name: 'Wallet', bg: '#0B0F2E', fg: '#F5BF0F', d: 'M10 14h20v14H10zM10 18h20M24 23h3' },
  { name: 'Health', bg: '#FFFFFF', fg: '#FF8EC6', d: 'M20 29s-9-5-9-11a5 5 0 0 1 9-2 5 5 0 0 1 9 2c0 6-9 11-9 11Z' },
  { name: 'Books', bg: '#FF8A00', fg: '#FFFFFF', d: 'M11 12h8v17h-8zM21 12h8v17h-8z' },
]

function Launch({ s }: { s: State }) {
  return (
    <div className="ias ias-launch" data-screen={s.screen}>
      <div className="ias-page ias-springboard">
        <StatusBar light />
        <div className="ias-grid">
          <span className={`ias-app ias-app-ipay${s.press === 'icon' ? ' is-pressed' : ''}`}>
            <i dangerouslySetInnerHTML={{ __html: logo }} />
            iPayBTC
          </span>
          {ICONS.map((ic) => (
            <span key={ic.name} className="ias-app">
              <i style={{ background: ic.bg, color: ic.fg }}>
                <svg viewBox="0 0 40 40" aria-hidden>
                  <path d={ic.d} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </i>
              {ic.name}
            </span>
          ))}
        </div>
        <div className="ias-dock">
          {ICONS.slice(10, 14).map((ic) => (
            <i key={ic.name} style={{ background: ic.bg, color: ic.fg }}>
              <svg viewBox="0 0 40 40" aria-hidden>
                <path d={ic.d} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </i>
          ))}
        </div>
      </div>
      <div className="ias-page ias-splash">
        <i dangerouslySetInnerHTML={{ __html: logo }} />
      </div>
      <Home s={s} flow="launch" />
    </div>
  )
}

/* ---------- Floating components for photos and the UI board ---------- */

/** The send keypad on its own, typing an amount, like a card lifted out of the app. */
export function KeypadCard({ playing = true }: { playing?: boolean }) {
  const [d, setD] = useState(0)
  const [press, setPress] = useState<string | null>(null)
  useEffect(() => {
    if (!playing || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setD(5)
      return
    }
    const keys = ['2', '0', '0', '0', '0']
    const t: number[] = []
    const loop = () => {
      setD(0)
      keys.forEach((k, i) => {
        t.push(window.setTimeout(() => (setD(i + 1), setPress(k + i)), 900 + i * 420))
        t.push(window.setTimeout(() => setPress(null), 900 + i * 420 + 160))
      })
      t.push(window.setTimeout(() => setPress('go'), 3600))
      t.push(window.setTimeout(() => setPress(null), 3800))
      t.push(window.setTimeout(loop, 6200))
    }
    loop()
    return () => t.forEach(clearTimeout)
  }, [playing])
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '→']
  const typedKeys = ['2', '0', '0', '0', '0']
  return (
    <div className="ias-kcard">
      <div className="ias-panel">
        <div className="ias-panel-head">
          <span>Send to Tolu</span>
          <span>SATS</span>
        </div>
        <strong className={`ias-panel-num${d === 0 ? ' is-empty' : ''}`}>{TYPED.send[d]}</strong>
      </div>
      <div className="ias-keys">
        {keys.map((k) => {
          const hit = press !== null && press.startsWith(k) && typedKeys[Number(press.slice(1))] === k
          return (
            <span key={k} className={`${hit ? 'is-pressed' : ''}${k === '→' ? ' is-go' : ''}${k === '→' && d === 5 ? ' is-ready' : ''}${k === '→' && press === 'go' ? ' is-pressed' : ''}`}>
              {k === '→' ? <Icon name="out" size={24} /> : k}
            </span>
          )
        })}
      </div>
    </div>
  )
}

/** A wallet card whose balance counts up as sats arrive. */
export function ReceivedCard({ playing = true }: { playing?: boolean }) {
  const [on, setOn] = useState(false)
  useEffect(() => {
    if (!playing || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOn(true)
      return
    }
    const t: number[] = []
    const loop = () => {
      setOn(false)
      t.push(window.setTimeout(() => setOn(true), 1200))
      t.push(window.setTimeout(loop, 6000))
    }
    loop()
    return () => t.forEach(clearTimeout)
  }, [playing])
  return (
    <div className={`ias-rcard${on ? ' is-on' : ''}`}>
      <div className="ias-rcard-top">
        <img src={coin} alt="" />
        <div>
          <span>Bitcoin wallet</span>
          <strong>{on ? '118,559' : '87,719'} sats</strong>
        </div>
      </div>
      <div className="ias-rcard-row">
        <span className="ias-glyph is-in">
          <Icon name="in" size={18} />
        </span>
        <div className="ias-row-main">
          <strong>From Ada Okafor</strong>
          <span>Lightning · Just now</span>
        </div>
        <strong className="ias-row-amount is-plus">+30,840 sats</strong>
      </div>
    </div>
  )
}
