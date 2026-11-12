import { Link } from 'react-router-dom'
import { NAV_LINKS, OFFICES } from '../data'
import { useInView } from '../hooks/useInView'
import { KoraMark } from './KoraMark'
import { useContact } from '../contact/useContact'
import { NEW_BUSINESS_EMAIL } from '../contact/sendBrief'

export function Footer() {
  const [footerRef, footerVisible] = useInView<HTMLElement>()
  const openContact = useContact()

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
          <a href={`mailto:${NEW_BUSINESS_EMAIL}`}>{NEW_BUSINESS_EMAIL}</a>
          <Link to="/brand-test">Take the brand test</Link>
          <button
            type="button"
            className="kora-pill is-solid is-large kora-footer-cta"
            onClick={() => openContact({ prefer: 'A call' })}
          >
            Book A Call
          </button>
        </div>
      </div>

      <div className="kora-footer-divider kora-container" aria-hidden="true" />

      <KoraMark className="kora-footer-logo kora-mark-drop" />

      <div className="kora-footer-meta kora-container">
        <span>&copy; 2026 Koraa Studios Ltd. All rights reserved.</span>
        {/* TODO(kora): placeholder registration number — swap for the real RC. */}
        <span className="kora-footer-rc">RC 1234567</span>
        <span>Designed &amp; built with care.</span>
      </div>
    </footer>
  )
}
