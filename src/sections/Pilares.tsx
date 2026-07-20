import { pilares } from '../data/content'
import { SectionShell } from '../components/SectionShell'
import { SplitText } from '../components/SplitText'
import { Reveal, RevealGroup } from '../components/Reveal'
import { Card } from '../components/Card'
import { PilarVideo } from '../components/PilarVideo'
import { AnimatedBackground } from '../components/AnimatedBackground'

/**
 * S2 · Los tres pilares. Grid 1/3 columnas: cada card con vídeo horizontal,
 * número, rol, nombre y descripción. Entrada con stagger + tilt 3D en hover.
 */
export function Pilares() {
  return (
    <SectionShell
      id="pilares"
      marker="LOS TRES PILARES"
      background={<AnimatedBackground variant="grid" className="opacity-30" />}
    >
      <div className="max-w-3xl">
        <SplitText as="h2" text={pilares.titulo} className="text-display-lg font-bold" />
        <Reveal delay={0.15} className="mt-5">
          <p className="text-body-lg text-brand-slate">{pilares.bajada}</p>
        </Reveal>
      </div>

      <RevealGroup className="mt-16 grid gap-5 md:grid-cols-3" stagger={0.1}>
        {pilares.items.map((p) => (
          <Reveal key={p.index} asChild>
            <Card tilt className="flex h-full flex-col p-4">
              {/* Vídeo horizontal con máscara suave */}
              <PilarVideo
                src={p.video.src}
                poster={p.video.poster}
                alt={p.video.alt}
                className="rounded-[14px]"
              />
              <div className="flex flex-1 flex-col p-4 pt-6">
                <div className="flex items-center justify-between">
                  <span className="font-display text-4xl font-bold tabular-nums text-brand-accent">
                    {p.index}
                  </span>
                  <span className="font-label text-[12px] uppercase tracking-label text-brand-slate">
                    {p.rol}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-3xl font-bold tracking-tight">{p.nombre}</h3>
                <p className="mt-3 text-body-lg text-brand-slate">{p.descripcion}</p>

                {/* Burbujas de instituciones (p. ej. universidades/centros académicos) */}
                {p.socios && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.socios.map((s) => (
                      <div
                        key={s.nombre}
                        className="rounded-card border border-brand-line bg-brand-white px-3.5 py-2"
                      >
                        <span className="block font-label text-[11px] font-bold uppercase tracking-label text-brand-ink">
                          {s.nombre}
                        </span>
                        <span className="block text-xs leading-snug text-brand-slate">
                          {s.descripcion}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </Reveal>
        ))}
      </RevealGroup>
    </SectionShell>
  )
}
