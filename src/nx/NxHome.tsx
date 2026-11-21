import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { BrandMarquee } from '../components/BrandMarquee'
import { KoraMark } from '../components/KoraMark'
import { POSTS, SERVICES } from '../data'
import { NxArrow } from './NxHeader'
import { NxWorkList } from './NxWorkList'

/* Home, laid out after Nonstop: the intro on the right half, the wordmark
   across the whole page, the client logos, then the work one row at a time,
   services as an accordion, happenings, the newsletter. Every section keeps
   the same split: a small label on the left half, the content on the right. */

export const FEATURED = ['Ipaybtc', 'Refreeg', '3Projects', 'Tagmi']

export function NxHome() {
  return (
    <div className="nx-page nx-home">
      <section className="nx-split nx-intro">
        <div />
        <p className="nx-lead">
          We help ambitious startups and businesses build brands and digital
          products that are ready to compete globally.
        </p>
      </section>

      <div className="nx-mark" aria-hidden="true">
        <KoraMark />
      </div>

      <section className="nx-logos" aria-label="Brands we have worked with">
        <BrandMarquee />
      </section>

      <section className="nx-split nx-section">
        <p className="nx-label">Selected work</p>
        <p className="nx-lead">
          Brand identities, products and campaigns for founders in Nigeria and
          beyond.
        </p>
      </section>

      <NxWorkList names={FEATURED} />

      <div className="nx-split nx-more">
        <div />
        <Link to="/work" className="nx-link">
          All work <NxArrow />
        </Link>
      </div>

      <section className="nx-split nx-section">
        <p className="nx-label">Services</p>
        <Accordion items={SERVICES.map((s) => ({ title: s.name, body: s.description }))} />
      </section>

      <section className="nx-split nx-section">
        <p className="nx-label">Happenings</p>
        <ul className="nx-list">
          {POSTS.slice(0, 3).map((post) => (
            <li key={post.title}>
              <Link to="/blog" className="nx-list-row">
                <span className="nx-list-thumb">
                  {post.image && <img src={post.image} alt="" loading="lazy" />}
                </span>
                <span className="nx-list-title">{post.title}</span>
                <span className="nx-meta">
                  {post.category} · {post.date}
                </span>
                <NxArrow />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Newsletter />
    </div>
  )
}

export function Accordion({
  items,
  open: first = -1,
}: {
  items: Array<{ title: string; body: string | string[] }>
  open?: number
}) {
  const [open, setOpen] = useState(first)
  return (
    <ul className="nx-acc">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <li key={item.title} className={isOpen ? 'is-open' : undefined}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span>{item.title}</span>
              <span className="nx-acc-sign" aria-hidden="true">
                {isOpen ? '−' : '+'}
              </span>
            </button>
            {isOpen && (
              <div className="nx-acc-body">
                {(Array.isArray(item.body) ? item.body : [item.body]).map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

function Newsletter() {
  const [sent, setSent] = useState(false)
  // TODO(kora): wire to the mailing-list provider; for now it only confirms.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
  }
  return (
    <section className="nx-split nx-section">
      <p className="nx-label">From Koraa’ to your inbox</p>
      {sent ? (
        <p className="nx-lead" role="status">
          Thanks, you’re on the list.
        </p>
      ) : (
        <form className="nx-inline-form" onSubmit={onSubmit}>
          <label htmlFor="nx-news-email" className="kora-visually-hidden">
            Your email address
          </label>
          <input
            id="nx-news-email"
            type="email"
            required
            autoComplete="email"
            placeholder="Your email address"
          />
          <button type="submit" className="nx-btn">
            Sign up <NxArrow />
          </button>
        </form>
      )}
    </section>
  )
}
