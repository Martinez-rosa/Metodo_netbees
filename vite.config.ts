import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración mínima: solo frontend estático.
//
// - `dedupe: ['react', 'react-dom']` — evita dos copias de React resueltas
//   por Vite (síntoma: "Invalid hook call" en librerías con peer-dep de react).
// - `optimizeDeps.exclude: ['@gsap/react']` — obliga a Vite a servir el ESM
//   original en lugar de pre-empaquetarlo. Cuando lo pre-empaquetaba, generaba
//   su propio chunk `require_react` con hash distinto (056f21c5) del react
//   principal (ef22e242), rompiendo el hook context de React.
export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    exclude: ['@gsap/react'],
  },
})
