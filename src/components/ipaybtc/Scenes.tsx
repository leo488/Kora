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

/* Scenes for the iPayBTC case study that are drawn in code, after the
   Ragged Edge Wise page: swapping campaign type, a headline that builds,
   floating 3D objects, brand tiles and the live motion components. */

/** True once the element has scrolled into view. */
function useInView<T extends Element>() {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, seen] as const
}

/** Steps through a list on a timer (paused when reduced motion is on). */
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
  ['WE MOVE', 'IN SATS.'],
]

/** Campaign type whose words swap, like Wise's FULL SPEED / MIN FEES. */
export function TypeSwap() {
  const i = useCycle(LINES.length, 1700)
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
  const [ref, seen] = useInView<HTMLDivElement>()
  const words = 'Bitcoin, made for everyday life.'.split(' ')
  return (
    <div ref={ref} className={`ips ips-head${seen ? ' is-in' : ''}`}>
      <p>
        {words.map((w, k) => (
          <span key={k} style={{ transitionDelay: `${k * 90}ms` }}>
            {w}
          </span>
        ))}
      </p>
    </div>
  )
}

const OBJECTS = [o1, o3, o6, o8, o2, o7, o4, o9]

/** The 3D object family, each one drifting on its own beat. */
export function Objects() {
  return (
    <div className="ips ips-objects">
      {OBJECTS.map((src, k) => (
        <img key={k} src={src} alt="" style={{ animationDelay: `${-k * 0.7}s` }} />
      ))}
    </div>
  )
}

/** The logo on a plate that moves through the brand colours. */
export function LogoCycle() {
  return (
    <div className="ips ips-logo" role="img" aria-label="iPayBTC logo in the brand colours">
      <span dangerouslySetInnerHTML={{ __html: ipaybtcLogo }} />
    </div>
  )
}

/** The v4 motion components, running live. */
export function Components() {
  return (
    <div className="ips ips-components">
      <iframe src="/ipaybtc/motion-board.html" title="iPayBTC motion components" loading="lazy" tabIndex={-1} />
    </div>
  )
}

/** A bento of brand tiles: icon, type, object, colour. */
export function Tiles() {
  return (
    <div className="ips ips-tiles">
      <div className="ips-tile ips-tile-icon">
        <span dangerouslySetInnerHTML={{ __html: ipaybtcLogo }} />
      </div>
      <div className="ips-tile ips-tile-yellow">
        <p>ALL YOUR MONEY IN SATS</p>
      </div>
      <div className="ips-tile ips-tile-sky">
        <img src={o1} alt="" />
      </div>
      <div className="ips-tile ips-tile-navy">
        <p>
          NAIRA
          <br />
          TO SATS
        </p>
      </div>
      <div className="ips-tile ips-tile-grad">
        <img src={o8} alt="" />
      </div>
      <div className="ips-tile ips-tile-white">
        <img src={o7} alt="" />
      </div>
    </div>
  )
}
