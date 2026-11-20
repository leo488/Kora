import { useEffect, useRef, useState } from 'react'
import logo from '../../assets/ipaybtc-logo.svg?raw'
import './app-screen.css'
import { SwapApp } from './SwapApp'

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
    [16000, { screen: 'icons' }],
    [17800, {}],
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

const ICONS: Array<{ name: string; svg: string }> = [
  { name: 'Camera', svg: '<defs><linearGradient id="gcam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e3e3e8"/><stop offset="1" stop-color="#9a9aa1"/></linearGradient></defs><rect width="60" height="60" fill="url(#gcam)"/><rect x="8" y="17" width="44" height="30" rx="6" fill="#2c2c2e"/><rect x="22" y="13" width="16" height="6" rx="2" fill="#2c2c2e"/><circle cx="30" cy="32" r="10" fill="#e5e5ea"/><circle cx="30" cy="32" r="7" fill="#1c1c1e"/><circle cx="27.5" cy="29.5" r="2" fill="#5a5a66"/><circle cx="45" cy="22" r="1.8" fill="#ffd60a"/>' },
  { name: 'Photos', svg: '<rect width="60" height="60" fill="#fff"/><ellipse cx="30" cy="18" rx="6" ry="11" fill="#fbc02d" opacity=".85" transform="rotate(0 30 30)"/><ellipse cx="30" cy="18" rx="6" ry="11" fill="#f57c00" opacity=".85" transform="rotate(45 30 30)"/><ellipse cx="30" cy="18" rx="6" ry="11" fill="#e53935" opacity=".85" transform="rotate(90 30 30)"/><ellipse cx="30" cy="18" rx="6" ry="11" fill="#d81b60" opacity=".85" transform="rotate(135 30 30)"/><ellipse cx="30" cy="18" rx="6" ry="11" fill="#8e24aa" opacity=".85" transform="rotate(180 30 30)"/><ellipse cx="30" cy="18" rx="6" ry="11" fill="#1e88e5" opacity=".85" transform="rotate(225 30 30)"/><ellipse cx="30" cy="18" rx="6" ry="11" fill="#00acc1" opacity=".85" transform="rotate(270 30 30)"/><ellipse cx="30" cy="18" rx="6" ry="11" fill="#43a047" opacity=".85" transform="rotate(315 30 30)"/>' },
  { name: 'Mail', svg: '<defs><linearGradient id="gmail" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#21b8ff"/><stop offset="1" stop-color="#0a6cff"/></linearGradient></defs><rect width="60" height="60" fill="url(#gmail)"/><rect x="11" y="18" width="38" height="25" rx="3" fill="#fff"/><path d="M12 20l18 13 18-13" fill="none" stroke="#9fd2ff" stroke-width="2"/>' },
  { name: 'Notes', svg: '<rect width="60" height="60" fill="#fff"/><defs><linearGradient id="gnote" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe27a"/><stop offset="1" stop-color="#ffcc02"/></linearGradient></defs><rect width="60" height="16" fill="url(#gnote)"/><path d="M8 26h44M8 34h44M8 42h44M8 50h44" stroke="#dcdce0" stroke-width="1.2"/><path d="M8 16h44" stroke="#d6a800" stroke-width="1" stroke-dasharray="2 2"/>' },
  { name: 'Clock', svg: '<rect width="60" height="60" fill="#000"/><circle cx="30" cy="30" r="24" fill="#fff"/><rect x="29.4" y="8" width="1.2" height="4" fill="#000" transform="rotate(0 30 30)"/><rect x="29.4" y="8" width="1.2" height="4" fill="#000" transform="rotate(30 30 30)"/><rect x="29.4" y="8" width="1.2" height="4" fill="#000" transform="rotate(60 30 30)"/><rect x="29.4" y="8" width="1.2" height="4" fill="#000" transform="rotate(90 30 30)"/><rect x="29.4" y="8" width="1.2" height="4" fill="#000" transform="rotate(120 30 30)"/><rect x="29.4" y="8" width="1.2" height="4" fill="#000" transform="rotate(150 30 30)"/><rect x="29.4" y="8" width="1.2" height="4" fill="#000" transform="rotate(180 30 30)"/><rect x="29.4" y="8" width="1.2" height="4" fill="#000" transform="rotate(210 30 30)"/><rect x="29.4" y="8" width="1.2" height="4" fill="#000" transform="rotate(240 30 30)"/><rect x="29.4" y="8" width="1.2" height="4" fill="#000" transform="rotate(270 30 30)"/><rect x="29.4" y="8" width="1.2" height="4" fill="#000" transform="rotate(300 30 30)"/><rect x="29.4" y="8" width="1.2" height="4" fill="#000" transform="rotate(330 30 30)"/><path d="M30 30V15M30 30l9 6" stroke="#000" stroke-width="2.6" stroke-linecap="round"/><path d="M30 30l-6 14" stroke="#ff9500" stroke-width="1.2"/><circle cx="30" cy="30" r="1.8" fill="#ff9500"/>' },
  { name: 'Maps', svg: '<defs><linearGradient id="gmap" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3f0e6"/><stop offset="1" stop-color="#e3ecd8"/></linearGradient></defs><rect width="60" height="60" fill="url(#gmap)"/><path d="M0 44L60 16" stroke="#fff" stroke-width="8"/><path d="M0 44L60 16" stroke="#ffd34d" stroke-width="3"/><path d="M18 0v60" stroke="#fff" stroke-width="5"/><rect x="36" y="34" width="24" height="26" fill="#bfe3a6"/><path d="M30 20l9 20-9-5-9 5z" fill="#0a84ff"/>' },
  { name: 'Music', svg: '<defs><linearGradient id="gmus" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff6f8a"/><stop offset="1" stop-color="#fa233b"/></linearGradient></defs><rect width="60" height="60" fill="url(#gmus)"/><path d="M25 40V18l17-4v22" fill="none" stroke="#fff" stroke-width="3.2" stroke-linejoin="round"/><circle cx="21" cy="40" r="5" fill="#fff"/><circle cx="38" cy="36" r="5" fill="#fff"/>' },
  { name: 'Weather', svg: '<defs><linearGradient id="gwx" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1f7dff"/><stop offset="1" stop-color="#68c9ff"/></linearGradient></defs><rect width="60" height="60" fill="url(#gwx)"/><circle cx="24" cy="24" r="9" fill="#ffd60a"/><path d="M20 44h22a7 7 0 0 0 0-14 10 10 0 0 0-19 3 6 6 0 0 0-3 11z" fill="#fff"/>' },
  { name: 'Calendar', svg: '<rect width="60" height="60" fill="#fff"/><text x="30" y="19" text-anchor="middle" font-family="-apple-system,Helvetica,Arial" font-weight="600" font-size="10" fill="#ff3b30">SUNDAY</text><text x="30" y="48" text-anchor="middle" font-family="-apple-system,Helvetica,Arial" font-weight="300" font-size="30" fill="#111">15</text>' },
  { name: 'Settings', svg: '<defs><linearGradient id="gset" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a9adb5"/><stop offset="1" stop-color="#6e727b"/></linearGradient></defs><rect width="60" height="60" fill="url(#gset)"/><rect x="27" y="8" width="6" height="10" rx="1.5" fill="#3a3b40" transform="rotate(0 30 30)"/><rect x="27" y="8" width="6" height="10" rx="1.5" fill="#3a3b40" transform="rotate(45 30 30)"/><rect x="27" y="8" width="6" height="10" rx="1.5" fill="#3a3b40" transform="rotate(90 30 30)"/><rect x="27" y="8" width="6" height="10" rx="1.5" fill="#3a3b40" transform="rotate(135 30 30)"/><rect x="27" y="8" width="6" height="10" rx="1.5" fill="#3a3b40" transform="rotate(180 30 30)"/><rect x="27" y="8" width="6" height="10" rx="1.5" fill="#3a3b40" transform="rotate(225 30 30)"/><rect x="27" y="8" width="6" height="10" rx="1.5" fill="#3a3b40" transform="rotate(270 30 30)"/><rect x="27" y="8" width="6" height="10" rx="1.5" fill="#3a3b40" transform="rotate(315 30 30)"/><circle cx="30" cy="30" r="15" fill="#3a3b40"/><circle cx="30" cy="30" r="10" fill="#8d9098"/><circle cx="30" cy="30" r="5" fill="#3a3b40"/>' },
  { name: 'Messages', svg: '<defs><linearGradient id="gmsg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6ff26a"/><stop offset="1" stop-color="#22c33f"/></linearGradient></defs><rect width="60" height="60" fill="url(#gmsg)"/><path d="M30 13c-11 0-19 7-19 15 0 5 3 9 7 12-1 3-3 5-5 6 4 0 8-1 11-3 2 .4 4 .6 6 .6 11 0 19-7 19-15s-8-15-19-15z" fill="#fff"/>' },
  { name: 'Files', svg: '<rect width="60" height="60" fill="#fff"/><defs><linearGradient id="gfold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5ac8fa"/><stop offset="1" stop-color="#1a8cff"/></linearGradient></defs><path d="M10 20a3 3 0 0 1 3-3h11l4 4h19a3 3 0 0 1 3 3v19a3 3 0 0 1-3 3H13a3 3 0 0 1-3-3z" fill="url(#gfold)"/>' },
  { name: 'Wallet', svg: '<rect width="60" height="60" fill="#000"/><rect x="11" y="13" width="38" height="28" rx="4" fill="#2f2f33"/><rect x="11" y="18" width="38" height="8" fill="#0a84ff"/><rect x="11" y="24" width="38" height="8" fill="#ffcc00"/><rect x="11" y="30" width="38" height="8" fill="#34c759"/><rect x="11" y="36" width="38" height="12" rx="3" fill="#ff3b30"/><path d="M8 40h44v10a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4z" fill="#d2d2d7"/>' },
  { name: 'Health', svg: '<rect width="60" height="60" fill="#fff"/><defs><linearGradient id="ghl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff6fa8"/><stop offset="1" stop-color="#ff2d55"/></linearGradient></defs><path d="M48 14c-5-4-12-2-18 4-6-6-13-8-18-4" fill="none"/><path d="M30 47S12 36 12 24a9 9 0 0 1 18-3 9 9 0 0 1 18 3c0 12-18 23-18 23z" fill="url(#ghl)" transform="translate(9 9) scale(.7)"/>' },
  { name: 'Books', svg: '<defs><linearGradient id="gbk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffa733"/><stop offset="1" stop-color="#ff7a00"/></linearGradient></defs><rect width="60" height="60" fill="url(#gbk)"/><path d="M30 20c-5-4-12-4-17-2v24c5-2 12-2 17 2 5-4 12-4 17-2V18c-5-2-12-2-17 2z" fill="#fff"/><path d="M30 20v24" stroke="#ff8a00" stroke-width="1.5"/>' },
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
              <i><svg viewBox="0 0 60 60" aria-hidden dangerouslySetInnerHTML={{ __html: ic.svg }} /></i>
              {ic.name}
            </span>
          ))}
        </div>
        <div className="ias-dock">
          {ICONS.slice(10, 14).map((ic) => (
            <i key={ic.name}><svg viewBox="0 0 60 60" aria-hidden dangerouslySetInnerHTML={{ __html: ic.svg }} /></i>
          ))}
        </div>
      </div>
      <div className="ias-page ias-splash">
        {s.screen === 'icons' ? <i dangerouslySetInnerHTML={{ __html: logo }} /> : <SwapApp playing tone="dark" />}
      </div>
    </div>
  )
}
