import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../lib/cn'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { Icon } from './Icon'
import type { MetodoPunto } from '../data/content'

interface OpenInnovationVideoProps {
  src: string
  poster: string
  alt: string
  badges: MetodoPunto[]
  className?: string
}

/**
 * Vídeo enmarcado estilo "hero" (referencia: digitalheroesco.com) — halo
 * radial difuso detrás, tarjeta con ring + sombra dramática, y píldoras de
 * vidrio flotando sobre los bordes. Reservado para piezas destacadas (una
 * por página); el resto de vídeos usa `PilarVideo`.
 */
export function OpenInnovationVideo({ src, poster, alt, badges, className }: OpenInnovationVideoProps) {
  const reduced = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    const wrap = wrapRef.current
    if (!video || !wrap || reduced) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.2 },
    )
    io.observe(wrap)
    return () => io.disconnect()
  }, [reduced])

  return (
    <div ref={wrapRef} className={cn('relative', className)}>
      {/* Halo: blobs radiales difusos detrás de la tarjeta. */}
      <div aria-hidden className="pointer-events-none absolute inset-[-14%] -z-10">
        <div className="absolute left-[4%] top-[2%] h-[65%] w-[65%] rounded-full bg-brand-electric/[0.16] blur-[70px]" />
        <div className="absolute bottom-0 right-[6%] h-[55%] w-[55%] rounded-full bg-brand-teal/[0.12] blur-[80px]" />
      </div>

      {/* Tarjeta: ring + sombra amplia y difusa, sin recorte crudo. */}
      <div className="grain relative overflow-hidden rounded-card-lg border border-brand-line shadow-float">
        <div className="relative aspect-video w-full">
          {reduced ? (
            <img src={poster} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              poster={poster}
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={alt}
            >
              <source src={src} type="video/mp4" />
            </video>
          )}
        </div>
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_40px_8px_rgba(11,11,16,0.12)]" />
      </div>

      {/* Píldoras flotantes tipo "vidrio", ancladas a las esquinas de la tarjeta. */}
      {badges[0] && (
        <motion.div
          aria-hidden
          className="absolute -left-4 top-8 z-10 hidden items-center gap-2 rounded-pill border border-brand-line/80 bg-brand-white/90 px-4 py-2 shadow-pill backdrop-blur-xl sm:flex md:-left-7"
          animate={reduced ? undefined : { y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        >
          <Icon name={badges[0].icon} className="h-4 w-4 text-brand-accent" strokeWidth={1.75} />
          <span className="font-label text-[11px] font-semibold uppercase tracking-label text-brand-ink">
            {badges[0].texto}
          </span>
        </motion.div>
      )}
      {badges[1] && (
        <motion.div
          aria-hidden
          className="absolute -right-4 bottom-8 z-10 hidden items-center gap-2 rounded-pill border border-brand-line/80 bg-brand-white/90 px-4 py-2 shadow-pill backdrop-blur-xl sm:flex md:-right-7"
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.3 }}
        >
          <Icon name={badges[1].icon} className="h-4 w-4 text-brand-accent" strokeWidth={1.75} />
          <span className="font-label text-[11px] font-semibold uppercase tracking-label text-brand-ink">
            {badges[1].texto}
          </span>
        </motion.div>
      )}
    </div>
  )
}
