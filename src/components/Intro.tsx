import { useEffect, useRef, useState } from 'react'
import { LOGO } from '../brand/logoData'

/* The Koraa’ logo animation, "the apostrophe throws the star", ported from the
   brand kit (animation/source/logo-animation-blue.html). Every number below is
   the kit's. Drawn on a transparent canvas over the Blue Hour gradient: white
   letters, the flying star in Plantain, and the star landing in the o as a
   true cut-out, so the gradient shows through it.

   Plays on every full page load (a refresh included), never on moves between
   pages inside the site, since this sits outside the routes. Setting
   sessionStorage 'koraa-intro-played' to 'yes' skips it (used by screenshot
   scripts). Under reduced motion it is skipped entirely and the
   page opens on the static logo. A click or a key skips it too. */

const STORAGE_KEY = 'koraa-intro-played'
/** The animation settles by ~3.4 s; the curtain lifts a beat later. */
const LIFT_AT = 3.9
const EXIT_MS = 800

const FG = '#FFFFFF'
const FLY = '#D7F24B'

const A = { END: 5.4, popT: 1.25, windT: 1.72, flingT: 1.98, hitT: 2.62 }
const OCX = 520.734
const OCY = 63.0595
const OX = OCX + LOGO.tx[1]
const OY = OCY
const LUX = 543.6
const LUY = 58.87
const BASE_Y = 73.88
const D2R = Math.PI / 180
const PIV = [499.9, OX, 541, 560, 583.5]
const LET: Array<['K' | 'O' | 'R' | 'A', number]> = [['K', 0], ['O', 1], ['R', 2], ['A', 3], ['A', 4]]

const cl = (v: number) => Math.max(0, Math.min(1, v))
const lerp = (a: number, b: number, k: number) => a + (b - a) * k
const pr = (t: number, a: number, b: number) => cl((t - a) / (b - a))
const oC = (k: number) => 1 - Math.pow(1 - cl(k), 3)
const ioS = (k: number) => -(Math.cos(Math.PI * cl(k)) - 1) / 2
const bO = (k: number, s = 1.5) => {
  k = cl(k)
  return 1 + (s + 1) * Math.pow(k - 1, 3) + s * Math.pow(k - 1, 2)
}
const spring = (tau: number, f = 15, d = 5.5) => (tau <= 0 ? 0 : Math.exp(-d * tau) * Math.sin(f * tau))

const alreadyPlayed = () => {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === 'yes'
  } catch {
    return false
  }
}

function makeRenderer(ctx: CanvasRenderingContext2D) {
  const BAR = new Path2D(LOGO.bar)
  const P = {
    K: new Path2D(LOGO.K),
    O: new Path2D(LOGO.O),
    R: new Path2D(LOGO.R),
    A: new Path2D(LOGO.A),
    apos: new Path2D(LOGO.apos),
  }

  const star = (x: number, y: number, R: number, rot: number) => {
    if (R <= 0.01) return
    const s = R / 49.43
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(rot * D2R)
    ctx.scale(s, s)
    ctx.translate(LOGO.ast.bx, LOGO.ast.by)
    ctx.fillStyle = FLY
    for (const a of [0, 60, 120]) {
      ctx.save()
      ctx.rotate(a * D2R)
      ctx.fill(BAR)
      ctx.restore()
    }
    ctx.restore()
  }

  const holeStar = (scale: number, rot: number) => {
    const s = (8.8 * scale) / 49.43
    const m = new DOMMatrix().translate(OX, OY).rotate(rot).scale(s, s).translate(LOGO.ast.bx, LOGO.ast.by)
    const p = new Path2D()
    for (const a of [0, 60, 120]) p.addPath(BAR, m.rotate(a))
    return p
  }

  /** Draws frame t. W and H are the canvas size in CSS pixels. */
  return (t: number, W: number, H: number) => {
    const c = ctx
    c.clearRect(0, 0, W, H)
    // The kit sets the logo 200 px tall on a 1920 frame; keep that share of
    // the width, but never let it outgrow a phone screen.
    const LS = (Math.min(W / 1920, H / 1080) * 1.4 * 200) / 31.08
    const push = 1 + 0.035 * ioS(pr(t, 0, A.END))
    const tauHit = t - A.hitT
    const recoil = [-1.0, 0, 1.0, 0.6, 0.35].map((v) => v * spring(tauHit, 13, 5))
    const s = LS * push * (1 + 0.02 * spring(tauHit, 11, 4))

    c.save()
    c.translate(W / 2, H / 2)
    c.scale(s, s)
    c.translate(-LUX, -LUY)
    c.fillStyle = FG
    c.strokeStyle = FG
    c.lineJoin = 'round'
    c.lineWidth = 0.7

    // 1 · letters rise one by one, overshoot and settle
    for (const [k, i] of LET) {
      const t0 = 0.1 + i * 0.075
      const kk = pr(t, t0, t0 + 0.72)
      if (kk <= 0) continue
      const y = (1 - bO(kk, 2.1)) * 34
      const sy = 1 + 0.17 * Math.sin(2 * Math.PI * kk) * (1 - kk)
      const sx = 1 / Math.sqrt(Math.max(0.5, sy))
      let osx = 1
      let osy = 1
      if (k === 'O') {
        const ant = Math.sin(Math.PI * pr(t, A.hitT - 0.22, A.hitT)) * 0.05
        const hit = tauHit >= 0 ? 0.16 * Math.exp(-4.5 * tauHit) * Math.cos(13 * tauHit) : 0
        osx = (1 + ant * 0.6) * (1 + hit)
        osy = (1 - ant) * (1 + hit * 0.8)
      }
      c.save()
      c.beginPath()
      c.rect(480, 20, 140, BASE_Y + 0.6 - 20)
      c.clip()
      c.translate(PIV[i] + recoil[i], BASE_Y + y)
      c.scale(sx, sy)
      c.translate(-PIV[i], -BASE_Y)
      if (k === 'O') {
        c.translate(OX, OY)
        c.scale(osx, osy)
        c.translate(-OX, -OY)
      }
      c.save()
      c.translate(LOGO.tx[i], 0)
      c.fill(P[k])
      c.stroke(P[k])
      c.restore()
      if (k === 'O' && tauHit >= 0) {
        // The star pops in as negative space: cut it out of the o.
        const ps = bO(pr(t, A.hitT, A.hitT + 0.42), 2.2)
        const rot = lerp(-30, 0, bO(pr(t, A.hitT, A.hitT + 0.55), 1.4))
        c.globalCompositeOperation = 'destination-out'
        c.fill(holeStar(ps, rot))
        c.globalCompositeOperation = 'source-over'
      }
      c.restore()
    }

    // The apostrophe drops in, winds up, flings, and wobbles.
    const ka = pr(t, 0.62, 1.12)
    if (ka > 0) {
      const load = Math.sin((Math.PI / 2) * pr(t, A.windT, A.flingT)) * (t < A.flingT ? 1 : 0)
      const fl = t >= A.flingT ? -16 * Math.exp(-4 * (t - A.flingT)) * Math.cos(11 * (t - A.flingT)) : 0
      const ang = 12 * load + fl
      const sqy = 1 - 0.2 * load + (t >= A.flingT ? 0.18 * spring(t - A.flingT, 14, 6) : 0)
      c.save()
      c.beginPath()
      c.rect(580, 20, 30, 53)
      c.clip()
      c.translate(recoil[4] * 0.8, -(1 - bO(ka, 2.4)) * 12)
      c.translate(593.8, 52.6)
      c.rotate(ang * D2R)
      c.scale(1 / Math.sqrt(sqy), sqy)
      c.translate(-593.8, -52.6)
      c.fill(P.apos)
      c.stroke(P.apos)
      c.restore()
    }
    c.restore()

    // 2 · the star pops out of the apostrophe, is flung, and lands in the o.
    // Distances in the kit are pixels on a 1920 frame; scale them with the logo.
    const px = s / ((200 / 31.08) * push)
    const o = [W / 2 + (OX - LUX) * s, H / 2 + (OY - LUY) * s]
    const Rf = 8.8 * s
    const ap = [W / 2 + (594.6 - LUX) * s, H / 2 + (43.3 - LUY) * s]
    const load = Math.sin((Math.PI / 2) * pr(t, A.windT, A.flingT))
    const rest = [ap[0] + 10 * px, ap[1] - 95 * px * oC(pr(t, A.popT, A.popT + 0.35)) + 40 * px * load]
    const Q = (a: number[], cp: number[], b: number[], u: number) => [
      (1 - u) ** 2 * a[0] + 2 * (1 - u) * u * cp[0] + u * u * b[0],
      (1 - u) ** 2 * a[1] + 2 * (1 - u) * u * cp[1] + u * u * b[1],
    ]
    const launch = [ap[0] + 10 * px, ap[1] - 55 * px]
    const cp = [(launch[0] + o[0]) / 2 + 40 * px, o[1] - 620 * px]
    const uOf = (tt: number) => {
      const k = pr(tt, A.flingT, A.hitT)
      return lerp(k, ioS(k), 0.45)
    }
    const rOf = (u: number) => lerp(30, -330, u)

    if (t >= A.popT && t < A.flingT) {
      const pop = bO(pr(t, A.popT, A.popT + 0.34), 2.6)
      const wig = 14 * Math.sin((t - A.popT) * 6) * (1 - load)
      c.save()
      c.translate(rest[0], rest[1])
      c.scale(1 + 0.12 * load, 1 - 0.16 * load)
      star(0, 0, Rf * pop, 30 + wig)
      c.restore()
    } else if (t >= A.flingT && t < A.hitT) {
      for (let i = 7; i >= 1; i--) {
        const tt = t - i * 0.03
        if (tt < A.flingT) continue
        const u = uOf(tt)
        const [x, y] = Q(launch, cp, o, u)
        star(x, y, Rf * Math.pow(0.76, i), rOf(u))
      }
      const u = uOf(t)
      const [x, y] = Q(launch, cp, o, u)
      const [x2, y2] = Q(launch, cp, o, Math.min(1, u + 0.01))
      const ang = Math.atan2(y2 - y, x2 - x)
      const st = 0.3 * Math.min(1, Math.hypot(x2 - x, y2 - y) / (14 * px))
      c.save()
      c.translate(x, y)
      c.rotate(ang)
      c.scale(1 + st, 1 - st * 0.5)
      c.rotate(-ang)
      star(0, 0, Rf, rOf(u))
      c.restore()
    }

    // Sparks thrown out of the o as the star lands.
    if (tauHit >= 0 && tauHit < 0.6) {
      for (let i = 0; i < 7; i++) {
        const a = (i / 7) * Math.PI * 2 + 0.3
        const d = (70 + 160 * oC(tauHit / 0.6)) * px
        const r = 10 * px * (1 - tauHit / 0.6)
        star(o[0] + Math.cos(a) * d, o[1] + Math.sin(a) * d, r, i * 40 + tauHit * 300)
      }
    }
  }
}

type Phase = 'playing' | 'leaving' | 'done'

export function Intro() {
  const [phase, setPhase] = useState<Phase>(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return reduced || alreadyPlayed() ? 'done' : 'playing'
  })
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Draw loop.
  useEffect(() => {
    if (phase === 'done') return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const render = makeRenderer(ctx)
    let w = 0
    let h = 0
    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    size()
    window.addEventListener('resize', size)

    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / 1000, A.END)
      render(t, w, h)
      if (t >= LIFT_AT) setPhase((p) => (p === 'playing' ? 'leaving' : p))
      if (t < A.END) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', size)
    }
    // Runs once for the life of the curtain.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Lift, then unmount.
  useEffect(() => {
    if (phase !== 'leaving') return
    const id = setTimeout(() => setPhase('done'), EXIT_MS)
    return () => clearTimeout(id)
  }, [phase])

  // Skip on click or key.
  useEffect(() => {
    if (phase !== 'playing') return
    const skip = () => setPhase('leaving')
    window.addEventListener('keydown', skip)
    return () => window.removeEventListener('keydown', skip)
  }, [phase])

  // Hold the page still while the curtain is up.
  const locked = phase !== 'done'
  useEffect(() => {
    if (!locked) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [locked])

  if (phase === 'done') return null

  return (
    <div
      className={`koraa-intro${phase === 'leaving' ? ' is-leaving' : ''}`}
      aria-hidden="true"
      onClick={() => setPhase('leaving')}
    >
      <canvas ref={canvasRef} className="koraa-intro-canvas" />
    </div>
  )
}
