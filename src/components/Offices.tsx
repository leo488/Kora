import { useEffect, useState } from 'react'

/** "7:10 AM" in Abuja, matching the studio's US-style clock. */
const localTime = () =>
  new Intl.DateTimeFormat('en-US', {
    timeZone: 'Africa/Lagos',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date())

/** The studio's clock: one full-width purple band showing the time in Abuja. */
export function Offices() {
  const [time, setTime] = useState(localTime)

  // The clock only shows minutes, so a slow tick lands the rollover within a
  // few seconds of the real one.
  useEffect(() => {
    const id = setInterval(() => setTime(localTime()), 10_000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="kora-offices" aria-label="Local time in Abuja">
      <div className="kora-offices-inner kora-container">
        <p className="kora-offices-label">Abuja, local time</p>
        <p className="kora-office-time">{time}</p>
      </div>
    </section>
  )
}
