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
  ['MOVE', 'FREELY.', o8],
  ['OWN', 'BITCOIN.', o1],
  ['NAIRA', 'TO SATS.', o2],
  ['GIFT', 'IN SATS.', o3],
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
