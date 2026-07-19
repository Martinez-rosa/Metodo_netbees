import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { cn } from '../lib/cn'

interface EyebrowProps {
  children: string
  className?: string
  tone?: 'electric' | 'slate' | 'paper'
  /** Filete de 2px que crece (scaleX) delante del texto. */
  rule?: boolean
}

const toneClass: Record<NonNullable<EyebrowProps['tone']>, string> = {
  electric: 'text-brand-accent',
  slate: 'text-brand-slate',
  paper: 'text-brand-paper/70',
}

/** Etiqueta técnica numerada, con filete animado opcional. */
export function Eyebrow({ children, className, tone = 'electric', rule = true }: EyebrowProps) {
  const reduced = useReducedMotion()
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {rule && (
        <motion.span
          aria-hidden
          className="h-px w-8 origin-left bg-current opacity-70"
          initial={{ scaleX: reduced ? 1 : 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-12% 0px' }}
          transition={{ duration: reduced ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ color: 'inherit' }}
        />
      )}
      <span className={cn('eyebrow', toneClass[tone])}>{children}</span>
    </div>
  )
}
