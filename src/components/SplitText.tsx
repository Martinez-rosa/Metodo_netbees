import { motion, type Variants } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { cn } from '../lib/cn'

interface SplitTextProps {
  /** Texto del titular. Las palabras entre *asteriscos* se renderizan en
   *  Instrument Serif itálica (acento editorial), ej. "Diseñamos el *futuro*". */
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'span'
  delay?: number
}

interface Token {
  word: string
  accent: boolean
}

/**
 * Tokeniza el texto en palabras marcando las que van entre *asteriscos*.
 * Reconstruye primero el texto plano (sin asteriscos) recordando qué rangos
 * de caracteres son acento, y luego separa en palabras por espacio — así la
 * puntuación pegada al cierre del acento (p. ej. "*misión*." o "*hacer*?")
 * queda unida a su palabra en vez de convertirse en un token suelto que
 * puede acabar solo en su propia línea al hacer wrap.
 */
function tokenize(text: string): Token[] {
  let plain = ''
  const ranges: Array<[number, number]> = []
  let i = 0
  while (i < text.length) {
    if (text[i] === '*') {
      const end = text.indexOf('*', i + 1)
      if (end === -1) {
        plain += text.slice(i)
        break
      }
      const start = plain.length
      plain += text.slice(i + 1, end)
      ranges.push([start, plain.length])
      i = end + 1
    } else {
      plain += text[i]
      i++
    }
  }

  const tokens: Token[] = []
  const wordRe = /\S+/g
  let m: RegExpExecArray | null
  while ((m = wordRe.exec(plain))) {
    const wStart = m.index
    const wEnd = wStart + m[0].length
    const accent = ranges.some(([rs, re]) => wStart < re && wEnd > rs)
    tokens.push({ word: m[0], accent })
  }
  return tokens
}

/**
 * Revelado editorial por palabras: cada palabra sube desde y:110% dentro de una
 * máscara, con stagger de 45ms. Las palabras marcadas van en serif itálica.
 * Con reduced motion aparece completo y estático.
 */
export function SplitText({ text, className, as = 'h2', delay = 0 }: SplitTextProps) {
  const reduced = useReducedMotion()
  const tokens = tokenize(text)
  const plain = text.replace(/\*/g, '')

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduced ? 0 : 0.045, delayChildren: delay },
    },
  }

  const word: Variants = {
    hidden: reduced ? { y: '0%' } : { y: '110%' },
    visible: {
      y: '0%',
      transition: { duration: reduced ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  }

  const MotionTag = motion[as]

  return (
    <MotionTag
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-12% 0px' }}
      className={cn('flex flex-wrap gap-x-[0.28em]', className)}
      aria-label={plain}
    >
      {tokens.map((t, i) => (
        // Cada palabra en su propia máscara.
        <span
          key={i}
          aria-hidden
          className="inline-block shrink-0 overflow-hidden whitespace-nowrap pb-[0.14em]"
        >
          <motion.span
            variants={word}
            className={cn('inline-block will-change-transform', t.accent && 'accent')}
          >
            {t.word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  )
}
