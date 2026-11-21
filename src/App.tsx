import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Intro } from './components/Intro'
import { Layout } from './components/Layout'
import { NxHome } from './nx/NxHome'
import { NxCase } from './nx/NxCase'
import { NxContact } from './nx/NxContact'
import { NxWork } from './nx/NxWork'
import { About } from './pages/About'
import { Blog } from './pages/Blog'
import { BrandTest } from './pages/BrandTest'
import { BlogPost } from './pages/BlogPost'

function App() {
  return (
    <>
      {/* Outside the router and outside .kora-app: a sibling of the whole page,
          so no ancestor transform can trap its fixed positioning. */}
      {/* The Koraa’ logo animation, once per visit, whichever page it opens on. */}
      <Intro />

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<NxHome />} />
          <Route path="/work" element={<NxWork />} />
          <Route path="/work/:slug" element={<NxCase />} />
          <Route path="/contact" element={<NxContact />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/brand-test" element={<BrandTest />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
