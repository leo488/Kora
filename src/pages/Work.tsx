import { PROJECTS } from '../data'
import { WorkCard } from '../components/WorkCard'

/* Work index — the whole portfolio, every project and every plate it has. The
   home reel is a short cut of this; this is the full thing. */

export function Work() {
  return (
    <section className="kora-page-work">
      <header className="kora-page-work-intro kora-container">
        <p>
          Kora is a global creative studio that brings brands, stories, and
          experiences to life through strategy, design, and motion.
        </p>
      </header>

      <ul className="kora-work-grid">
        {PROJECTS.map((project, i) => (
          <WorkCard key={project.name} project={project} eager={i < 2} />
        ))}
      </ul>
    </section>
  )
}
