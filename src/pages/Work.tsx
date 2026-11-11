import { PROJECTS } from '../data'
import { ClientRow, Contact } from '../components/Sections'
import { PageStatement } from '../components/PageStatement'

/* Work — every client, one per row, in the same rows Home uses. */

export function Work() {
  return (
    <div className="kora-rx kora-rx-sub">
      <PageStatement title="Work">
        Kora is a global creative studio that brings brands, stories, and
        experiences to life through strategy, design, and motion.
      </PageStatement>

      <section className="kora-rx-work" aria-label="All work">
        <ul className="kora-rx-rows">
          {PROJECTS.map((project) => (
            <ClientRow key={project.name} project={project} />
          ))}
        </ul>
      </section>

      <Contact />
    </div>
  )
}
