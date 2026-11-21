import { Link, Navigate, useParams } from 'react-router-dom'
import { ARTICLES, articleFor } from '../blog/posts'
import { POSTS } from '../data'
import { Contact, NewsCard } from '../components/Sections'
import { SITE } from '../seo'
import '../blog/blog.css'

/* One article: kind and date, the title, the picture when there is one,
   the words, then two more posts and the contact block. */

export function BlogPost() {
  const { slug } = useParams()
  const article = articleFor(slug)
  if (!article) return <Navigate to="/blog" replace />
  const card = POSTS.find((p) => p.slug === article.slug)
  const more = POSTS.filter((p) => p.slug !== article.slug).slice(0, 2)
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    datePublished: article.published,
    author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    mainEntityOfPage: `${SITE.url}/blog/${article.slug}`,
  }

  return (
    <div className="kora-rx kora-rx-sub">
      <article className="kora-post">
        <header className="kora-post-head">
          <Link to="/blog" className="kora-post-back">
            Blog
          </Link>
          <span className="kora-post-meta">
            {article.category} · <time dateTime={article.published}>{article.date}</time>
          </span>
          <h1>{article.title}</h1>
          <p className="kora-post-lede">{article.description}</p>
        </header>

        {card?.image && (
          <figure className="kora-post-art kora-rx-media">
            <div className="kora-flare">
              <img src={card.image} alt="" draggable={false} />
            </div>
          </figure>
        )}

        <div className="kora-post-body">
          {article.body.map((b, i) =>
            'h' in b ? (
              <h2 key={i}>{b.h}</h2>
            ) : 'q' in b ? (
              <blockquote key={i}>{b.q}</blockquote>
            ) : 'list' in b ? (
              <ul key={i}>
                {b.list.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            ) : (
              <p key={i}>{b.p}</p>
            ),
          )}
        </div>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </article>

      {more.length > 0 && ARTICLES.length > 1 && (
        <section className="kora-rx-news is-page" aria-label="More posts">
          <h2 className="kora-post-more">More from the blog</h2>
          <ul className="kora-rx-news-grid">
            {more.map((post) => (
              <li key={post.slug}>
                <NewsCard post={post} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <Contact />
    </div>
  )
}
