import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap'

let instance: Lenis | null = null

/**
 * Monta Lenis una sola vez, lo integra con `gsap.ticker` para que ScrollTrigger
 * y todas las animaciones scroll-driven compartan el mismo bucle rAF.
 *
 * Reglas heredadas del hook `useLenis` anterior:
 *  - Respeta `prefers-reduced-motion` — si el usuario lo pide, NO monta Lenis
 *    y el scroll queda nativo (más rápido, sin interpolación).
 *  - Expone la instancia en `window.__lenis` para que `scrollToAnchor` desde
 *    Navbar/logo pueda seguir usándola sin importar directo.
 *  - Easing expo-out (misma curva que el `EASE_EXPO` del sistema).
 */
export function initLenis(): Lenis | null {
  if (typeof window === 'undefined' || instance) return instance

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) return null

  instance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    // `syncTouch: false` = móvil usa scroll nativo (más natural que sintetizado).
    syncTouch: false,
    touchMultiplier: 2,
  })

  // ScrollTrigger se actualiza en cada tick de Lenis (evita desincronización).
  instance.on('scroll', ScrollTrigger.update)
  // Un solo rAF para todo: gsap.ticker mueve a Lenis, y ScrollTrigger escucha.
  gsap.ticker.add((time) => instance?.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)

  ;(window as unknown as { __lenis?: Lenis }).__lenis = instance
  return instance
}

export function destroyLenis() {
  if (!instance) return
  instance.destroy()
  instance = null
  delete (window as unknown as { __lenis?: Lenis }).__lenis
}

/**
 * Compat: firma idéntica al viejo `scrollToAnchor` exportado por `useLenis`.
 * Si Lenis no está montado (reduced motion), cae a scrollIntoView nativo.
 */
export function scrollToAnchor(href: string) {
  const el = document.querySelector(href) as HTMLElement | null
  if (!el) return
  if (instance) {
    instance.scrollTo(el, { offset: -72 })
  } else {
    el.scrollIntoView({ block: 'start' })
  }
}
