import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '../lib/cn'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface PlaceholderProps {
  /** Ratio de aspecto, ej. '4:3', '16:9', '1:1'. */
  ratio?: string
  /** Etiqueta central en Barlow Condensed. */
  label: string
  className?: string
  /** Ruta real de imagen (si existe, se muestra en vez del placeholder). */
  src?: string
  alt?: string
}

/** Convierte '4:3' en el valor CSS aspect-ratio. */
function toAspect(ratio: string): string {
  const [w, h] = ratio.split(':')
  return `${w} / ${h}`
}

/**
 * Placeholder editorial (no una caja gris): degradado paper→line, rejilla
 * técnica, grano al 4%, un blob electric/indigo desenfocado que se mueve y
 * parallax interno de la imagen al scrollear (-12%).
 * Cuando `src` está definido, muestra la imagen real con el mismo parallax.
 */
export function Placeholder({ ratio = '4:3', label, className, src, alt }: PlaceholderProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // Parallax interno tipo revista: la capa se mueve -12% dentro de la máscara.
  const yPct = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <div
      ref={ref}
      className={cn(
        'grain relative overflow-hidden rounded-card border border-brand-line',
        className,
      )}
      style={{ aspectRatio: toAspect(ratio) }}
    >
      <motion.div
        style={reduced ? undefined : { y: yPct }}
        className="absolute inset-[-8%] will-change-transform"
      >
        {src ? (
          <img src={src} alt={alt ?? label} className="h-full w-full object-cover" />
        ) : (
          <>
            {/* Degradado base paper→line. */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-paper to-brand-line" />
            {/* Rejilla técnica sobreimpresa. */}
            <div className="tech-grid absolute inset-0" />
            {/* Blob electric/indigo desenfocado en movimiento lento. */}
            <div className="absolute left-1/4 top-1/3 h-2/3 w-2/3 animate-aurora-drift rounded-full bg-brand-indigo/25 blur-[60px]" />
            <div className="absolute right-1/4 bottom-1/4 h-1/2 w-1/2 animate-aurora-drift rounded-full bg-brand-electric/20 blur-[70px] [animation-delay:-8s]" />
          </>
        )}
      </motion.div>

      {/* Etiqueta central: ratio + descripción de lo que irá aquí. */}
      {!src && (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <span className="rounded-card border border-brand-ink/10 bg-brand-white/60 px-3 py-1.5 text-center font-label text-[11px] font-semibold uppercase tracking-label text-brand-slate backdrop-blur-sm">
            {label}
          </span>
        </div>
      )}
    </div>
  )
}
