import { useEffect } from 'react'
import { applyMeta } from '../applyMeta'
import './rill.css'
import appleLogo from './logos/apple.svg'
import figmaLogo from './logos/figma.svg'
import gmailLogo from './logos/gmail.svg'
import netflixLogo from './logos/netflix.svg'
import openaiLogo from './logos/openai.svg'
import uberLogo from './logos/uber.svg'

/* The product's waitlist page. Unlisted: reached only by its link, never
   from the site's menus, and kept out of search (see seo.ts).
   The name lives here alone, so a rename is one line. */
const PRODUCT = { name: 'Rill', word: 'rill' }

/** Flip to true when the waitlist form and inbox are ready. */
const WAITLIST_OPEN = false

const FONT_HREF = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap'

const upcoming = [
  { name: 'ChatGPT Plus', when: 'Renews in 2 days', soon: true, amount: '$20', logo: openaiLogo },
  { name: 'Figma', when: 'Dec 3', soon: false, amount: '$16', logo: figmaLogo },
  { name: 'Netflix', when: 'Dec 5', soon: false, amount: '₦7,000', logo: netflixLogo },
]
const logged = [
  { name: 'Uber', source: 'From a bank alert · 9:14', amount: '₦4,200', logo: uberLogo },
  { name: 'iCloud+', source: 'From a Gmail receipt · Yesterday', amount: '$2.99', logo: appleLogo },
]

function Row({ logo, name, sub, amount, accent }: { logo: string; name: string; sub: string; amount: string; accent?: boolean }) {
  return (
    <div className="ow-row">
      <span className="ow-tile">
        <img src={logo} alt="" />
      </span>
      <span className="ow-row-text">
        <span className="ow-row-name">{name}</span>
        <span className={accent ? 'ow-row-sub is-accent' : 'ow-row-sub'}>{sub}</span>
      </span>
      <span className="ow-row-amount">{amount}</span>
    </div>
  )
}

/** The app's home screen, drawn in code so it stays sharp and editable. */
function PhoneScreen() {
  return (
    <div className="ow-screen" aria-hidden="true">
      <div className="ow-screen-head">
        <p className="ow-greet">
          Hi, Leo
          <br />
          <span>Here’s the latest</span>
        </p>
        <span className="ow-avatar">L</span>
      </div>
      <div className="ow-card is-hero">
        <span className="ow-label">Left to spend this month</span>
        <span className="ow-big">₦242,600</span>
        <span className="ow-note">
          <i /> You’re on track. Payday in 3 days.
        </span>
      </div>
      <div className="ow-card">
        <span className="ow-card-title">
          Coming up <em>See all</em>
        </span>
        {upcoming.map((u) => (
          <Row key={u.name} logo={u.logo} name={u.name} sub={u.when} amount={u.amount} accent={u.soon} />
        ))}
      </div>
      <div className="ow-card">
        <span className="ow-card-title">Logged for you</span>
        {logged.map((l) => (
          <Row key={l.name} logo={l.logo} name={l.name} sub={l.source} amount={l.amount} />
        ))}
      </div>
    </div>
  )
}

export function RillPage() {
  useEffect(() => {
    applyMeta('/rill')
    const robots = document.createElement('meta')
    robots.name = 'robots'
    robots.content = 'noindex, nofollow'
    document.head.appendChild(robots)
    const font = document.createElement('link')
    font.rel = 'stylesheet'
    font.href = FONT_HREF
    document.head.appendChild(font)
    document.documentElement.dataset.theme = 'dark'
    return () => {
      robots.remove()
      font.remove()
    }
  }, [])

  return (
    <div className="ow-page">
      <div className="ow-beam" />
      <header className="ow-head">
        <span className="ow-brand">
          <b>{PRODUCT.word}</b>
          <span>by Koraa’</span>
        </span>
        <a href="/">Back to Koraa’</a>
      </header>

      <main className="ow-main">
        <span className="ow-pill ow-up" style={{ animationDelay: '.05s' }}>
          <i /> Coming soon
        </span>
        <h1 className="ow-title">
          <span className="ow-line">
            <span className="ow-rise" style={{ animationDelay: '.1s' }}>
              All your money.
            </span>
          </span>
          <span className="ow-line">
            <span className="ow-rise ow-shine" style={{ animationDelay: '.2s, 1.2s' }}>
              None of the effort.
            </span>
          </span>
        </h1>
        <p className="ow-lede ow-up" style={{ animationDelay: '.35s' }}>
          {PRODUCT.name} reads your bank alerts and email receipts, logs every payment and keeps an eye on your
          subscriptions. You don’t type a thing.
        </p>

        <form className="ow-form ow-up" style={{ animationDelay: '.45s' }} onSubmit={(e) => e.preventDefault()}>
          <label className="ow-sr" htmlFor="ow-name">
            Your name
          </label>
          <input id="ow-name" name="name" placeholder="Your name" autoComplete="name" disabled={!WAITLIST_OPEN} />
          <label className="ow-sr" htmlFor="ow-email">
            Email address
          </label>
          <input
            id="ow-email"
            name="email"
            type="email"
            placeholder="Email address"
            autoComplete="email"
            disabled={!WAITLIST_OPEN}
          />
          <button type="submit" disabled={!WAITLIST_OPEN}>
            {WAITLIST_OPEN ? (
              'Join the waitlist'
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="5" y="11" width="14" height="10" rx="3" />
                  <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                </svg>
                Waitlist opens soon
              </>
            )}
          </button>
        </form>
        <p className="ow-fine ow-up" style={{ animationDelay: '.55s' }}>
          Read-only access. {PRODUCT.name} never moves your money.
        </p>

        <div className="ow-stage ow-up" style={{ animationDelay: '.6s' }}>
          <div className="ow-horizon" />
          <div className="ow-edge-wrap">
            <div className="ow-edge" />
          </div>
          <div className="ow-phone">
            <div className="ow-phone-inner">
              <PhoneScreen />
              <div className="ow-toast ow-toast-a">
                <span className="ow-tile">
                  <img src={uberLogo} alt="" />
                </span>
                <span className="ow-row-text">
                  <span className="ow-row-name">Logged: Uber</span>
                  <span className="ow-row-sub">From your bank alert</span>
                </span>
                <span className="ow-row-amount">₦4,200</span>
              </div>
              <div className="ow-toast ow-toast-b">
                <span className="ow-tile">
                  <img src={figmaLogo} alt="" />
                </span>
                <span className="ow-row-text">
                  <span className="ow-row-name">Logged: Figma</span>
                  <span className="ow-row-sub">From your Gmail receipt</span>
                </span>
                <span className="ow-row-amount">$16</span>
              </div>
            </div>
          </div>

          <div className="ow-fly ow-fly-l" aria-hidden="true">
            <span className="ow-fly-meta">SMS · your bank · now</span>
            <strong>Debit alert: ₦4,200.00</strong>
            <span className="ow-fly-sub">UBER BV LAGOS NG</span>
          </div>
          <div className="ow-fly ow-fly-r" aria-hidden="true">
            <span className="ow-fly-meta">
              <img src={gmailLogo} alt="" /> Gmail · Figma · now
            </span>
            <strong>Your receipt from Figma</strong>
            <span className="ow-fly-sub">Professional plan · $16.00</span>
          </div>
        </div>
      </main>
    </div>
  )
}
