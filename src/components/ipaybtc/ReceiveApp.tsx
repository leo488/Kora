import { useEffect, useMemo, useState } from 'react'
import btc from '../../assets/ipaybtc-app/btc.svg'
import './receive-app.css'

/* iPayBTC Receive, light: the QR screen, copy the address, then a payment
   lands. Drawn at 390 × 844 and loops. */

type Step = 'qr' | 'copied' | 'incoming' | 'done'
const SCRIPT: [number, Step][] = [
  [0, 'qr'],
  [2600, 'copied'],
  [4300, 'qr'],
  [5000, 'incoming'],
  [6300, 'done'],
  [9800, 'qr'],
]
const LOOP = 11000

/* A QR-looking 29 × 29 grid: real finder squares, seeded modules. */
function useQr() {
  return useMemo(() => {
    const n = 29
    let seed = 7
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
    const cells: [number, number][] = []
    const inFinder = (x: number, y: number) =>
      (x < 8 && y < 8) || (x > n - 9 && y < 8) || (x < 8 && y > n - 9)
    const inLogo = (x: number, y: number) => x > 10 && x < 18 && y > 10 && y < 18
    for (let y = 0; y < n; y++)
      for (let x = 0; x < n; x++) if (!inFinder(x, y) && !inLogo(x, y) && rnd() > 0.52) cells.push([x, y])
    return { n, cells }
  }, [])
}

export function ReceiveApp({ playing = true }: { playing?: boolean }) {
  const [step, setStep] = useState<Step>('qr')
  const [sats, setSats] = useState(0)
  const qr = useQr()

  useEffect(() => {
    if (!playing) return
    const timers: number[] = []
    const run = () => {
      SCRIPT.forEach(([t, s]) => timers.push(window.setTimeout(() => setStep(s), t)))
      timers.push(window.setTimeout(run, LOOP))
    }
    run()
    return () => timers.forEach(clearTimeout)
  }, [playing])

  useEffect(() => {
    if (step !== 'done') return
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 900)
      setSats(Math.round(25000 * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [step])

  const finder = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width="7" height="7" rx="1.6" fill="#050e7f" />
      <rect x={x + 1} y={y + 1} width="5" height="5" rx="1.1" fill="#fff" />
      <rect x={x + 2} y={y + 2} width="3" height="3" rx=".7" fill="#050e7f" />
    </g>
  )

  return (
    <div className="irc" data-step={step}>
      <div className="irc-status">
        <span>9:41</span>
        <span className="irc-status-icons">
          <svg width="18" height="11" viewBox="0 0 18 11"><path d="M1 10h2V7H1zM5 10h2V5H5zM9 10h2V3H9zM13 10h2V1h-2z" fill="currentColor" /></svg>
          <svg width="25" height="12" viewBox="0 0 25 12"><rect x=".5" y=".5" width="21" height="11" rx="3" fill="none" stroke="currentColor" opacity=".4" /><rect x="2" y="2" width="16" height="8" rx="1.6" fill="currentColor" /><path d="M23 4v4c.8-.3 1.3-1 1.3-2s-.5-1.7-1.3-2z" fill="currentColor" opacity=".4" /></svg>
        </span>
      </div>

      <header className="irc-head">
        <span className="irc-back" aria-hidden>
          <svg width="22" height="22" viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <h2>Receive</h2>
      </header>

      <div className="irc-seg">
        <span className="is-on">Bitcoin</span>
        <span>Stablecoin</span>
      </div>

      <div className="irc-card">
        <svg className="irc-qr" viewBox={`-1 -1 ${qr.n + 2} ${qr.n + 2}`} aria-hidden>
          {qr.cells.map(([x, y]) => (
            <rect key={`${x}.${y}`} x={x + 0.08} y={y + 0.08} width=".84" height=".84" rx=".28" fill="#050e7f" />
          ))}
          {finder(0, 0)}
          {finder(qr.n - 7, 0)}
          {finder(0, qr.n - 7)}
        </svg>
        <img className="irc-qr-logo" src={btc} alt="" />
        <p className="irc-label">Your Bitcoin address</p>
        <p className="irc-addr">bc1q 8w3k 2j7f … x9tm 4f3k</p>
        <div className="irc-actions">
          <span className={`irc-btn${step === 'copied' ? ' is-pressed' : ''}`}>
            {step === 'copied' ? 'Copied' : 'Copy address'}
          </span>
          <span className="irc-btn irc-btn-ghost">Share</span>
        </div>
      </div>

      <p className="irc-note">Only send Bitcoin to this address. Lightning invoices work too.</p>

      <div className="irc-toast">Address copied</div>

      <div className="irc-sheet">
        <span className="irc-grab" />
        <span className="irc-tick" aria-hidden>
          <svg viewBox="0 0 84 84"><ellipse cx="42" cy="42" rx="30" ry="41" transform="rotate(32 42 42)" fill="#8cc4ee" /><path d="M29 43l9 9 18-19" fill="none" stroke="#040246" strokeWidth="5.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <p className="irc-sheet-k">You received</p>
        <p className="irc-sheet-v">
          {sats.toLocaleString('en-US')} <small>SATS</small>
        </p>
        <p className="irc-sheet-s">From Tunde · Just now</p>
      </div>
    </div>
  )
}
