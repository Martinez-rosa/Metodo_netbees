import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { cn } from '../lib/cn'

interface SectionMarkerProps {
  /** Texto del marcador (label técnico). */
  children: string
  className?: string
  tone?: 'light' | 'dark'
}

/**
 * Marcador de sección estilo editorial: «§ ——— § · label».
 * El filete crece (scaleX) al entrar en viewport. El § y el label van en serif
 * itálica / mono. Firma visual heredada de la referencia.
 */
export function SectionMarker({ children, className, tone = 'light' }: SectionMarkerProps) {
  const reduced = useReducedMotion()
  const glyph = tone === 'dark' ? 'text-brand-paper/60' : 'text-brand-accent'
  const label = tone === 'dark' ? 'text-brand-paper/70' : 'text-brand-slate'
  const rule = tone === 'dark' ? 'bg-brand-paper/25' : 'bg-brand-line'

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span className={cn('font-serif text-xl italic leading-none', glyph)}>§</span>
      <motion.span
        aria-hidden
        className={cn('h-px w-16 origin-left', rule)}
        initial={{ scaleX: reduced ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-12% 0px' }}
        transition={{ duration: reduced ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
      <span className={cn('font-serif text-lg italic leading-none', glyph)}>§</span>
      <span className="text-brand-slate/40">·</span>
      <span className={cn('eyebrow', label)}>{children}</span>
    </div>
  )
}
