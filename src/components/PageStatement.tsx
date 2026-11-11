import type { ReactNode } from 'react'
import { useInView } from '../hooks/useInView'

/** The opening of every page: the homepage statement — a short bold title,
 *  then one large line. */
export function PageStatement({ title, children }: { title: string; children: ReactNode }) {
  const [ref, visible] = useInView<HTMLElement>()
  return (
    <section
      className={`kora-rx-statement kora-rx-reveal${visible ? ' is-visible' : ''}`}
      ref={ref}
    >
      <h1>{title}</h1>
      <p>{children}</p>
    </section>
  )
}
