import { useEffect, useState } from 'react'

const STORAGE_KEY = 'kora-cookie-notice'

// Storage throws outright in some privacy modes, so every access is guarded —
// a browser that will not remember the dismissal should still render the site.
const alreadyAcknowledged = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'acknowledged'
  } catch {
    return false
  }
}

export function CookieBar() {
  const [open, setOpen] = useState(false)
  const [leaving, setLeaving] = useState(false)

  // Deciding on the client after mount keeps the bar from flashing up for
  // someone who dismissed it on a previous visit.
  useEffect(() => {
    if (!alreadyAcknowledged()) setOpen(true)
  }, [])

  if (!open) return null

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'acknowledged')
    } catch {
      // Not persisting is a worse experience, not a broken one.
    }
    // Let the slide-out finish before the bar leaves the tree.
    setLeaving(true)
    setTimeout(() => setOpen(false), 300)
  }

  return (
    <div
      className={`kora-cookiebar${leaving ? ' is-leaving' : ''}`}
      role="region"
      aria-label="Cookie notice"
    >
      <p>
        This website uses cookies to anonymously track usage. No personally
        identifiable information is stored or shared.
      </p>

      <button type="button" onClick={dismiss}>
        Got it!
      </button>
    </div>
  )
}
