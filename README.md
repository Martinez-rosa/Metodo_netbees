# Puente de Innovación Transatlántico · Panamá Pacífico × UTP × Netbees

Landing page one-page (scroll largo), **solo frontend**, para el proyecto
_"Puente de Innovación Transatlántico Panamá Pacífico – UTP – Netbees"_.
Pieza editorial de dossier institucional: papel blanco de revista técnica + luz
azul eléctrica de laboratorio, con un sistema de animación coherente.

---

## Arrancar

Requisitos: **Node ≥ 18**.

```bash
npm install       # instalar dependencias
npm run dev       # servidor de desarrollo (http://localhost:5173)
npm run build     # build de producción a /dist (verifica TypeScript)
npm run preview   # previsualizar el build
```

`npm run build` debe terminar **sin errores de TypeScript** (criterio de aceptación).

---

## Stack

- **Vite + React 18 + TypeScript**
- **Tailwind CSS** con tokens en [`tailwind.config.ts`](tailwind.config.ts) (cero hex sueltos en JSX)
- **Framer Motion** — reveals, parallax, orquestación, micro-interacciones
- **Lenis** — smooth scroll (se desactiva con `prefers-reduced-motion`)
- **lucide-react** — iconografía de línea

**Dirección de arte:** estilo editorial inspirado en digitalheroesco.com adaptado a
la paleta de marca — grotesca pesada + acentos en serif itálica, diseño
redondeado, navbar píldora flotante y cards de cifras.

Sin backend, sin CMS, sin router. Todo estático.

---

## Dónde cambiar las cosas

### 📝 Copy / textos
**Todo** el texto vive en un único archivo tipado:
[`src/data/content.ts`](src/data/content.ts).
Los componentes **nunca** llevan strings hardcodeados — edita el copy ahí sin
tocar JSX.

### 🎨 Colores, fuentes, radios, sombras
Todos los tokens están en [`tailwind.config.ts`](tailwind.config.ts) →
`theme.extend`. La paleta de marca está bajo `colors.brand`:

| Token            | Hex       | Uso                                        |
| ---------------- | --------- | ------------------------------------------ |
| `brand.paper`    | `#FBFBFD` | fondo base de secciones claras             |
| `brand.ink`      | `#0B0B10` | texto principal                            |
| `brand.slate`    | `#5A5A6B` | texto secundario                           |
| `brand.line`     | `#E4E2EF` | bordes 1px y rejillas                      |
| `brand.electric` | `#2A1EF5` | **primario** — datos, filetes, hover, CTA  |
| `brand.indigo`   | `#7B5CF0` | acento secundario                          |
| `brand.teal`     | `#00C0A8` | acento puntual (máx. 4 usos en toda la web)|
| `brand.deep`     | `#181848` | azul profundo de secciones oscuras         |
| `brand.void`     | `#000000` | fondo de los divisores oscuros             |

**Regla de color:** el 85% es `paper` + `ink`. El azul `electric` se reserva
para números, filetes, hover, el CTA y las líneas de los fondos animados.

Fuentes (cargadas en [`index.html`](index.html) desde Google Fonts):
`Space Grotesk` (titulares, bold), `Instrument Serif` (acentos en itálica —
palabras entre `*asteriscos*` en los titulares de [`content.ts`](src/data/content.ts)),
`JetBrains Mono` (eyebrows/labels), `Inter` (cuerpo/datos).

Radios redondeados (`card` = 20px, `pill` = 999px) y sombras suaves y amplias.

### 🖼️ Imágenes
No hay imágenes reales todavía: se usa el componente
[`Placeholder`](src/components/Placeholder.tsx) (degradado + rejilla + grano +
blob, no una caja gris). Las rutas `src` están centralizadas en
[`content.ts`](src/data/content.ts) (p. ej. `proceso.pasos[].imagen.src`).
Para sustituir un placeholder por una imagen real, **rellena esa ruta** — el
componente muestra la imagen automáticamente, con el mismo parallax interno.

### ⚙️ Comportamiento (cursor, tilt, easing)
[`src/lib/config.ts`](src/lib/config.ts):
- `ENABLE_CUSTOM_CURSOR` — cursor seguidor (blend difference).
- `ENABLE_TILT` — tilt 3D de las tarjetas de actores.
- `EASE_EXPO` — easing base del sistema.

---

## Estructura

```
src/
  App.tsx                # orquesta las secciones en orden de relato
  main.tsx
  index.css              # fuentes, variables CSS, grano, utilidades
  data/content.ts        # TODO el copy, tipado
  lib/                   # cn (clases), config (constantes)
  hooks/                 # useReducedMotion, useLenis, useMousePosition, useInViewOnce
  components/            # Reveal, SplitText, SectionShell, SectionMarker, Eyebrow,
                         # StatNumber, Card, ParallaxLayer, AnimatedBackground,
                         # Placeholder, Cursor, Marquee, Button, ProgressBar, Icon
  sections/              # Navbar, Hero, Metricas, Pilares, DividerDark, Metodo,
                         # ModulosPrograma, TalentLab, Recursos, Cierre, Footer
```

Un componente por sección. Primitivas reutilizables en `components/`.

---

## Sistema de animación

Cuatro familias, construidas como sistema (no efectos sueltos):

1. **Reveal al scroll** — [`Reveal`](src/components/Reveal.tsx) /
   [`RevealGroup`](src/components/Reveal.tsx) (opacity + y + blur, expo-out,
   stagger en grupos) y [`SplitText`](src/components/SplitText.tsx) (revelado por
   palabras con máscara, con acentos en serif itálica — la firma editorial).
   Contadores en [`StatNumber`](src/components/StatNumber.tsx) con formato español.
2. **Fondos animados** — [`AnimatedBackground`](src/components/AnimatedBackground.tsx):
   `grid` (rejilla técnica interactiva), `nodes` (red de nodos en `<canvas>`,
   pausada fuera de viewport, 25 nodos en móvil) y `aurora` (blobs a baja opacidad).
3. **Parallax / profundidad** — [`ParallaxLayer`](src/components/ParallaxLayer.tsx)
   y parallax de 3 capas en el hero. Placeholders con parallax interno.
4. **Micro-interacciones** — hover de cards (lift + halo), barrido de botones
   píldora, tilt 3D en pilares, cursor seguidor y magnetic hover (solo en el CTA).

---

## Accesibilidad y rendimiento

- **`prefers-reduced-motion`** centralizado en
  [`useReducedMotion`](src/hooks/useReducedMotion.ts): si está activo, todo
  aparece en su estado final sin animación (y Lenis se desactiva). Cinturón de
  seguridad adicional en CSS.
- Contraste AA, `alt` en imágenes, foco visible, jerarquía `h1 → h2 → h3`.
- Solo se anima `transform` y `opacity`. El `<canvas>` limita `devicePixelRatio`
  a 2 y se pausa con `IntersectionObserver` fuera de viewport.
- `overflow-x: hidden` en `body`; probado sin scroll horizontal en móvil.

**Criterio de aceptación:** si se quitan todas las animaciones, la página sigue
siendo un documento editorial impecable y legible.
