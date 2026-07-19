import { cn } from '../lib/cn'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface MarqueeProps {
  text: string
  className?: string
}

/**
 * Marquee lento y sutil (Barlow Condensed, baja opacidad).
 * El texto se duplica para hacer bucle continuo con la keyframe `marquee`.
 * Con reduced motion queda estático.
 */
export function Marquee({ text, className }: MarqueeProps) {
  const reduced = useReducedMotion()
  const track = `${text} `.repeat(6)

  return (
    <div className={cn('relative overflow-hidden', className)} aria-hidden>
      <div
        className={cn(
          'flex w-max whitespace-nowrap font-label text-4xl font-semibold uppercase tracking-label md:text-6xl',
          !reduced && 'animate-marquee',
        )}
      >
        <span className="pr-4">{track}</span>
        <span className="pr-4">{track}</span>
      </div>
    </div>
  )
}
