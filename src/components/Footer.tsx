import { Link } from 'react-router-dom'
import { NAV_LINKS, OFFICES } from '../data'
import { useInView } from '../hooks/useInView'
import { KoraMark } from './KoraMark'

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
            <span key={office.code}>{office.city}</span>
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

      {/* The name, set like a dictionary entry under the links: how to say
          it, and what it means. */}
      <div className="kora-footer-name kora-container">
        <p className="kora-footer-say">
          <span className="kora-footer-ipa">/ˈkɔːrə/</span>
          <span className="kora-footer-sound">KOR-uh</span>
        </p>
        <p className="kora-footer-pos">noun</p>
        <p className="kora-footer-meaning">
          Kora means harmony. It&rsquo;s what we bring to every brief:
          harmonizing ideas, people and craft until they move as one.
        </p>
      </div>

      <KoraMark className="kora-footer-logo kora-mark-drop" />

      <div className="kora-footer-meta kora-container">
        <span>&copy; 2026 Kora. All rights reserved.</span>
        {/* TODO(kora): placeholder registration number — swap for the real RC. */}
        <span className="kora-footer-rc">RC 1234567</span>
        <span>Designed &amp; built with care.</span>
      </div>
    </footer>
  )
}
