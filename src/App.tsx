import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Intro } from './components/Intro'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Work } from './pages/Work'
import { About } from './pages/About'
import { Blog } from './pages/Blog'
import { CaseStudy } from './pages/CaseStudy'
import { BrandTest } from './pages/BrandTest'
import { BlogPost } from './pages/BlogPost'
import { ContactPage } from './pages/Contact'

function App() {
  return (
    <>
      {/* Outside the router and outside .kora-app: a sibling of the whole page,
          so no ancestor transform can trap its fixed positioning. */}
      {/* The Koraa’ logo animation, once per visit, whichever page it opens on. */}
      <Intro />

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/brand-test" element={<BrandTest />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
