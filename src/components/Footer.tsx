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
    <footer className="kora-footer">
      <dl className="kora-footer-list kora-container">
        <div className="kora-footer-item">
          <dt>New business</dt>
          <dd>
            <a href={`mailto:${NEW_BUSINESS_EMAIL}`}>{NEW_BUSINESS_EMAIL}</a>
          </dd>
          <dd className="kora-footer-item-action">
            <CopyText text={NEW_BUSINESS_EMAIL} />
          </dd>
        </div>
        <div className="kora-footer-item">
          <dt>Find us</dt>
          <dd>Victoria Island, Lagos · Wuse II, Abuja</dd>
        </div>
        <div className="kora-footer-item">
          <dt>Brand test</dt>
          <dd>
            <Link to="/brand-test">Take the brand test</Link>
          </dd>
        </div>
      </dl>

      <div className="kora-footer-pills kora-container">
        <button
          type="button"
          className="kora-pill is-solid kora-footer-cta"
          onClick={() => openContact({ prefer: 'A call' })}
        >
          Book A Call
        </button>
        <div className="kora-footer-social">
          {SOCIAL.map((s) => (
            <a key={s.label} className="kora-pill is-solid" href={s.href}>
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <nav className="kora-footer-sitemap kora-container" aria-label="Footer">
        {NAV_LINKS.map((item) =>
          item.to ? (
            <Link key={item.label} to={item.to}>
              {item.label}
            </Link>
          ) : (
            <a key={item.label} href="#">
              {item.label}
            </a>
          ),
        )}
      </nav>

      <div ref={logoRef} className="kora-footer-logo-box">
        <KoraMark className="kora-footer-logo" />
      </div>

      <div className="kora-footer-meta kora-container">
        <span>&copy; 2026 Koraa Studios Ltd. All rights reserved.</span>
        <span className="kora-footer-rc">RC 10005554</span>
        <span>Designed &amp; built with care.</span>
      </div>
    </footer>
  )
}
