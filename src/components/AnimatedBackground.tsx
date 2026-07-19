import { useEffect, useRef } from 'react'
import { cn } from '../lib/cn'

type Variant = 'grid' | 'aurora'

interface AnimatedBackgroundProps {
  variant: Variant
  className?: string
}

/**
 * Fondos animados del sistema. Dos variantes, una por tipo de sección.
 * Siempre detrás del contenido, pointer-events none. Respetan reduced motion.
 */
export function AnimatedBackground({ variant, className }: AnimatedBackgroundProps) {
  if (variant === 'aurora') return <Aurora className={className} />
  return <TechGrid className={className} />
}

/* ————————————————————————————————————————————————
   1) Grid técnico (secciones claras): rejilla que se desplaza lento y cuyas
   intersecciones se iluminan en electric cerca del cursor (máscara radial).
   ———————————————————————————————————————————————— */
function TechGrid({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
      el.style.setProperty('--my', `${e.clientY - rect.top}px`)
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div ref={ref} className={cn('absolute inset-0 overflow-hidden', className)}>
      {/* Rejilla base tenue. */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--brand-line) 1px, transparent 1px), linear-gradient(to bottom, var(--brand-line) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />
      {/* Capa iluminada en electric, revelada por máscara radial que sigue al ratón. */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--brand-electric) 1px, transparent 1px), linear-gradient(to bottom, var(--brand-electric) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          WebkitMaskImage:
            'radial-gradient(180px circle at var(--mx, -200px) var(--my, -200px), #000 0%, transparent 70%)',
          maskImage:
            'radial-gradient(180px circle at var(--mx, -200px) var(--my, -200px), #000 0%, transparent 70%)',
        }}
      />
    </div>
  )
}

/* ————————————————————————————————————————————————
   2) Aurora / gradiente vivo (hero y cierre): blobs radiales a baja opacidad
   sobre paper, desplazándose en bucle lento. Único "color de fondo" permitido.
   ———————————————————————————————————————————————— */
function Aurora({ className }: { className?: string }) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      <div className="absolute -left-[10%] top-[6%] h-[46vw] w-[46vw] animate-aurora-drift rounded-full bg-brand-electric/[0.14] blur-[90px]" />
      <div className="absolute right-[2%] top-[24%] h-[40vw] w-[40vw] animate-aurora-drift rounded-full bg-brand-indigo/[0.16] blur-[90px] [animation-delay:-9s]" />
      <div className="absolute bottom-[4%] left-[28%] h-[34vw] w-[34vw] animate-aurora-drift rounded-full bg-brand-teal/[0.10] blur-[90px] [animation-delay:-16s]" />
    </div>
  )
}
