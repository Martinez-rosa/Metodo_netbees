import { type ReactNode, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '../lib/cn'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useFinePointer } from '../hooks/useMousePosition'

interface ButtonProps {
  children: ReactNode
  href?: string
  onClick?: React.MouseEventHandler
  variant?: 'primary' | 'secondary' | 'ghost'
  arrow?: boolean
  /** Magnetic hover — reservado SOLO para el CTA principal. */
  magnetic?: boolean
  className?: string
  type?: 'button' | 'submit'
  ariaLabel?: string
}

/**
 * Botón del sistema.
 * - primary: relleno ink, texto paper; en hover el barrido pasa a electric y
 *   el texto a ink para mantener el contraste.
 * - secondary: borde, texto ink; relleno que barre en hover (texto a ink).
 * - Flecha que se desplaza 4px a la derecha en hover.
 * - `magnetic`: el botón se acerca hasta 8px al cursor (solo CTA principal).
 */
export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  arrow = true,
  magnetic = false,
  className,
  type = 'button',
  ariaLabel,
}: ButtonProps) {
  const reduced = useReducedMotion()
  const fine = useFinePointer()
  const ref = useRef<HTMLElement>(null)

  // Efecto magnético: traslada el botón hacia el cursor (máx 8px).
  const onMouseMove = (e: React.MouseEvent) => {
    if (!magnetic || reduced || !fine || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    const max = 8
    const x = Math.max(-max, Math.min(max, relX * 0.3))
    const y = Math.max(-max, Math.min(max, relY * 0.3))
    ref.current.style.transform = `translate(${x}px, ${y}px)`
  }
  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  const base =
    'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-pill px-7 py-3.5 font-label text-[13px] font-medium uppercase tracking-[0.08em] transition-transform duration-300 ease-expo min-h-[48px]'

  const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary:
      'bg-brand-ink text-brand-paper hover:text-brand-paper',
    secondary:
      'border border-brand-ink/15 bg-brand-white/60 text-brand-ink hover:border-brand-accent',
    ghost: 'text-brand-paper border border-brand-paper/30 hover:border-brand-paper',
  }

  const content = (
    <>
      {/* Barrido de relleno electric izquierda→derecha en hover. */}
      {variant !== 'ghost' && (
        <span
          aria-hidden
          className="absolute inset-0 -z-0 origin-left scale-x-0 bg-brand-electric transition-transform duration-300 ease-expo group-hover:scale-x-100"
        />
      )}
      <span
        className={cn(
          'relative z-10 flex items-center gap-2',
          // El barrido de hover rellena en brand.electric (amarillo vivo):
          // el texto debe pasar a ink, no paper, para mantener contraste AA.
          variant !== 'ghost' && 'transition-colors duration-300 group-hover:text-brand-ink',
        )}
      >
        {children}
        {arrow && (
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 ease-expo group-hover:translate-x-1"
            aria-hidden
          />
        )}
      </span>
    </>
  )

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        aria-label={ariaLabel}
        className={cn(base, variants[variant], className)}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      aria-label={ariaLabel}
      className={cn(base, variants[variant], className)}
    >
      {content}
    </button>
  )
}
