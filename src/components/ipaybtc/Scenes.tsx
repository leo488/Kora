import { useEffect, useRef, useState } from 'react'
import './scenes.css'
import ipaybtcLogo from '../../assets/ipaybtc-logo.svg?raw'
import o1 from '../../assets/ipaybtc3d/o1.webp'
import o2 from '../../assets/ipaybtc3d/o2.webp'
import o3 from '../../assets/ipaybtc3d/o3.webp'
import o4 from '../../assets/ipaybtc3d/o4.webp'
import o6 from '../../assets/ipaybtc3d/o6.webp'
import o7 from '../../assets/ipaybtc3d/o7.webp'
import o8 from '../../assets/ipaybtc3d/o8.webp'
import o9 from '../../assets/ipaybtc3d/o9.webp'
import cardReceipt from '../../assets/v3/card-receipt.webp'
import cardBtc from '../../assets/v3/card-btc.webp'
import cardNaira from '../../assets/v3/card-naira.webp'
import cardWallets from '../../assets/v3/card-wallets.webp'

/* Scenes for the iPayBTC case study drawn in code, after the Ragged Edge
   Wise page: campaign type, a headline that builds, the 3D object set,
   the logo plate and a board of the app's UI. All light, all calm. */

/** True once the element has scrolled into view. */
export function useInView<T extends Element>(threshold = 0.3) {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, seen] as const
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

const LINES = [
  ['MOVE', 'FREELY.'],
  ['OWN', 'BITCOIN.'],
  ['NAIRA', 'TO SATS.'],
  ['SEND IN', 'SECONDS.'],
]

/** Campaign type whose words swap, like Wise's FULL SPEED / MIN FEES. */
export function TypeSwap() {
  const i = useCycle(LINES.length, 1800)
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
      <span className="ips-type-logo" dangerouslySetInnerHTML={{ __html: ipaybtcLogo }} />
    </div>
  )
}

/** A big statement that builds word by word when it scrolls in. */
export function Headline() {
  const [ref, seen] = useInView<HTMLDivElement>(0.4)
  const words = 'Bitcoin, made for everyday life.'.split(' ')
  return (
    <div ref={ref} className={`ips ips-head${seen ? ' is-in' : ''}`}>
      <p>
        {words.map((w, k) => (
          <span key={k} style={{ transitionDelay: `${k * 110}ms` }}>
            {w}
          </span>
        ))}
      </p>
    </div>
  )
}

const OBJECTS = [o1, o3, o6, o8, o2, o7, o4, o9]

/** The 3D object set, laid out like Wise's: a clean grid on white. Each
    object settles in as the board scrolls into view. */
export function Objects() {
  const [ref, seen] = useInView<HTMLDivElement>(0.3)
  return (
    <div ref={ref} className={`ips ips-objects${seen ? ' is-in' : ''}`}>
      {OBJECTS.map((src, k) => (
        <div key={k} className="ips-object" style={{ transitionDelay: `${k * 70}ms` }}>
          <img src={src} alt="" />
        </div>
      ))}
    </div>
  )
}

/** The logo on Electric Blue. */
export function LogoCycle() {
  return (
    <div className="ips ips-logo" role="img" aria-label="iPayBTC logo">
      <span dangerouslySetInnerHTML={{ __html: ipaybtcLogo }} />
    </div>
  )
}

/** A board of the app's UI, card by card, on a light ground. The cards rise
    in one after another and then rest. */
export function UiBoard() {
  const [ref, seen] = useInView<HTMLDivElement>(0.25)
  return (
    <div ref={ref} className={`ips ips-uiboard${seen ? ' is-in' : ''}`}>
      <div className="ips-ui-tile ips-ui-a" style={{ transitionDelay: '0ms' }}>
        <img src={cardWallets} alt="" />
      </div>
      <div className="ips-ui-tile ips-ui-b ips-ui-blue" style={{ transitionDelay: '90ms' }}>
        <img className="ips-ui-3d" src={o2} alt="" />
      </div>
      <div className="ips-ui-tile ips-ui-c" style={{ transitionDelay: '180ms' }}>
        <img src={cardBtc} alt="" />
      </div>
      <div className="ips-ui-tile ips-ui-d" style={{ transitionDelay: '270ms' }}>
        <img src={cardReceipt} alt="" />
      </div>
      <div className="ips-ui-tile ips-ui-e" style={{ transitionDelay: '360ms' }}>
        <img src={cardNaira} alt="" />
      </div>
    </div>
  )
}

/** A real app card that rises in beside the people in a photo, then rests. */
export function PhotoCard({ src, side, top }: { src: string; side: 'left' | 'right'; top?: boolean }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.5)
  return (
    <div ref={ref} className={`ips-card is-${side}${top ? ' is-top' : ''}${seen ? ' is-in' : ''}`} aria-hidden>
      <img src={src} alt="" loading="lazy" />
    </div>
  )
}
