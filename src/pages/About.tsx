import { Link } from 'react-router-dom'
import { SERVICES } from '../data'
import { Accordion } from '../nx/NxHome'
import { NxArrow } from '../nx/NxHeader'

/* About, in the site's split layout: labels on the left half, content on the
   right. The full page is still being written. */

export function About() {
  return (
    <div className="nx-page">
      <section className="nx-split nx-intro">
        <h1 className="nx-label">About</h1>
        <p className="nx-lead">
          Coming soon. We are rebuilding this page. In the meantime, the work
          speaks for itself.
        </p>
      </section>

      <div className="nx-split nx-more">
        <div />
        <Link to="/work" className="nx-link">
          See the work <NxArrow />
        </Link>
      </div>

      <section className="nx-split nx-section">
        <p className="nx-label">Services</p>
        <Accordion items={SERVICES.map((s) => ({ title: s.name, body: s.description }))} />
      </section>
    </div>
  )
}
