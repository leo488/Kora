import { POSTS } from '../data'
import { Contact, NewsCard } from '../components/Sections'
import { PageStatement } from '../components/PageStatement'

/* Blog — every post, as the same cards Home's Happenings uses. */

export function Blog() {
  return (
    <div className="kora-rx kora-rx-sub">
      <PageStatement title="Blog">
        Notes on branding, strategy, and building things that last.
      </PageStatement>

      <section className="kora-rx-news is-page" aria-label="Posts">
        <ul className="kora-rx-news-grid">
          {POSTS.map((post) => (
            <li key={post.title}>
              <NewsCard post={post} />
            </li>
          ))}
        </ul>
      </section>

      <Contact />
    </div>
  )
}
