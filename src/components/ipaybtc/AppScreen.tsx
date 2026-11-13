import { useEffect, useRef, useState } from 'react'
import logo from '../../assets/ipaybtc-logo.svg?raw'
import './app-screen.css'
import A1 from '../../assets/v3/A1.jpg'
import A2 from '../../assets/v3/A2.jpg'
import A3 from '../../assets/v3/A3.jpg'
import A4 from '../../assets/v3/A4.jpg'
import A5 from '../../assets/v3/A5.jpg'
import A6 from '../../assets/v3/A6.jpg'
import C1 from '../../assets/v3/C1.jpg'
import C2 from '../../assets/v3/C2.jpg'
import C3 from '../../assets/v3/C3.jpg'
import C5 from '../../assets/v3/C5.jpg'
import C6 from '../../assets/v3/C6.jpg'

/* The iPayBTC app (v3, light mode) running on a phone in a still photo.
   Everything is drawn at the phone's own size, 390 × 844, and the plate that
   holds it maps that box onto the screen in the photo. A short script steps
   through one transaction and loops; CSS transitions do the moving. */

export type AppFlow = 'send' | 'buy' | 'launch'

type Screen = 'home' | 'amount' | 'done' | 'icons' | 'splash'

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

  if (flow === 'launch') return <Launch s={s} playing={playing} />
  return <Reel frames={REELS[flow]} playing={playing} />
}

/* ---------- The real v3 screens ---------- */

/* Each phone steps through screens captured from the v3 design file, pushed
   in from the right the way iOS moves between screens. */
const REELS: Record<'send' | 'buy' | 'launched', string[]> = {
  send: [C1, C2, C3, C6, C5],
  buy: [A2, A3, A4, A5, A6, C1],
  launched: [A1, C1],
}

function Reel({ frames, playing, hold = 1900 }: { frames: string[]; playing: boolean; hold?: number }) {
  const [i, setI] = useState(0)
  const [snap, setSnap] = useState(false)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!playing || reduce) return
    const t = window.setInterval(() => {
      setI((v) => {
        if (v + 1 < frames.length) {
          setSnap(false)
          return v + 1
        }
        setSnap(true)
        return 0
      })
    }, hold)
    return () => clearInterval(t)
  }, [frames, playing, hold])
  return (
    <div className={`ias ias-reel${snap ? ' is-snap' : ''}`}>
      {frames.map((src, n) => (
        <img
          key={n}
          src={src}
          alt=""
          className={n === i ? 'is-on' : n < i ? 'is-past' : ''}
          loading="lazy"
          decoding="async"
        />
      ))}
    </div>
  )
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

function Launch({ s, playing }: { s: State; playing: boolean }) {
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
      <div className="ias-page ias-splash ias-splash-real">
        {s.screen !== 'icons' && <Reel frames={REELS.launched} playing={playing} hold={1500} />}
      </div>
    </div>
  )
}
