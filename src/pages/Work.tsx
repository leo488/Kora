import { PROJECTS } from '../data'
import { ClientRow, Contact } from '../components/Sections'
import { PageStatement } from '../components/PageStatement'

/* Work — every client, one per row, in the same rows Home uses. */

export function Work() {
  return (
    <div className="kora-rx kora-rx-sub">
      <PageStatement title="Work">
        Koraa’ is a global creative studio that brings brands, stories, and
        experiences to life through strategy, design, and motion.
      </PageStatement>

      <section className="kora-rx-work" aria-labelledby="kora-rx-work-label">
        <p className="kora-label kora-rx-work-label" id="kora-rx-work-label">
          All work <sup>({PROJECTS.length})</sup>
        </p>
        <ul className="kora-rx-rows">
          {PROJECTS.map((project, i) => (
            <ClientRow key={project.name} project={project} index={i} />
          ))}
        </ul>
      </section>

      <Contact />
    </div>
  )
}
