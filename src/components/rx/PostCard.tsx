import { Link } from 'react-router-dom'
import type { Post } from '../../data'

/** A Happenings card: picture, then kind, title and byline, centred. */
export function PostCard({ post }: { post: Post }) {
  return (
    <Link to="/blog" className="kora-rx-card">
      {/* Left blank until the posts have art of their own. */}
      <div className="kora-rx-card-media" aria-hidden="true" />
      <div className="kora-rx-card-body">
        <span className="kora-rx-card-kind">{post.category}</span>
        <h3>{post.title}</h3>
        <span className="kora-rx-card-by">Kora, {post.date}</span>
      </div>
    </Link>
  )
}
