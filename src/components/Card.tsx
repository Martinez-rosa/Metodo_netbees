import { type ReactNode, useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../lib/cn'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useFinePointer } from '../hooks/useMousePosition'
import { ENABLE_TILT } from '../lib/config'

interface CardProps {
  children: ReactNode
  className?: string
  /** Tilt 3D siguiendo al ratón (máx 6°). Solo actores. */
  tilt?: boolean
}

/**
 * Card del sistema: fondo white, borde 1px line, radio 4px, sombra mínima.
 * Hover → y:-6px, borde electric, filete superior de 2px (scaleX 0→1),
 * icono/interior con leve escala. Opcional tilt 3D (actores).
 */
export function Card({ children, className, tilt = false }: CardProps) {
  const reduced = useReducedMotion()
  const fine = useFinePointer()
  const ref = useRef<HTMLDivElement>(null)
  const canTilt = tilt && ENABLE_TILT && fine && !reduced

  const onMove = (e: React.MouseEvent) => {
    if (!canTilt || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    const max = 6 // grados
    ref.current.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg)`
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={reduced ? undefined : { y: -6 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'group relative overflow-hidden rounded-card border border-brand-line bg-brand-white p-7 shadow-card transition-[border-color,box-shadow,transform] duration-300 ease-expo will-change-transform',
        'hover:border-brand-accent/50 hover:shadow-card-hover',
        className,
      )}
      style={{ transformStyle: canTilt ? 'preserve-3d' : undefined }}
    >
      {/* Halo suave electric que aparece en hover. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 0%, rgba(250,210,0,0.06), transparent 70%)',
        }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  )
}
