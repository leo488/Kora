import { Link } from 'react-router-dom'
import { srcSetFor } from '../../data'
import type { Project } from '../../data'
import { FlareMedia } from './Flare'

/** "Brand — Line" headlines lose the brand, which the row already names. */
function lineOf(project: Project) {
  const [, rest] = project.headline.split(/\s+—\s+/)
  return (rest ?? project.headline).replace(/\.$/, '')
}

/** One client, set as Ragged Edge sets theirs: the name at the top left; at
 *  the bottom left the line, then the result with its round marker, then a
 *  quiet line under it; the work large on the right. */
export function ClientRow({ project }: { project: Project }) {
  const lead = project.images[0]
  const hasStat = project.stat && project.stat !== '—'

  return (
    <li className="kora-rx-row">
      <Link to="/work" className="kora-rx-row-link">
        <div className="kora-rx-row-text">
          <h2>{project.brand}</h2>

          <div className="kora-rx-row-detail">
            <p className="kora-rx-row-line">
              {project.brand} — {lineOf(project)}.
            </p>
            {hasStat && (
              <p className="kora-rx-row-stat">
                <span className="kora-rx-plus" aria-hidden="true" />
                {project.stat}
              </p>
            )}
            {/* TODO(kora): Ragged Edge says what the number is here ("Valuation
                within three months of the rebrand"). Until each project has
                that line, the sector and year stand in. */}
            <p className="kora-rx-row-meta">
              {project.category}, {project.year}
            </p>
          </div>
        </div>

        <FlareMedia className="kora-rx-row-media">
          {project.film ? (
            <video
              src={project.film.src}
              poster={project.film.poster.src}
              muted
              loop
              autoPlay
              playsInline
              preload="metadata"
              aria-label={project.brand}
              disablePictureInPicture
            />
          ) : (
            <img
              src={lead.src}
              srcSet={srcSetFor(lead)}
              sizes="(max-width: 760px) 100vw, 66vw"
              alt={project.brand}
              loading="lazy"
              draggable={false}
            />
          )}
        </FlareMedia>
      </Link>
    </li>
  )
}
