import { Fragment } from 'react'
import { cn } from '../lib/cn'

interface AccentTextProps {
  /** Texto con palabras entre *asteriscos* para el acento serif itálico. */
  text: string
  /** Color del acento — 'accent' (ámbar, fondo claro) o 'electric' (amarillo vivo, fondo oscuro). */
  tone?: 'accent' | 'electric'
}

/**
 * Igual que el parser de acentos de SplitText pero sin la animación de
 * revelado por palabras — para titulares estáticos ya visibles (p. ej.
 * dentro de una tarjeta) donde no hace falta el efecto máscara.
 */
export function AccentText({ text, tone = 'accent' }: AccentTextProps) {
  const parts = text.split('*')
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <em
            key={i}
            className={cn(
              'font-serif italic font-normal',
              tone === 'electric' ? 'text-brand-electric' : 'text-brand-accent',
            )}
          >
            {part}
          </em>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  )
}
