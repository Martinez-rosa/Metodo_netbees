import { type ReactNode } from 'react'
import { brand } from '../data/content'
import { Footer } from '../sections/Footer'

interface LegalLayoutProps {
  eyebrow: string
  titulo: string
  actualizado: string
  children: ReactNode
}

/**
 * Layout compartido por las páginas legales (Privacidad, Cookies). Estático,
 * sin animaciones de scroll: son documentos de referencia, no relato.
 */
export function LegalLayout({ eyebrow, titulo, actualizado, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-brand-paper text-brand-ink">
      <header className="border-b border-brand-line">
        <div className="shell flex items-center justify-between py-5">
          <a href="/" aria-label="Método Netbees — inicio" className="inline-block">
            <img src={brand.logoSrc} alt="Método Netbees" className="h-10 w-auto md:h-12" />
          </a>
          <a
            href="/"
            className="font-label text-[12px] font-medium uppercase tracking-label text-brand-slate transition-colors hover:text-brand-ink"
          >
            ← Volver al inicio
          </a>
        </div>
      </header>

      <main className="shell py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow text-brand-accent">{eyebrow}</p>
          <h1 className="mt-3 text-display-md font-bold tracking-tight">{titulo}</h1>
          <p className="mt-3 text-sm text-brand-slate">Última actualización: {actualizado}</p>

          <div className="mt-12 space-y-10 [&_a]:text-brand-ink [&_a]:underline [&_a]:decoration-brand-line [&_a]:underline-offset-2 [&_a:hover]:decoration-brand-accent">
            {children}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

/** Bloque de sección reutilizable dentro de un documento legal. */
export function LegalSection({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl font-bold tracking-tight md:text-2xl">{titulo}</h2>
      <div className="mt-3 space-y-3 text-body-lg text-brand-slate [&_li]:leading-relaxed [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  )
}
