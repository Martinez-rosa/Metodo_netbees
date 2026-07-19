import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

/**
 * Fondo de vídeo del Hero (skyline de Panamá). Con overlay de degradado en
 * `brand.paper` — fuerte donde vive el texto (izquierda), suave hacia la
 * derecha para que el vídeo siga siendo visible. Con `prefers-reduced-motion`
 * se muestra el poster estático, sin reproducir el vídeo.
 */
export function HeroVideoBackground() {
  const reduced = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v || reduced) return
    v.play().catch(() => {
      // Autoplay puede fallar en algunos navegadores; el poster queda visible.
    })
  }, [reduced])

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {reduced ? (
        <img
          src="/video/hero-bg-poster.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
      ) : (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          poster="/video/hero-bg-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/video/hero-bg.mp4" type="video/mp4" />
        </video>
      )}

      {/* Overlay: en móvil el texto ocupa todo el ancho → wash uniforme alto.
          En desktop el texto vive en la mitad izquierda → degradado L→R que
          deja el vídeo visible a la derecha. Garantiza contraste AA. */}
      <div className="absolute inset-0 bg-brand-paper/80 md:hidden" />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-brand-paper via-brand-paper/75 to-brand-paper/20 md:block" />
      {/* Refuerzo inferior: legibilidad de descriptor/CTAs y del indicador de scroll. */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-paper/70 to-transparent" />
      {/* Velo superior sutil: legibilidad del logo y el eyebrow. */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-brand-paper/60 to-transparent" />
    </div>
  )
}
