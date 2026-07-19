import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { initLenis } from './lib/lenis'
import './index.css'

// Smooth scroll global integrado con gsap.ticker + ScrollTrigger.
// Respeta prefers-reduced-motion (no monta Lenis en ese caso).
initLenis()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
