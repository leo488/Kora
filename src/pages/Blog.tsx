import { POSTS } from '../data'
import { InnerPage } from '../components/rx/InnerPage'
import { PostCard } from '../components/rx/PostCard'

export function Blog() {
  return (
    <InnerPage
      label="Happenings"
      heading="Notes on branding, strategy, and building things that last."
    >
      <section className="kora-rx-news is-page" aria-label="All posts">
        <ul className="kora-rx-news-grid">
          {POSTS.map((post) => (
            <li key={post.title}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </section>
    </InnerPage>
  )
}
