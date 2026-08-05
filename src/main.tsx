import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { PoliticaPrivacidad } from './pages/PoliticaPrivacidad'
import { PoliticaCookies } from './pages/PoliticaCookies'
import { CookieConsent } from './components/CookieConsent'
import { initLenis } from './lib/lenis'
import './index.css'

// Enrutado mínimo por path, sin librería de router: solo 3 páginas estáticas.
const path = window.location.pathname.replace(/\/+$/, '') || '/'
const page =
  path === '/privacidad' ? (
    <PoliticaPrivacidad />
  ) : path === '/cookies' ? (
    <PoliticaCookies />
  ) : (
    <App />
  )

// Smooth scroll global integrado con gsap.ticker + ScrollTrigger. Solo la
// landing (scrollytelling) lo necesita; las páginas legales son estáticas.
// Respeta prefers-reduced-motion (no monta Lenis en ese caso).
if (path === '/') initLenis()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {page}
    <CookieConsent />
  </StrictMode>,
)
