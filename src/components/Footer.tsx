import { Link } from 'react-router-dom'
import { NAV_LINKS, OFFICES } from '../data'
import { useInView } from '../hooks/useInView'

export function Footer() {
  const [footerRef, footerVisible] = useInView<HTMLElement>()

  return (
    <footer
      className={`kora-footer${footerVisible ? ' is-visible' : ''}`}
      ref={footerRef}
    >
      <div className="kora-footer-top kora-container">
        <div className="kora-footer-col">
          <h3>Sitemap</h3>
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
        </div>

        <div className="kora-footer-col">
          <h3>Offices</h3>
          {OFFICES.map((office) => (
            <span key={office}>{office}</span>
          ))}
        </div>

        <div className="kora-footer-col">
          <h3>Follow</h3>
          <a href="#">Instagram</a>
          <a href="#">LinkedIn</a>
          <a href="#">X</a>
        </div>

        <div className="kora-footer-col">
          <h3>Get In Touch</h3>
          <a href="mailto:hello@kora.studio">hello@kora.studio</a>
          <a href="#" className="kora-cta kora-footer-cta">
            Book A Call
          </a>
        </div>
      </div>

      <div className="kora-footer-divider kora-container" aria-hidden="true" />

      <img className="kora-footer-logo" src="/logo.svg" alt="Kora" />

      <div className="kora-footer-meta kora-container">
        <span>&copy; 2026 Kora. All rights reserved.</span>
        <span>Designed &amp; built with care.</span>
      </div>
    </footer>
  )
}
