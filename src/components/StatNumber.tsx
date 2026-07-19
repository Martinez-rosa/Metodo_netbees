import { useEffect, useRef, useState } from 'react'
import { cn } from '../lib/cn'
import { useInViewOnce } from '../hooks/useInViewOnce'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface StatNumberProps {
  /** Valor final como string en formato español: '140', '1.711,66', 'MVP'. */
  value: string
  unit?: string
  className?: string
  unitClassName?: string
}

/** Parsea '1.711,66' (formato ES) a número. Devuelve null si no es numérico. */
function parseES(value: string): { num: number; decimals: number } | null {
  const cleaned = value.replace(/\./g, '').replace(',', '.')
  const num = Number(cleaned)
  if (Number.isNaN(num)) return null
  const decimals = value.includes(',') ? value.split(',')[1].length : 0
  return { num, decimals }
}

/** Formatea un número al estilo español (miles con '.', decimales con ','). */
function formatES(num: number, decimals: number): string {
  return num.toLocaleString('es-ES', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

/**
 * Cifra grande con contador animado (0 → valor) al entrar en viewport.
 * Respeta decimales/formato español. Si el valor no es numérico ('MVP'),
 * se muestra tal cual. La unidad va en Barlow Condensed, más pequeña, electric.
 */
export function StatNumber({ value, unit, className, unitClassName }: StatNumberProps) {
  const reduced = useReducedMotion()
  const { ref, inView } = useInViewOnce<HTMLSpanElement>({ margin: '-20% 0px' })
  const parsed = parseES(value)
  const [display, setDisplay] = useState<string>(
    parsed && !reduced ? formatES(0, parsed.decimals) : value,
  )
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!inView || !parsed || reduced) {
      if (reduced || !parsed) setDisplay(value)
      return
    }
    const duration = 1400
    const start = performance.now()
    const { num, decimals } = parsed

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      // Ease-out cúbico.
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(formatES(num * eased, decimals))
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
      else setDisplay(formatES(num, decimals))
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [inView, value, reduced]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span ref={ref} className={cn('inline-flex items-baseline gap-2', className)}>
      <span className="font-display font-bold tabular-nums tracking-tighter">{display}</span>
      {unit && (
        <span className={cn('font-label font-medium text-brand-accent', unitClassName)}>
          {unit}
        </span>
      )}
    </span>
  )
}
