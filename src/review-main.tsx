import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MemoryRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

try {
  sessionStorage.setItem('koraa-intro-played', 'yes')
  localStorage.setItem('kora-cookie-notice', 'acknowledged')
} catch {
  /* storage can be blocked; the page still renders */
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MemoryRouter initialEntries={['/work/ipaybtc']}>
      <App />
    </MemoryRouter>
  </StrictMode>,
)
