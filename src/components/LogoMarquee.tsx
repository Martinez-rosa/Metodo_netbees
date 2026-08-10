import { cn } from '../lib/cn'
import { useReducedMotion } from '../hooks/useReducedMotion'
import type { Colaborador } from '../data/content'

interface LogoMarqueeProps {
  logos: Colaborador[]
  className?: string
}

/**
 * Cinta de logos en loop continuo (referencia: trust bar de Digital Heroes).
 * Pista duplicada para bucle sin costuras vía `animate-marquee` (translateX
 * 0→-50%), bordes con fade a máscara y pausa al pasar el ratón. Cada logo
 * entra en gris y recupera color/opacidad al hover individual.
 */
export function LogoMarquee({ logos, className }: LogoMarqueeProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <div className={cn('flex flex-wrap items-center justify-center gap-x-14 gap-y-8', className)}>
        {logos.map((c) => (
          <img
            key={c.nombre}
            src={c.logo}
            alt={c.nombre}
            className={cn(
              'w-auto object-contain',
              c.destacado ? 'h-[102px] md:h-[154px]' : 'h-16 md:h-[90px]',
            )}
          />
        ))}
      </div>
    )
  }

  // Dos copias de la pista = bucle perfecto con translateX(-50%).
  const track = [...logos, ...logos]

  return (
    <div
      className={cn(
        'group relative overflow-hidden',
        '[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]',
        '[-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]',
        className,
      )}
    >
      <div className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]">
        {[0, 1].map((rep) =>
          track.map((c, i) => (
            <img
              key={`${rep}-${c.nombre}-${i}`}
              src={c.logo}
              alt={c.nombre}
              className={cn(
                'mr-14 w-auto flex-shrink-0 scale-95 object-contain opacity-60 grayscale brightness-90 transition duration-300 ease-expo hover:scale-100 hover:opacity-100 hover:grayscale-0 hover:brightness-100 md:mr-20',
                c.destacado ? 'h-[102px] md:h-[154px]' : 'h-16 md:h-[90px]',
              )}
            />
          )),
        )}
      </div>
    </div>
  )
}
