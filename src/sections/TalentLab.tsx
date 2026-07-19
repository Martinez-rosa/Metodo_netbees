import { motion } from 'framer-motion'
import { talentLab } from '../data/content'
import { SectionShell } from '../components/SectionShell'
import { Reveal, RevealGroup } from '../components/Reveal'
import { StatNumber } from '../components/StatNumber'
import { SplitText } from '../components/SplitText'
import { Card } from '../components/Card'
import { AnimatedBackground } from '../components/AnimatedBackground'
import { useReducedMotion } from '../hooks/useReducedMotion'

// Conexiones entre los 4 nodos (rejilla 2x2 en % del viewBox).
const points = [
  { x: 25, y: 28 }, // 0 · sup-izq
  { x: 75, y: 28 }, // 1 · sup-der
  { x: 25, y: 72 }, // 2 · inf-izq
  { x: 75, y: 72 }, // 3 · inf-der
]
const links: Array<[number, number]> = [
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 3],
  [1, 2],
  [2, 3],
]

/**
 * S7 · Talent Lab. Título con cifra. Cuatro módulos como nodos conectados por
 * líneas SVG que se dibujan (pathLength 0→1) al entrar en viewport.
 */
export function TalentLab() {
  const reduced = useReducedMotion()

  return (
    <SectionShell
      id="talent-lab"
      marker={talentLab.eyebrow}
      background={<AnimatedBackground variant="grid" className="opacity-30" />}
    >
      <div className="max-w-4xl">
        <div className="text-stat">
          <StatNumber value={talentLab.cifra} unit={talentLab.unidad} unitClassName="text-3xl" />
        </div>
        <SplitText
          as="h2"
          text={talentLab.titulo}
          className="mt-4 text-display-md font-bold"
          delay={0.1}
        />
      </div>

      {/* Retos tecnológicos resueltos: introduce los módulos de abajo, cada
          uno con el logo del reto ya resuelto (en vez de una fila aparte). */}
      <div className="mt-14 border-t border-brand-line pt-10">
        <Reveal direction="none" blur={false}>
          <p className="eyebrow text-brand-accent">{talentLab.retosEyebrow}</p>
        </Reveal>
        <Reveal delay={0.08} className="mt-3 max-w-xl">
          <p className="text-body-lg text-brand-slate">{talentLab.retosSubtitulo}</p>
        </Reveal>
      </div>

      {/* Diagrama de nodos conectados */}
      <div className="relative mt-16">
        {/* Líneas SVG que se dibujan (solo desktop, donde la rejilla 2x2 aplica). */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {links.map(([a, b], i) => (
            <motion.line
              key={i}
              x1={points[a].x}
              y1={points[a].y}
              x2={points[b].x}
              y2={points[b].y}
              stroke="var(--brand-accent)"
              strokeWidth={0.15}
              strokeOpacity={0.5}
              initial={{ pathLength: reduced ? 1 : 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: reduced ? 0 : 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 * i }}
            />
          ))}
        </svg>

        <RevealGroup className="relative grid gap-5 md:grid-cols-2" stagger={0.09}>
          {talentLab.modulos.map((m) => (
            <Reveal key={m.titulo} asChild>
              <Card className="flex items-start gap-4">
                {/* Logo del reto tecnológico resuelto por este módulo */}
                <span className="flex h-10 w-16 shrink-0 items-center justify-start overflow-hidden">
                  <img
                    src={m.logo}
                    alt={m.titulo}
                    className="max-h-10 max-w-16 object-contain object-left transition-transform duration-300 group-hover:scale-110"
                  />
                </span>
                <div>
                  <h3 className="font-sans text-lg font-bold">{m.titulo}</h3>
                  <p className="mt-2 text-body-lg text-brand-slate">{m.descripcion}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </RevealGroup>
      </div>
    </SectionShell>
  )
}
