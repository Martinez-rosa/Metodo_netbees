import type { Config } from 'tailwindcss'

/**
 * Sistema de tokens único. Todo color / fuente / radio / sombra / espaciado
 * sale de aquí. Cero valores sueltos en JSX.
 */
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    // Contenedor central máx. 1280px con padding lateral fluido.
    container: {
      center: true,
      padding: 'clamp(1.25rem, 5vw, 5rem)',
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        brand: {
          paper: '#FBFBFD', // fondo base de secciones claras
          white: '#FFFFFF', // superficies elevadas, cards
          ink: '#0B0B10', // texto principal, casi negro
          slate: '#5A5A6B', // texto secundario
          line: '#E4E2EF', // bordes 1px y rejillas
          electric: '#fad200', // amarillo de marca (logo) — fondos, blobs, fill de hover, fondos oscuros
          indigo: '#f59e0b', // acento secundario ámbar — segundo tono del aurora/red de nodos
          accent: '#ffbd00', // acento de marca — itálicas, subtítulos, números, focos
          teal: '#00C0A8', // acento puntual (datos, "activo")
          deep: '#181848', // azul profundo, secciones oscuras
          void: '#000000', // fondo de divisores oscuros
        },
      },
      fontFamily: {
        // Titulares — grotesca pesada
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        // Acentos itálicos editoriales dentro de los titulares
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        // UI / cuerpo / datos
        sans: ['Inter', 'system-ui', 'sans-serif'],
        // Etiquetas / eyebrows / labels técnicos — monoespaciada
        label: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Escala fluida con clamp() — Space Grotesk pide tracking negativo fuerte.
        'display-xl': ['clamp(3rem, 8.5vw, 8rem)', { lineHeight: '0.96', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.5rem, 6vw, 5.5rem)', { lineHeight: '0.98', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(2rem, 4.5vw, 3.5rem)', { lineHeight: '1.02', letterSpacing: '-0.025em' }],
        'stat': ['clamp(3rem, 8vw, 6.5rem)', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
        'body-lg': ['clamp(1.125rem, 1.4vw, 1.3rem)', { lineHeight: '1.6' }],
      },
      letterSpacing: {
        label: '0.16em',
        tight: '-0.025em',
        tighter: '-0.04em',
      },
      borderRadius: {
        // Diseño redondeado y orgánico (referencia Digital Heroes).
        card: '20px',
        'card-lg': '28px',
        pill: '999px',
      },
      boxShadow: {
        // Sombras suaves y amplias, muy difusas.
        card: '0 2px 10px -4px rgba(11, 11, 16, 0.06)',
        'card-hover': '0 30px 60px -28px rgba(250, 210, 0, 0.30)',
        float: '0 24px 60px -20px rgba(11, 11, 16, 0.14)',
        pill: '0 10px 40px -12px rgba(11, 11, 16, 0.18)',
      },
      spacing: {
        // Ritmo vertical entre secciones y bloques — mapea 1:1 a las
        // variables CSS de src/index.css (única fuente de verdad).
        section: 'var(--space-section)',
        gutter: 'clamp(1.25rem, 5vw, 5rem)',
        '2xs': 'var(--space-2xs)',
        xs: 'var(--space-xs)',
        sm: 'var(--space-sm)',
        md: 'var(--space-md)',
        lg: 'var(--space-lg)',
        xl: 'var(--space-xl)',
      },
      maxWidth: {
        shell: '1280px',
      },
      transitionTimingFunction: {
        // Expo-out — easing base del sistema de animación.
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'aurora-drift': {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(4%, -3%, 0) scale(1.12)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'aurora-drift': 'aurora-drift 26s ease-in-out infinite',
        'marquee': 'marquee 38s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
