import { gsap, ScrollTrigger } from '../lib/gsap'

/**
 * Timeline del Hero.
 *
 * v1: se probó una composición con 3 columnas de vidrio ("pilares") que se
 * materializaban con el scroll — se retiró porque las barras estorbaban a la
 * lectura del hero. Queda solo el swap semántico del subtítulo:
 * "Tres pilares, una sola *misión*" → "…una sola *arquitectura*". El scroll
 * se pinea 50vh (lo justo para el swap, sin bloquear al usuario) y el swap
 * ocurre linkeado al progress.
 *
 * Fallbacks:
 *  - Móvil (<768px): sin pin, subtítulo directo con "arquitectura".
 *  - Reduced motion: `buildHeroReducedTimeline` deja el estado final.
 */

export function buildHeroTimeline(container: HTMLElement): void {
  const swapInitial = container.querySelector<HTMLElement>('.hero-subtitle-swap')
  const swapFinal = container.querySelector<HTMLElement>('.hero-subtitle-final')
  if (!swapInitial || !swapFinal) return

  // Estado de partida: "arquitectura" invisible, apilada absoluta sobre "misión".
  gsap.set(swapFinal, {
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0,
    y: 12,
    pointerEvents: 'none',
  })

  ScrollTrigger.matchMedia({
    // ─────────────────────── Desktop ───────────────────────
    '(min-width: 768px)': () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          // Pin corto: 50vh es suficiente para el cross-fade del subtítulo
          // sin bloquear al usuario ni añadir espacio muerto en la página.
          end: '+=50%',
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // Cross-fade "misión" → "arquitectura" a lo largo del pin.
      tl.to(swapInitial, { opacity: 0, y: -8, duration: 0.5, ease: 'expo.out' }, 0)
      tl.to(swapFinal, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' }, 0)
    },

    // ─────────────────────── Móvil ───────────────────────
    // Sin pin; subtítulo directamente con "arquitectura".
    '(max-width: 767px)': () => {
      gsap.set(swapInitial, { opacity: 0 })
      gsap.set(swapFinal, { opacity: 1, y: 0 })
    },
  })
}

/** Reduced motion: estado final directo, sin pin ni scrub. */
export function buildHeroReducedTimeline(container: HTMLElement): void {
  const swapInitial = container.querySelector<HTMLElement>('.hero-subtitle-swap')
  const swapFinal = container.querySelector<HTMLElement>('.hero-subtitle-final')

  if (swapInitial) gsap.set(swapInitial, { opacity: 0 })
  if (swapFinal) {
    gsap.set(swapFinal, {
      position: 'absolute',
      left: 0,
      top: 0,
      opacity: 1,
      y: 0,
      pointerEvents: 'none',
    })
  }
}
