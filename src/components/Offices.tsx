import { useEffect, useState } from 'react'
import { OFFICES } from '../data'
import { ArrowIcon } from './icons'

/** "10:35 PM" in the office's own zone, matching the studio's US-style clock. */
const localTime = (timeZone: string) =>
  new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date())

function useLocalTimes() {
  const read = () =>
    Object.fromEntries(
      OFFICES.map((office) => [office.code, localTime(office.timeZone)]),
    )

  const [times, setTimes] = useState(read)

  // The clocks only ever show minutes, so a slow tick is enough to land the
  // rollover within a few seconds of the real one.
  useEffect(() => {
    const id = setInterval(() => setTimes(read()), 10_000)
    return () => clearInterval(id)
  }, [])

  return times
}

export function Offices() {
  const times = useLocalTimes()

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

            <p className="kora-office-time">{times[office.code]}</p>

            <address className="kora-office-address">
              {office.address.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>

            <div className="kora-office-contact">
              <a href={`mailto:${office.email}`}>{office.email}</a>
              {office.phone && (
                <a href={`tel:${office.phone.replace(/\s/g, '')}`}>
                  {office.phone}
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
