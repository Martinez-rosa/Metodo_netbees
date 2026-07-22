import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '../lib/cn'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface PilarVideoProps {
  src: string
  poster: string
  alt: string
  className?: string
}

/**
 * Vídeo horizontal para las tarjetas de pilares. Recorte 16:9, con una
 * máscara de degradado + grano para suavizar el vídeo (nunca a pantalla
 * completa/crudo) y el mismo parallax interno que el resto de placeholders.
 * Se pausa fuera de viewport y respeta `prefers-reduced-motion` (poster fijo).
 */
export function PilarVideo({ src, poster, alt, className }: PilarVideoProps) {
  const reduced = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start end', 'end start'],
  })
  const yPct = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  useEffect(() => {
    const video = videoRef.current
    const wrap = wrapRef.current
    if (!video || !wrap || reduced) return

    // Importante: observamos el contenedor ESTÁTICO (wrap), no el <video>.
    // El vídeo vive dentro de un motion.div con parallax interno (`y: yPct`),
    // así que su propio bounding box se mueve unos sub-píxeles en cada frame.
    // Si se observa el <video> directamente, esa vibración hace que la
    // intersección oscile justo en el umbral y dispara play()/pause() en
    // bucle rápido — el vídeo "se corta" en vez de repetirse con fluidez.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.15 },
    )
    io.observe(wrap)
    return () => io.disconnect()
  }, [reduced])

  return (
    <div
      ref={wrapRef}
      className={cn(
        'grain relative aspect-[16/9] overflow-hidden rounded-card border border-brand-line',
        className,
      )}
    >
      <motion.div
        style={reduced ? undefined : { y: yPct }}
        className="absolute inset-[-8%] will-change-transform"
      >
        {reduced ? (
          <img src={poster} alt={alt} className="h-full w-full object-cover" />
        ) : (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            poster={poster}
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={src} type="video/mp4" />
          </video>
        )}
      </motion.div>

      {/* Máscara: degradado en paper + viñeta suave — atenúa el vídeo, nunca
          crudo/intenso, en línea con el resto de la dirección de arte. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-ink/25 via-transparent to-brand-paper/10" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: 'inset 0 0 40px 6px rgba(11,11,16,0.18)' }}
      />
    </div>
  )
}
