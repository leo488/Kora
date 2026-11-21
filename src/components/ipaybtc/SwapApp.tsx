import { useEffect, useRef, useState } from 'react'
import logo from '../../assets/ipaybtc-logo.svg?raw'
import btc from '../../assets/ipaybtc-app/btc.svg'
import usdt from '../../assets/ipaybtc-app/stablecoin.svg'
import { useTheme } from '../../theme/theme'
import './swap-app.css'

/* The iPayBTC app, dark direction (v3 + Barlow Condensed), running a full
   Stablecoin → Bitcoin swap on a loop: the app opens, the balance counts up,
   the user swaps 100 USDT, confirms, enters a PIN, waits for it to process,
   sees it done, opens the receipt, and lands back on Home with the new
   balances. Drawn at the phone's own 390 × 844 points. */

type Screen = 'splash' | 'home' | 'swap' | 'done'
type Sheet = null | 'confirm' | 'pin' | 'loading' | 'receipt'

interface State {
  screen: Screen
  sheet: Sheet
  press: string | null
  digits: number
  pin: number
  swapped: boolean
  /** Bumps every loop so Home replays its entrance. */
  run: number
}

const START: State = { screen: 'splash', sheet: null, press: null, digits: 0, pin: 0, swapped: false, run: 0 }

/** [time in ms, change]. The loop restarts after the last step. */
const SCRIPT: Array<[number, Partial<State>]> = [
  [1300, { screen: 'home' }],
  [4600, { press: 'usdt' }],
  [4850, { press: null, screen: 'swap' }],
  [5700, { digits: 1, press: 'k1' }],
  [5850, { press: null }],
  [6150, { digits: 2, press: 'k0' }],
  [6300, { press: null }],
  [6600, { digits: 3, press: 'k0' }],
  [6750, { press: null }],
  [7500, { press: 'review' }],
  [7750, { press: null, sheet: 'confirm' }],
  [9300, { press: 'confirm' }],
  [9550, { press: null, sheet: 'pin' }],
  [10200, { pin: 1, press: 'p4' }],
  [10350, { press: null }],
  [10600, { pin: 2, press: 'p7' }],
  [10750, { press: null }],
  [11000, { pin: 3, press: 'p2' }],
  [11150, { press: null }],
  [11400, { pin: 4, press: 'p9' }],
  [11550, { press: null }],
  [11800, { sheet: 'loading' }],
  [13600, { sheet: null, screen: 'done', swapped: true }],
  [15400, { press: 'receipt' }],
  [15650, { press: null, sheet: 'receipt' }],
  [18600, { press: 'close' }],
  [18850, { press: null, sheet: null, screen: 'home' }],
  [22500, {}],
]

const TYPED = ['0', '1', '10', '100']

export function SwapApp({ playing = true, onDone, tone }: { playing?: boolean; onDone?: () => void; tone?: 'light' | 'dark' }) {
  /* The phone follows the site (dark app on the dark site, light on light)
     unless the plate fixes a tone. */
  const site = useTheme().theme
  const theme = tone ?? site
  const [s, setS] = useState<State>(START)
  const timers = useRef<number[]>([])
  const doneRef = useRef(onDone)
  doneRef.current = onDone

  // Tell the plate when the swap lands, so the coins can burst out of the phone.
  useEffect(() => {
    if (s.screen === 'done') doneRef.current?.()
  }, [s.screen])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setS({ ...START, screen: 'home' })
      return
    }
    if (!playing) return
    let run = 0
    const loop = () => {
      run += 1
      setS({ ...START, run })
      for (const [at, change] of SCRIPT) {
        timers.current.push(window.setTimeout(() => setS((p) => ({ ...p, ...change })), at))
      }
      timers.current.push(window.setTimeout(loop, SCRIPT[SCRIPT.length - 1][0]))
    }
    loop()
    const list = timers.current
    return () => {
      list.forEach(clearTimeout)
      list.length = 0
    }
  }, [playing])

  const p = (k: string) => (s.press === k ? ' is-pressed' : '')

  return (
    <div className="isw" data-tone={theme} data-screen={s.screen} data-sheet={s.sheet ?? 'none'}>
      {/* Splash */}
      <div className="isw-page isw-splash">
        <i dangerouslySetInnerHTML={{ __html: logo }} />
      </div>

      {/* Home */}
      <div className="isw-page isw-home" key={`home-${s.run}`}>
        <Status />
        <div className="isw-head isw-in" style={{ ['--d' as string]: '0ms' }}>
          <strong className="isw-display">Your account</strong>
          <span className="isw-head-icons">
            <Icon d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M4 12h16" />
            <Icon d="M6 9a6 6 0 0 1 12 0c0 6 2.5 7.5 2.5 7.5h-17S6 15 6 9M10 20a2 2 0 0 0 4 0" />
          </span>
        </div>
        <div className="isw-balance isw-in" style={{ ['--d' as string]: '90ms' }}>
          <span className="isw-muted">Total balance</span>
          <strong className="isw-display isw-big">
            $<CountUp to={1200} decimals={2} run={s.screen === 'home'} />
          </strong>
          <span className="isw-muted">1 BTC ≈ $114,000.30</span>
        </div>
        <div className="isw-card isw-in" style={{ ['--d' as string]: '180ms' }}>
          <div className="isw-wallet">
            <img src={btc} alt="" />
            <div>
              <b>Bitcoin</b>
              <span>{s.swapped ? '175,438 sats' : '87,719 sats'}</span>
            </div>
            <b>{s.swapped ? '$200.00' : '$100.00'}</b>
          </div>
          <div className={`isw-wallet${p('usdt')}`}>
            <img src={usdt} alt="" />
            <div>
              <b>Stablecoin</b>
              <span>{s.swapped ? '1,000.00 USDT' : '1,100.00 USDT'} · TRC-20</span>
            </div>
            <b>{s.swapped ? '$1,000.00' : '$1,100.00'}</b>
          </div>
        </div>
        <div className="isw-section isw-in" style={{ ['--d' as string]: '260ms' }}>
          <strong className="isw-display">Recent activity</strong>
          <span>See all</span>
        </div>
        <div className="isw-list">
          {s.swapped && (
            <Row d="M8 4v16M4 8l4-4 4 4M16 20V4M12 16l4 4 4-4" title="Swap to Bitcoin" meta="Just now" amount="+87,719 sats" sub="−100.00 USDT" hot delay={320} />
          )}
          <Row d="M4 8h13M14 5l3 3-3 3M20 16H7M10 13l-3 3 3 3" title="Instant Buy" meta="Oct 20" amount="+20,000 sats" sub="₦34,200" hot={!s.swapped} delay={340} />
          <Row d="M17 7L7 17M15 17H7V9" title="Naira deposit" meta="Oct 20" amount="+₦50,000" sub="Bank transfer" delay={400} />
        </div>
        <div className="isw-actions isw-in" style={{ ['--d' as string]: '440ms' }}>
          <button className="isw-btn">
            <Icon d="M17 7L7 17M15 17H7V9" /> Receive
          </button>
          <button className="isw-btn is-primary">
            <Icon d="M12 5v14M5 12h14" /> Buy
          </button>
        </div>
        <Tabs />
      </div>

      {/* Swap */}
      <div className="isw-page isw-swap">
        <Status />
        <div className="isw-bar">
          <Icon d="M15 5l-7 7 7 7" />
          <strong className="isw-display">Swap</strong>
        </div>
        <div className="isw-pair">
          <div className="isw-card isw-leg">
            <div className="isw-leg-top">
              <span>From</span>
              <span>1,100.00 available</span>
            </div>
            <div className="isw-leg-main">
              <span className="isw-coin">
                <img src={usdt} alt="" /> Stablecoin
              </span>
              <strong className={`isw-display isw-amt${s.digits === 0 ? ' is-empty' : ''}`}>
                {TYPED[s.digits]}
                <small>USDT</small>
              </strong>
            </div>
          </div>
          <span className="isw-switch">
            <Icon d="M8 4v16M4 8l4-4 4 4M16 20V4M12 16l4 4 4-4" />
          </span>
          <div className="isw-card isw-leg">
            <div className="isw-leg-top">
              <span>To</span>
              <span>Bitcoin wallet</span>
            </div>
            <div className="isw-leg-main">
              <span className="isw-coin">
                <img src={btc} alt="" /> Bitcoin
              </span>
              <strong className="isw-display isw-amt is-yellow">
                {['0', '877', '8,772', '87,719'][s.digits]}
                <small>SATS</small>
              </strong>
            </div>
          </div>
        </div>
        <span className="isw-muted isw-rate">1 USDT ≈ 877 sats · No fee</span>
        <Keys press={s.press} prefix="k" />
        <button className={`isw-btn is-primary isw-cta${s.digits === 3 ? '' : ' is-off'}${p('review')}`}>Review swap</button>
      </div>

      {/* Done */}
      <div className="isw-page isw-done">
        <Status />
        <div className="isw-done-body">
          <svg className="isw-coincheck" width="72" height="72" viewBox="0 0 40 40" aria-hidden>
            <ellipse cx="20" cy="20" rx="13" ry="18.5" transform="rotate(32 20 20)" fill="#fff778" />
            <path d="M13 20.5l4.5 4.5L27.5 15" fill="none" stroke="#0b0b10" strokeWidth="5.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <strong className="isw-display isw-done-title">
            +87,719<small>SATS</small>
            <br />
            <em>Swapped.</em>
          </strong>
          <span className="isw-soft">100.00 USDT is now Bitcoin. It's in your Bitcoin wallet.</span>
        </div>
        <div className="isw-done-actions">
          <button className={`isw-btn${p('receipt')}`}>View receipt</button>
          <button className={`isw-btn is-primary${p('close')}`}>Done</button>
        </div>
      </div>

      {/* Sheets */}
      <div className="isw-scrim" />
      <div className="isw-sheet isw-confirm">
        <span className="isw-grab" />
        <strong className="isw-display isw-sheet-title">Swap 100 USDT?</strong>
        <div className="isw-rows">
          <div><span>You pay</span><b>100.00 USDT</b></div>
          <div><span>You get</span><b className="is-yellow">87,719 sats</b></div>
          <div><span>Rate</span><b>1 USDT ≈ 877 sats</b></div>
          <div><span>Fee</span><b>$0.00</b></div>
          <div><span>Arrives</span><b>Instantly</b></div>
        </div>
        <button className={`isw-btn is-primary${p('confirm')}`}>Confirm swap</button>
      </div>

      <div className="isw-sheet isw-pin">
        <span className="isw-grab" />
        <strong className="isw-display isw-sheet-title">Enter your PIN</strong>
        <div className="isw-dots">
          {[1, 2, 3, 4].map((n) => (
            <i key={n} className={s.pin >= n ? 'is-on' : ''} />
          ))}
        </div>
        <Keys press={s.press} prefix="p" />
      </div>

      <div className="isw-sheet isw-loading">
        <span className="isw-grab" />
        <div className="isw-spin">
          <svg width="56" height="56" viewBox="0 0 40 40" aria-hidden>
            <ellipse cx="20" cy="20" rx="13" ry="18.5" transform="rotate(32 20 20)" fill="none" className="isw-spin-track" strokeWidth="3" />
            <ellipse className="isw-spin-arc" cx="20" cy="20" rx="13" ry="18.5" transform="rotate(32 20 20)" fill="none" stroke="#fff778" strokeWidth="3" strokeLinecap="round" pathLength="100" />
          </svg>
        </div>
        <strong className="isw-display isw-sheet-title">Swapping…</strong>
        <span className="isw-muted">Locking your rate and moving 100 USDT to Bitcoin.</span>
        <div className="isw-progress"><i /></div>
      </div>

      <div className="isw-sheet isw-receipt">
        <span className="isw-grab" />
        <div className="isw-receipt-head">
          <strong className="isw-display isw-sheet-title">Receipt</strong>
          <span className="isw-tag">Completed</span>
        </div>
        <strong className="isw-display isw-receipt-amt">
          +87,719<small>SATS</small>
        </strong>
        <div className="isw-rows">
          <div><span>Type</span><b>Swap · Stablecoin → Bitcoin</b></div>
          <div><span>Paid</span><b>100.00 USDT</b></div>
          <div><span>Rate</span><b>1 USDT ≈ 877 sats</b></div>
          <div><span>Fee</span><b>$0.00</b></div>
          <div><span>Date</span><b>Today · 9:41</b></div>
          <div><span>Reference</span><b className="isw-mono">SWP-2K8F-41QX</b></div>
        </div>
        <button className="isw-btn">Share receipt</button>
      </div>
    </div>
  )
}

/* ---------- Card payment ----------
   The same v3 app paying at a stall with the iPayBTC Bitcoin card: the card
   waits by the reader, the tap lands, the card is debited in sats while the
   sheet loads, then it is paid. Same pieces, same sheet, same done page. */

type PayState = { screen: 'pay' | 'done'; sheet: Sheet; tap: boolean }
const PAY_START: PayState = { screen: 'pay', sheet: null, tap: false }
const PAY_SCRIPT: Array<[number, Partial<PayState>]> = [
  [1900, { tap: true }],
  [2350, { sheet: 'loading' }],
  [4500, { sheet: null, screen: 'done' }],
  [8800, {}],
]

export function CardPayApp({ playing = true, tone }: { playing?: boolean; tone?: 'light' | 'dark' }) {
  const site = useTheme().theme
  const theme = tone ?? site
  const [s, setS] = useState<PayState>(PAY_START)
  const timers = useRef<number[]>([])
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setS({ ...PAY_START, screen: 'done' })
      return
    }
    if (!playing) return
    const loop = () => {
      setS(PAY_START)
      for (const [at, change] of PAY_SCRIPT) timers.current.push(window.setTimeout(() => setS((p) => ({ ...p, ...change })), at))
      timers.current.push(window.setTimeout(loop, PAY_SCRIPT[PAY_SCRIPT.length - 1][0]))
    }
    loop()
    const list = timers.current
    return () => {
      list.forEach(clearTimeout)
      list.length = 0
    }
  }, [playing])

  return (
    <div className="isw ipc" data-tone={theme} data-screen={s.screen} data-sheet={s.sheet ?? 'none'} data-tap={s.tap ? 'on' : 'off'}>
      <div className="isw-page ipc-pay">
        <Status />
        <div className="isw-bar">
          <Icon d="M15 5l-7 7 7 7" />
          <strong className="isw-display">Pay</strong>
        </div>
        <div className="ipc-to">
          <span className="isw-muted">Paying</span>
          <b>Mama Titi’s Stall</b>
          <strong className="isw-display ipc-amt">₦4,500</strong>
          <span className="isw-muted">≈ 2,632 sats from your Bitcoin card</span>
        </div>
        <div className="ipc-stage">
          <i className="ipc-ring" />
          <i className="ipc-ring" />
          <div className="ipc-card">
            <svg className="ipc-shape" viewBox="0 0 5065 3308" aria-hidden>
              <ellipse cx="2097.73" cy="1653.91" rx="724.285" ry="1463.82" transform="rotate(-33.0714 2097.73 1653.91)" />
              <ellipse cx="3018.12" cy="1212.77" rx="358.833" ry="991.135" transform="rotate(-43.7569 3018.12 1212.77)" />
            </svg>
            <i className="ipc-chip" />
            <span className="ipc-num">•••• 2140</span>
            <i className="ipc-logo" dangerouslySetInnerHTML={{ __html: logo }} />
          </div>
        </div>
        <span className="isw-muted ipc-hint">Hold your card near the reader</span>
      </div>

      <div className="isw-page isw-done">
        <Status />
        <div className="isw-done-body">
          <svg className="isw-coincheck" width="72" height="72" viewBox="0 0 40 40" aria-hidden>
            <ellipse cx="20" cy="20" rx="13" ry="18.5" transform="rotate(32 20 20)" fill="#fff778" />
            <path d="M13 20.5l4.5 4.5L27.5 15" fill="none" stroke="#0b0b10" strokeWidth="5.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <strong className="isw-display isw-done-title">
            −2,632<small>SATS</small>
            <br />
            <em>Paid.</em>
          </strong>
          <span className="isw-soft">₦4,500 to Mama Titi’s Stall, debited from your iPayBTC card.</span>
        </div>
        <div className="isw-done-actions">
          <button className="isw-btn">View receipt</button>
          <button className="isw-btn is-primary">Done</button>
        </div>
      </div>

      <div className="isw-scrim" />
      <div className="isw-sheet isw-loading">
        <span className="isw-grab" />
        <div className="isw-spin">
          <svg width="56" height="56" viewBox="0 0 40 40" aria-hidden>
            <ellipse cx="20" cy="20" rx="13" ry="18.5" transform="rotate(32 20 20)" fill="none" className="isw-spin-track" strokeWidth="3" />
            <ellipse className="isw-spin-arc" cx="20" cy="20" rx="13" ry="18.5" transform="rotate(32 20 20)" fill="none" stroke="#fff778" strokeWidth="3" strokeLinecap="round" pathLength="100" />
          </svg>
        </div>
        <strong className="isw-display isw-sheet-title">Paying…</strong>
        <span className="isw-muted">Debiting 2,632 sats from your iPayBTC card.</span>
        <div className="isw-progress"><i /></div>
      </div>
    </div>
  )
}

/* ---------- Pieces ---------- */

function Icon({ d }: { d: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      <path d={d} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Status() {
  return (
    <div className="isw-status">
      <span>9:41</span>
      <span className="isw-island" />
      <span className="isw-status-icons">
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

function Row({ d, title, meta, amount, sub, hot, delay }: { d: string; title: string; meta: string; amount: string; sub: string; hot?: boolean; delay: number }) {
  return (
    <div className="isw-row isw-in" style={{ ['--d' as string]: `${delay}ms` }}>
      <span className="isw-glyph">
        <Icon d={d} />
      </span>
      <div className="isw-row-main">
        <b>{title}</b>
        <span>Completed · {meta}</span>
      </div>
      <div className="isw-row-end">
        <b className={hot ? 'is-yellow' : ''}>{amount}</b>
        <span>{sub}</span>
      </div>
    </div>
  )
}

function Keys({ press, prefix }: { press: string | null; prefix: string }) {
  return (
    <div className="isw-keys">
      {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫'].map((k) => (
        <span key={k} className={press === `${prefix}${k}` ? 'is-pressed' : ''}>
          {k}
        </span>
      ))}
    </div>
  )
}

const TABS: Array<[string, string]> = [
  ['Home', 'M4 11 12 4l8 7M6 9.5V20h5v-6h2v6h5V9.5'],
  ['Wallet', 'M4 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a1 1 0 0 1-1-1zM4 7V6a2 2 0 0 1 2-2h10M16 13.5h.01'],
  ['Trade', 'M4 8h13M14 5l3 3-3 3M20 16H7M10 13l-3 3 3 3'],
  ['Explore', 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM15.6 8.4 13 13l-4.6 2.6L11 11z'],
  ['Profile', 'M12 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM5.5 20a6.5 6.5 0 0 1 13 0'],
]

function Tabs() {
  return (
    <nav className="isw-tabs">
      {TABS.map(([t, d], i) => (
        <span key={t} className={i === 0 ? 'is-on' : ''}>
          <i>
            <Icon d={d} />
          </i>
          {t}
        </span>
      ))}
    </nav>
  )
}

/** Counts from 0 to `to` with an ease-out, whenever `run` turns true. */
function CountUp({ to, decimals = 0, run }: { to: number; decimals?: number; run: boolean }) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!run) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setV(to)
      return
    }
    let raf = 0
    const t0 = performance.now() + 250
    const dur = 1300
    const tick = (now: number) => {
      const k = Math.min(1, Math.max(0, (now - t0) / dur))
      const e = 1 - Math.pow(1 - k, 4)
      setV(to * e)
      if (k < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, to])
  return <>{v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}</>
}
