import { useEffect, useState } from 'react'
import { useInView } from '../hooks/useInView'
import { ArrowIcon } from './icons'
import { srcSetFor } from '../data'
import type { Project } from '../data'

/** How long each plate holds before a multi-frame card moves on. */
const HOLD_MS = 2800

interface WorkCardProps {
  project: Project
  /** The first row is above the fold, so it decodes eagerly. */
  eager?: boolean
}

/**
 * One project on the Work wall. A project with more than one plate cycles
 * through them in place, so the card reads as a loop of the work rather than a
 * single cover — and only once it has been scrolled to, so a page of nine cards
 * is not running nine timers against frames nobody is looking at.
 */
export function WorkCard({ project, eager }: WorkCardProps) {
  const [ref, visible] = useInView<HTMLLIElement>()
  const [index, setIndex] = useState(0)
  const frames = project.images
  const cycles = frames.length > 1

  useEffect(() => {
    if (!visible || !cycles) return
    const id = setInterval(
      () => setIndex((n) => (n + 1) % frames.length),
      HOLD_MS,
    )
    return () => clearInterval(id)
  }, [visible, cycles, frames.length])

  return (
    <li ref={ref} className={`kora-work-item${visible ? ' is-visible' : ''}`}>
      <a href="#" className="kora-work-card">
        <div className="kora-work-thumb">
          {frames.map((image, i) => (
            <img
              key={image.src}
              className={i === index ? 'is-active' : ''}
              src={image.src}
              srcSet={srcSetFor(image)}
              /* Two up on a wide screen, one up on a phone. */
              sizes="(max-width: 900px) 100vw, 50vw"
              /* Only the lead plate is announced; the rest are the same work. */
              alt={i === 0 ? project.brand : ''}
              aria-hidden={i === 0 ? undefined : true}
              loading={eager && i === 0 ? 'eager' : 'lazy'}
              draggable={false}
            />
          ))}

          {cycles && (
            <div className="kora-work-ticks" aria-hidden="true">
              {frames.map((image, i) => (
                <span
                  key={image.src}
                  className={i === index ? 'is-active' : ''}
                />
              ))}
            </div>
          )}
        </div>

        <div className="kora-work-caption">
          <span className="kora-work-kind">Work</span>
          <div className="kora-work-text">
            <h2>{project.brand}</h2>
            <p>{project.headline}</p>
            <span className="kora-work-meta">
              {project.category} &middot; {project.year}
              {frames.length > 1 && ` · ${frames.length} frames`}
            </span>
          </div>

          <ArrowIcon className="kora-work-arrow" />
        </div>
      </a>
    </li>
  )
}
