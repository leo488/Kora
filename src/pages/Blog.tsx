import { POSTS } from '../data'

/* Blog: every post as a row, the picture on the left half and the title on
   the right, the same rows as the work list. */

export function Blog() {
  return (
    <div className="nx-page">
      <section className="nx-split nx-intro">
        <h1 className="nx-label">Blog</h1>
        <p className="nx-lead">Notes on branding, strategy, and building things that last.</p>
      </section>

      <ul className="nx-rows">
        {POSTS.map((post) => (
          <li key={post.title}>
            <div className="nx-row">
              <div className="nx-row-media kora-rx-media">
                <div className="kora-flare">
                  {post.image && <img src={post.image} alt="" loading="lazy" draggable={false} />}
                </div>
              </div>
              <div className="nx-row-text">
                <div className="nx-row-head">
                  <div>
                    <h3>{post.title}</h3>
                    <p className="nx-meta">
                      {post.category} · {post.date}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
