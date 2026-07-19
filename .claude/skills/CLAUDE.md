# Reglas del proyecto — Scrollytelling

## Stack
- **Framework**: React 19 + Vite (o Next.js 15 App Router si hay SSR)
- **Lenguaje**: TypeScript estricto (`"strict": true`, sin `any` salvo justificación en comentario)
- **Estilos**: Tailwind CSS v4 con tokens custom en `@theme`. Nada de CSS-in-JS.
- **Animación**: GSAP 3.12+ con ScrollTrigger. Lenis para smooth scroll.
- **3D (si aplica)**: React Three Fiber + drei
- **Utilidades**: clsx + tailwind-merge (`cn()` helper obligatorio)

## Estructura de archivos
```
src/
├── app/ (o pages/)
├── sections/
│   └── [NombreSeccion]/
│       ├── index.tsx
│       ├── timeline.ts    ← todas las animaciones de esta sección
│       └── types.ts
├── lib/
│   ├── lenis.ts           ← setup global de smooth scroll
│   ├── gsap.ts            ← registro de plugins y helpers
│   └── cn.ts
├── hooks/
│   ├── useScrollTrigger.ts
│   └── useReducedMotion.ts
└── styles/
    └── globals.css        ← tokens Tailwind + reset
```
Una sección = una carpeta. Nunca mezclar timelines de secciones distintas.

## Reglas de animación (NO NEGOCIABLES)
- **Solo `transform` y `opacity`** en propiedades animadas. Prohibido animar `top`, `left`, `width`, `height`, `margin`, `padding` en scroll.
- **Cleanup obligatorio**: cada `ScrollTrigger` y timeline se destruye en el cleanup del `useEffect` / `useGSAP`. Sin excepciones.
- **Usa `useGSAP`** de `@gsap/react`, nunca `useEffect` a pelo para GSAP.
- **Contexto GSAP** con `gsap.context()` scoped al ref del componente.
- **Easings por defecto**:
  - Entradas: `power3.out`
  - Salidas: `power2.in`
  - Transiciones de sección: `power2.inOut`
  - Nunca `linear` en scroll salvo scrub puro.
- **Scrub**: usar `scrub: 1` (con smoothing) por defecto, no `scrub: true`.
- **Pinning**: siempre con `pinSpacing: true` salvo justificación explícita.

## Librerías prohibidas
- AOS, wow.js, react-reveal → NO
- framer-motion para scroll → NO (solo micro-interacciones de UI)
- Locomotive Scroll → NO (Lenis es suficiente y más ligero)
- Cualquier librería > 50KB gzipped sin discutirlo antes

## Performance (obligatorio en cada sección)
- 60fps en laptop medio (referencia: MacBook Air M1)
- `will-change` solo durante la animación activa, se quita al terminar
- Imágenes: `<img>` con `loading="lazy"` fuera del primer viewport, `fetchpriority="high"` en el hero
- Image sequences: WebP con precarga progresiva, nunca cargar los 200 frames de golpe
- Vídeos scroll-scrubbed: `preload="auto"`, `muted`, `playsInline`, y comprobar `readyState` antes de atar el scrub

## Accesibilidad (bloqueante)
- **`prefers-reduced-motion`** en CADA sección. Hook `useReducedMotion()` y variante alternativa que cuente lo mismo sin animación intensa (no desactivar, sustituir).
- Contenido leíble sin JS (SSR o SSG cuando sea posible)
- Focus states visibles con `:focus-visible`
- Contraste WCAG AA mínimo, AAA en cuerpo de texto
- `aria-label` en secciones interactivas, `alt` descriptivo en todas las imágenes decorativas o `alt=""`

## Móvil
- Replantear coreografía, NO encogerla. Si un pin horizontal no funciona en móvil, sustituye por vertical stack animado.
- Touch scroll natural, sin bloqueos. Lenis en móvil: `smoothTouch: false`.
- Breakpoints Tailwind: `sm` 640, `md` 768, `lg` 1024, `xl` 1280

## TypeScript
- Props tipadas con `interface`, no `type` (para extendibilidad)
- Sin `React.FC` — usar función normal con props tipadas
- Refs tipados: `useRef<HTMLDivElement>(null)`
- Timelines GSAP tipadas: `gsap.core.Timeline`

## Tailwind
- Tokens de color, spacing y tipografía en `@theme` de `globals.css`
- Sin `style={{}}` inline salvo valores dinámicos calculados
- Utility classes ordenadas con Prettier plugin `prettier-plugin-tailwindcss`
- Custom utilities en `@utility` de Tailwind v4, no en `@layer utilities`

## Flujo de trabajo con Claude Code

### Antes de tocar código
1. **Plan mode obligatorio** para cualquier sección nueva (Shift+Tab dos veces)
2. Confirmar arco narrativo antes de coreografía
3. Si dudas entre 2 approaches, muestra los 2 con pros/contras

### Durante el desarrollo
- **PARA entre secciones**. No entregar 2 secciones seguidas sin revisión.
- Antes de instalar una dependencia nueva → PREGUNTAR
- Antes de refactorizar código ya aprobado → PREGUNTAR
- Después de cada sección: checklist mental de performance + reduced-motion

### Comunicación
- Responde en español
- No pidas disculpas por errores, corrígelos
- Si algo no lo sabes, dilo — no inventes APIs de GSAP
- Referencias visuales concretas > descripciones abstractas

## Comandos útiles del proyecto
```bash
pnpm dev          # Vite dev server
pnpm build        # producción
pnpm lint         # ESLint + Prettier check
pnpm typecheck    # tsc --noEmit
```
