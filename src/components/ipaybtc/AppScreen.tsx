import { useEffect, useRef, useState } from 'react'
import logo from '../../assets/ipaybtc-logo.svg?raw'
import './app-screen.css'

/* The iPayBTC app (v3, light mode) running on a phone in a still photo.
   Everything is drawn at the phone's own size, 390 × 844, and the plate that
   holds it maps that box onto the screen in the photo. A short script steps
   through one transaction and loops; CSS transitions do the moving. */

export type AppFlow = 'send' | 'buy' | 'launch'

export type Screen = 'home' | 'amount' | 'done' | 'icons' | 'splash'

interface State {
  screen: Screen
  press: string | null
  digits: number
  done: boolean
}

const START: Record<AppFlow, State> = {
  send: { screen: 'home', press: null, digits: 0, done: false },
  buy: { screen: 'home', press: null, digits: 0, done: false },
  launch: { screen: 'icons', press: null, digits: 0, done: false },
}

/** [time in ms, change] — the loop restarts after the last step. */
type Step = [number, Partial<State>]

const SCRIPT: Record<AppFlow, Step[]> = {
  send: [
    [1700, { press: 'send' }],
    [1950, { press: null, screen: 'amount' }],
    [2700, { digits: 1, press: 'k2' }],
    [2850, { press: null }],
    [3100, { digits: 2, press: 'k0' }],
    [3250, { press: null }],
    [3500, { digits: 3, press: 'k0' }],
    [3650, { press: null }],
    [3900, { digits: 4, press: 'k0' }],
    [4050, { press: null }],
    [4300, { digits: 5, press: 'k0' }],
    [4450, { press: null }],
    [5000, { press: 'cta' }],
    [5250, { press: null, screen: 'done' }],
    [7400, { press: 'close' }],
    [7600, { press: null, screen: 'home', done: true }],
    [11000, {}],
  ],
  buy: [
    [1700, { press: 'buy' }],
    [1950, { press: null, screen: 'amount' }],
    [2700, { digits: 1, press: 'k3' }],
    [2850, { press: null }],
    [3100, { digits: 2, press: 'k4' }],
    [3250, { press: null }],
    [3500, { digits: 3, press: 'k2' }],
    [3650, { press: null }],
    [3900, { digits: 4, press: 'k0' }],
    [4050, { press: null }],
    [4300, { digits: 5, press: 'k0' }],
    [4450, { press: null }],
    [5000, { press: 'cta' }],
    [5250, { press: null, screen: 'done' }],
    [7400, { press: 'close' }],
    [7600, { press: null, screen: 'home', done: true }],
    [11000, {}],
  ],
  launch: [
    [1600, { press: 'icon' }],
    [1850, { press: null, screen: 'splash' }],
    [3000, { screen: 'home' }],
    [6800, { screen: 'icons' }],
    [8600, {}],
  ],
}

/* What the keypad has typed after each key. */
const TYPED: Record<'send' | 'buy', string[]> = {
  send: ['0', '2', '20', '200', '2,000', '20,000'],
  buy: ['0', '3', '34', '342', '3,420', '34,200'],
}

const COPY = {
  send: {
    title: 'Send Bitcoin',
    unit: 'sats',
    prefix: '',
    sub: (typed: boolean) => (typed ? '≈ $22.80 · Network fee 120 sats' : 'Available 87,719 sats'),
    to: 'To Tolu Adeyemi',
    toSub: 'bc1q…8x4f · On-chain',
    cta: 'Send 20,000 sats',
    doneLabel: 'Sent',
    doneAmount: '−20,000 sats',
    doneRows: [
      ['To', 'Tolu Adeyemi'],
      ['Network fee', '120 sats'],
      ['Arrives', 'About 10 min'],
    ],
    row: { title: 'Sent BTC', meta: 'Just now', amount: '−20,000 sats', sub: 'On-chain', kind: 'out' },
  },
  buy: {
    title: 'Instant Buy',
    unit: '',
    prefix: '₦',
    sub: (typed: boolean) => (typed ? 'You get 20,000 sats · Fee ₦0' : 'Naira balance ₦45,000.00'),
    to: 'Pay with Naira account',
    toSub: 'Balance ₦45,000.00',
    cta: 'Buy Bitcoin',
    doneLabel: 'Bought',
    doneAmount: '+20,000 sats',
    doneRows: [
      ['Paid', '₦34,200.00'],
      ['Rate', '₦171,000,456 / BTC'],
      ['Fee', '₦0'],
    ],
    row: { title: 'Instant Buy', meta: 'Just now', amount: '+20,000 sats', sub: '₦34,200', kind: 'trade' },
  },
} as const

const ACTIVITY = [
  { title: 'Instant Buy', meta: 'Oct 20', amount: '+20,000 sats', sub: '₦34,200', kind: 'trade' },
  { title: 'Naira deposit', meta: 'Oct 20', amount: '+₦50,000', sub: 'Bank transfer', kind: 'in' },
  { title: 'Airtime · MTN', meta: 'Oct 18', amount: '−₦1,000', sub: 'Naira wallet', kind: 'phone' },
] as const

/** `hold` freezes the app on one screen (amount shows the full amount). */
export function AppScreen({ flow, playing = true, hold }: { flow: AppFlow; playing?: boolean; hold?: Screen }) {
  const [s, setS] = useState<State>(hold ? { ...START[flow], screen: hold, digits: hold === 'amount' ? 5 : 0 } : START[flow])
  const timers = useRef<number[]>([])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!playing || reduce || hold) return
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
  }, [flow, playing, hold])

  if (flow === 'launch') return <Launch s={s} />
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

function Glyph({ kind }: { kind: string }) {
  const p = {
    trade: 'M5 7h11l-3-3M15 13H4l3 3',
    in: 'M14 6 6 14M6 8v6h6',
    out: 'M6 14 14 6M8 6h6v6',
    phone: 'M7 3h6a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1ZM9 15h2',
  }[kind]
  return (
    <span className="ias-glyph">
      <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
        <path d={p} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

function Row({ r, className = '' }: { r: { title: string; meta: string; amount: string; sub: string; kind: string }; className?: string }) {
  return (
    <div className={`ias-row ${className}`}>
      <Glyph kind={r.kind} />
      <div className="ias-row-main">
        <strong>{r.title}</strong>
        <span>
          <em>Completed</em> · {r.meta}
        </span>
      </div>
      <div className="ias-row-end">
        <strong>{r.amount}</strong>
        <span>{r.sub}</span>
      </div>
    </div>
  )
}

function Home({ s, flow }: { s: State; flow: 'send' | 'buy' | 'launch' }) {
  const isBuy = flow === 'buy'
  const newRow = flow === 'launch' ? null : COPY[flow].row
  const balance = !s.done ? '$1,230.00' : flow === 'send' ? '$1,207.20' : '$1,252.80'
  return (
    <div className="ias-page ias-home">
      <StatusBar />
      <div className="ias-home-head">
        <strong>Your Account</strong>
        <span className="ias-head-icons">
          <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
            <path d="M4 8V5a1 1 0 0 1 1-1h3M14 4h3a1 1 0 0 1 1 1v3M18 14v3a1 1 0 0 1-1 1h-3M8 18H5a1 1 0 0 1-1-1v-3M7 11h8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
            <path d="M6 15V10a5 5 0 0 1 10 0v5l1.5 2h-13L6 15ZM9 19a2 2 0 0 0 4 0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      <div className="ias-balance">
        <span className="ias-label">Total balance</span>
        <strong key={balance} className="ias-balance-num">
          {balance}
        </strong>
        <span className="ias-faint">1 BTC = $114,000.30</span>
      </div>
      <div className="ias-actions">
        {isBuy ? (
          <>
            <button className={`ias-btn is-primary${s.press === 'buy' ? ' is-pressed' : ''}`}>+ Buy</button>
            <button className="ias-btn">↙ Receive</button>
          </>
        ) : (
          <>
            <button className="ias-btn">↙ Receive</button>
            <button className={`ias-btn is-primary${s.press === 'send' ? ' is-pressed' : ''}`}>↗ Send</button>
          </>
        )}
      </div>
      <div className="ias-section-head">
        <strong>Recent activity</strong>
        <span>See all</span>
      </div>
      <div className={`ias-list${s.done ? ' has-new' : ''}`}>
        {newRow && <Row r={newRow} className="ias-row-new" />}
        {ACTIVITY.map((r) => (
          <Row key={r.title} r={r} />
        ))}
      </div>
      <nav className="ias-tabs" aria-hidden>
        {['Home', 'Wallet', 'Trade', 'Explore', 'Profile'].map((t, i) => (
          <span key={t} className={i === 0 ? 'is-on' : ''}>
            <i />
            {t}
          </span>
        ))}
      </nav>
      <span className="ias-homebar" />
    </div>
  )
}

function Transaction({ flow, s }: { flow: 'send' | 'buy'; s: State }) {
  const c = COPY[flow]
  const typed = TYPED[flow][s.digits]
  return (
    <div className="ias" data-screen={s.screen}>
      <Home s={s} flow={flow} />

      <div className="ias-page ias-amount">
        <StatusBar />
        <div className="ias-bar">
          <span className="ias-back">←</span>
          <strong>{c.title}</strong>
        </div>
        <div className="ias-to">
          <Glyph kind={flow === 'send' ? 'out' : 'in'} />
          <div>
            <strong>{c.to}</strong>
            <span>{c.toSub}</span>
          </div>
        </div>
        <div className="ias-amount-big">
          <strong className={s.digits === 0 ? 'is-empty' : ''}>
            {c.prefix}
            {typed}
            {c.unit && <small> {c.unit}</small>}
          </strong>
          <span>{c.sub(s.digits === 5)}</span>
        </div>
        <div className="ias-keys">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '·', '0', '⌫'].map((k) => (
            <span key={k} className={s.press === `k${k}` ? 'is-pressed' : ''}>
              {k}
            </span>
          ))}
        </div>
        <button className={`ias-btn is-primary ias-cta${s.digits === 5 ? '' : ' is-off'}${s.press === 'cta' ? ' is-pressed' : ''}`}>
          {c.cta}
        </button>
        <span className="ias-homebar" />
      </div>

      <div className="ias-page ias-done">
        <StatusBar />
        <div className="ias-done-body">
          <span className="ias-check">
            <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden>
              <path d="M11 21l6 6 12-13" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="ias-done-label">{c.doneLabel}</span>
          <strong className="ias-done-amount">{c.doneAmount}</strong>
          <div className="ias-sheet">
            {c.doneRows.map(([k, v]) => (
              <div key={k}>
                <span>{k}</span>
                <strong>{v}</strong>
              </div>
            ))}
          </div>
        </div>
        <button className={`ias-btn is-primary ias-cta${s.press === 'close' ? ' is-pressed' : ''}`}>Done</button>
        <span className="ias-homebar" />
      </div>
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
