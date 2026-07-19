import { type ReactNode } from 'react'
import { cn } from '../lib/cn'
import { SectionMarker } from './SectionMarker'
import { Reveal } from './Reveal'

interface SectionShellProps {
  id?: string
  children: ReactNode
  className?: string
  /** Tema de la sección: claro (paper) u oscuro (divisores). */
  tone?: 'light' | 'dark'
  /** Marcador de sección estilo «§ ——— § · label» arriba. */
  marker?: string
  /** Fondo animado detrás del contenido. */
  background?: ReactNode
  /** Contenido a ancho completo (sin shell interno). */
  fluid?: boolean
}

/**
 * Envoltorio estándar de sección: espaciado vertical, tema claro/oscuro,
 * marcador editorial y ranura para fondo animado.
 */
export function SectionShell({
  id,
  children,
  className,
  tone = 'light',
  marker,
  background,
  fluid = false,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative isolate overflow-hidden py-section',
        tone === 'dark' ? 'bg-brand-void text-brand-paper' : 'bg-brand-paper text-brand-ink',
        className,
      )}
    >
      {/* Fondo animado, siempre detrás y sin capturar puntero. */}
      {background && (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          {background}
        </div>
      )}

      <div className={cn(!fluid && 'shell')}>
        {marker && (
          <Reveal direction="none" blur={false} className={cn('mb-10 md:mb-14', fluid && 'shell')}>
            <SectionMarker tone={tone}>{marker}</SectionMarker>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  )
}
