import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { cierre } from '../data/content'
import { SplitText } from '../components/SplitText'
import { Reveal } from '../components/Reveal'
import { Button } from '../components/Button'
import { Eyebrow } from '../components/Eyebrow'
import { AnimatedBackground } from '../components/AnimatedBackground'
import { cn } from '../lib/cn'

/**
 * S10 · Cierre / CTA. Titular XXL revelado por palabras, CTA magnético y
 * formulario solo-UI con estado de éxito simulado. Inputs con línea inferior
 * animada al foco. Fondo aurora + partículas de baja densidad.
 */
export function Cierre() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Solo UI: no hay backend. Éxito simulado.
    setSent(true)
  }

  const fields = [
    { name: 'nombre', label: cierre.form.nombre, type: 'text', full: false },
    { name: 'empresa', label: cierre.form.empresa, type: 'text', full: false },
    { name: 'email', label: cierre.form.email, type: 'email', full: true },
  ]

  return (
    <section id="cierre" className="relative isolate overflow-hidden bg-brand-paper py-section">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <AnimatedBackground variant="aurora" />
      </div>

      <div className="shell grid gap-16 lg:grid-cols-[1.1fr,0.9fr] lg:gap-20">
        {/* Copy + CTAs */}
        <div>
          <Reveal direction="none">
            <Eyebrow>{cierre.eyebrow}</Eyebrow>
          </Reveal>
          <div className="mt-6 max-w-[14ch]">
            <SplitText as="h2" text={cierre.titulo} className="text-display-lg font-bold" />
          </div>
          <Reveal delay={0.2} className="mt-6 max-w-xl">
            <p className="text-body-lg text-brand-slate">{cierre.texto}</p>
          </Reveal>
          <Reveal delay={0.3} className="mt-9 flex flex-wrap gap-3">
            {/* Único CTA magnético de la página. */}
            <Button href="#cierre-form" magnetic variant="primary">
              {cierre.ctaPrimario}
            </Button>
            <Button href="#" variant="secondary" arrow={false}>
              {cierre.ctaSecundario}
            </Button>
          </Reveal>
        </div>

        {/* Formulario */}
        <Reveal direction="left" id="cierre-form">
          <div className="rounded-card border border-brand-line bg-brand-white/80 p-8 shadow-card backdrop-blur-sm">
            {sent ? (
              <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
                <CheckCircle2 className="h-12 w-12 text-brand-teal" strokeWidth={1.5} />
                <p className="mt-4 max-w-xs text-body-lg text-brand-ink">{cierre.form.exito}</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2">
                {fields.map((f) => (
                  <FloatingField key={f.name} {...f} />
                ))}
                <FloatingField
                  name="mensaje"
                  label={cierre.form.mensaje}
                  type="textarea"
                  full
                />
                <div className="sm:col-span-2">
                  <Button type="submit" variant="primary" className="w-full sm:w-auto">
                    {cierre.form.enviar}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/** Campo con etiqueta y línea inferior animada al foco. */
function FloatingField({
  name,
  label,
  type,
  full,
}: {
  name: string
  label: string
  type: string
  full: boolean
}) {
  const commonClass =
    'peer w-full border-0 border-b border-brand-line bg-transparent py-2 font-sans text-base text-brand-ink outline-none placeholder-transparent'
  return (
    <div className={cn('relative', full && 'sm:col-span-2')}>
      <label htmlFor={name} className="mb-1 block eyebrow text-brand-slate">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea id={name} name={name} rows={3} className={commonClass} required />
      ) : (
        <input id={name} name={name} type={type} className={commonClass} required />
      )}
      {/* Línea inferior que crece desde la izquierda al foco. */}
      <span className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-brand-accent transition-transform duration-300 ease-expo peer-focus:scale-x-100" />
    </div>
  )
}
