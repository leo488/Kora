export function ChevronIcon() {
  return (
    <svg
      className="kora-nav-chevron"
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1 1L5 5L9 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ArrowIcon({ className = 'kora-arrow' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="15"
      height="16"
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* The barbs are curves, not straight strokes, and they sweep back much
          further than they drop — a narrow head that hugs the shaft rather than
          the blunt 45-degree V this replaces. */}
      <path
        d="M0.9 8H13.4M13.4 8C11.5 7.2 9.2 5.6 8.2 3.1M13.4 8C11.5 8.8 9.2 10.4 8.2 12.9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Hamburger that morphs into a close cross — the bars are positioned by CSS so
 *  the open state is a class change rather than a second icon. */
export function MenuIcon() {
  return (
    <span className="kora-menu-icon" aria-hidden="true">
      <span />
      <span />
    </span>
  )
}

export function CopyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="6.25" y="6.25" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M11.75 3.75v-.5a1.5 1.5 0 0 0-1.5-1.5h-6a1.5 1.5 0 0 0-1.5 1.5v6a1.5 1.5 0 0 0 1.5 1.5h.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M3.5 9.5l3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
