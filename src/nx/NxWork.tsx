import { PROJECTS } from '../data'
import { FEATURED } from './NxHome'
import { NxWorkList } from './NxWorkList'

/* Work: the same rows as Home, every project, case studies first. */
export function NxWork() {
  const rest = PROJECTS.map((p) => p.name).filter((n) => !FEATURED.includes(n))
  return (
    <div className="nx-page">
      <section className="nx-split nx-intro">
        <p className="nx-label">Work <sup>({PROJECTS.length})</sup></p>
        <p className="nx-lead">
          We help ambitious startups and businesses build brands and digital
          products that are ready to compete globally.
        </p>
      </section>
      <NxWorkList names={[...FEATURED, ...rest]} />
    </div>
  )
}
