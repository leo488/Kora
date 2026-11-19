import { OFFICES } from '../data'
import { ArrowIcon } from './icons'

export function Offices() {

  return (
    <section className="kora-offices" aria-labelledby="kora-offices-heading">
      <h2 id="kora-offices-heading" className="kora-visually-hidden">
        Our offices
      </h2>

      <ul className="kora-offices-grid kora-container">
        {OFFICES.map((office) => (
          <li key={office.code} className="kora-office">
            <a
              className="kora-office-code"
              href={office.mapUrl}
              target="_blank"
              rel="noreferrer"
            >
              {office.code}
              <ArrowIcon className="kora-office-arrow" />
              <span className="kora-visually-hidden">
                — {office.city} on the map
              </span>
            </a>


            <address className="kora-office-address">
              {office.address.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>

          </li>
        ))}
      </ul>
    </section>
  )
}
