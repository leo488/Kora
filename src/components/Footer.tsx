import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { NAV_LINKS } from '../data'
import { KoraMark } from './KoraMark'
import { useContact } from '../contact/useContact'
import { NEW_BUSINESS_EMAIL } from '../contact/sendBrief'

/* Footer, after Ragged Edge's: a short list of ways in (label, value, one
   action), a row of pills, the sitemap, then the wordmark. */

const SOCIAL = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'X', href: '#' },
]

/**
 * The wordmark's letters drop in as the footer scrolls into view, tied to the
 * scroll itself rather than fired once, so the logo lands at the pace the
 * reader scrolls and is fully set by the bottom of the page.
 */
function useScrollDrop() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const box = ref.current
    const glyphs = box ? Array.from(box.querySelectorAll<SVGPathElement>('svg > path')) : []
    if (!box || !glyphs.length) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const STEP = 0.08
    const SPAN = 1 - STEP * (glyphs.length - 1)
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
    let frame = 0

    const update = () => {
      frame = 0
      const rect = box.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 when the logo's top meets the bottom of the screen, 1 once its
      // bottom is 40px clear of it.
      const p = (vh - rect.top) / (rect.height + 40)
      glyphs.forEach((g, i) => {
        const t = Math.min(1, Math.max(0, (p - i * STEP) / SPAN))
        g.style.translate = `0 ${((1 - easeOut(t)) * -180).toFixed(2)}%`
      })
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return ref
}

function CopyText({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard blocked; the address beside it is still a mailto link.
    }
  }
  return (
    <button type="button" className="kora-footer-action" onClick={copy}>
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}

export function Footer() {
  const openContact = useContact()
  const logoRef = useScrollDrop()

  return (
    <footer className="kora-footer nx-foot">
      <div className="nx-split nx-foot-top">
        <p className="nx-label">Get in touch</p>
        <div>
          <p className="nx-lead nx-foot-mail">
            <a href={`mailto:${NEW_BUSINESS_EMAIL}`}>{NEW_BUSINESS_EMAIL}</a>
            <CopyText text={NEW_BUSINESS_EMAIL} />
          </p>
          <ul className="nx-foot-list">
            <li>
              <span>Find us</span>
              <span>10C Momoh Close, Freedom Avenue, Abuja</span>
            </li>
            <li>
              <span>Brand test</span>
              <Link to="/brand-test">Take the brand test</Link>
            </li>
            <li>
              <span>Call</span>
              <button type="button" onClick={() => openContact({ prefer: 'A call' })}>
                Book a call
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div ref={logoRef} className="kora-footer-logo-box">
        <KoraMark className="kora-footer-logo" />
        {/* Dark glass: the letters are lit as a bevelled, polished surface
            (a lighting filter on the shape itself, not a drop shadow). */}
        <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
          <filter id="kora-glass" x="-2%" y="-10%" width="104%" height="120%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceAlpha" stdDeviation="9" result="bump" />
            <feSpecularLighting in="bump" surfaceScale="14" specularConstant="0.9" specularExponent="22" lightingColor="#c9ccd3" result="spec">
              <feDistantLight azimuth="235" elevation="38" />
            </feSpecularLighting>
            <feComposite in="spec" in2="SourceAlpha" operator="in" result="specIn" />
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="edgeBlur" />
            <feSpecularLighting in="edgeBlur" surfaceScale="3" specularConstant="0.6" specularExponent="40" lightingColor="#ffffff" result="rim">
              <feDistantLight azimuth="225" elevation="55" />
            </feSpecularLighting>
            <feComposite in="rim" in2="SourceAlpha" operator="in" result="rimIn" />
            <feComposite in="SourceGraphic" in2="specIn" operator="arithmetic" k1="0" k2="1" k3="0.8" k4="0" result="lit" />
            <feComposite in="lit" in2="rimIn" operator="arithmetic" k1="0" k2="1" k3="0.25" k4="0" />
          </filter>
        </svg>
      </div>

      <div className="nx-foot-bottom">
        <nav className="nx-foot-links" aria-label="Footer">
          {SOCIAL.map((s) => (
            <a key={s.label} href={s.href}>
              {s.label}
            </a>
          ))}
          {NAV_LINKS.filter((item) => item.to).map((item) => (
            <Link key={item.label} to={item.to!}>
              {item.label}
            </Link>
          ))}
        </nav>
        <p className="nx-foot-meta">
          <span>&copy; 2026 Koraa Studios Ltd.</span>
          <span>RC 10005554</span>
        </p>
      </div>
    </footer>
  )
}
