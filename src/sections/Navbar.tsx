import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { brand, nav } from '../data/content'
import { scrollToAnchor } from '../lib/lenis'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { cn } from '../lib/cn'

/**
 * S0 · Navbar como píldora flotante central (referencia Digital Heroes).
 * Fondo translúcido con blur y sombra suave; se compacta ligeramente al
 * scrollear. Menú móvil a pantalla completa con stagger.
 */
export function Navbar() {
  const reduced = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    scrollToAnchor(href)
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
        <nav
          aria-label="Principal"
          className={cn(
            'flex items-center gap-2 rounded-pill border border-brand-line/80 bg-brand-white/75 px-2 backdrop-blur-xl transition-all duration-300',
            scrolled ? 'py-1.5 shadow-pill' : 'py-2 shadow-card',
          )}
        >
          {/* Anclas desktop */}
          <ul className="hidden items-center gap-1 md:flex">
            {nav.items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={go(item.href)}
                  className="rounded-pill px-3.5 py-2 font-sans text-sm font-medium text-brand-slate transition-colors hover:bg-brand-paper hover:text-brand-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href={nav.cta.href}
            onClick={go(nav.cta.href)}
            className="hidden rounded-pill bg-brand-ink px-5 py-2.5 font-label text-[12px] font-medium uppercase tracking-[0.08em] text-brand-paper transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
          >
            {nav.cta.label}
          </a>

          {/* Toggle móvil */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-pill text-brand-ink md:hidden"
            aria-label="Abrir menú"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </header>

      {/* Menú móvil a pantalla completa */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[55] flex flex-col bg-brand-paper md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.25 }}
          >
            <div className="flex h-20 items-center justify-between px-6">
              <img src={brand.logoSrc} alt="Método Netbees" className="h-8 w-auto" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center"
                aria-label="Cerrar menú"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <motion.ul
              className="flex flex-1 flex-col justify-center gap-1 px-6"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: reduced ? 0 : 0.06, delayChildren: 0.05 } },
              }}
            >
              {[...nav.items, nav.cta].map((item) => (
                <motion.li
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, y: reduced ? 0 : 20 },
                    visible: { opacity: 1, y: 0, transition: { ease: [0.16, 1, 0.3, 1], duration: 0.5 } },
                  }}
                >
                  <a
                    href={item.href}
                    onClick={go(item.href)}
                    className="block py-2 font-display text-4xl font-bold tracking-tight"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
