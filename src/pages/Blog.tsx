const POSTS = [
  {
    title: 'Why Bold Branding Wins in Fintech',
    category: 'Branding',
    date: 'Jun 2026',
  },
  {
    title: 'Designing for Trust: Lessons From iPayBTC',
    category: 'Case Study',
    date: 'May 2026',
  },
  {
    title: 'The Future of Visual Identity in Web3',
    category: 'Insights',
    date: 'Apr 2026',
  },
  {
    title: 'What a Global Studio Learns From Local Markets',
    category: 'Studio Notes',
    date: 'Mar 2026',
  },
]

export function Blog() {
  return (
    <section className="kora-page-blog kora-container">
      <header className="kora-page-blog-header">
        <h1>Blog</h1>
        <p>Notes on branding, strategy, and building things that last.</p>
      </header>

      <ul className="kora-page-blog-list">
        {POSTS.map((post) => (
          <li key={post.title}>
            <a href="#" className="kora-page-blog-post">
              <div className="kora-page-blog-thumb" aria-hidden="true" />
              <div className="kora-page-blog-meta">
                <span>{post.category}</span>
                <span>{post.date}</span>
              </div>
              <h2>{post.title}</h2>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
