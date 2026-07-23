import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      // El troceado por vendor solo aplica al bundle de cliente. En el build SSR
      // (usado por `npm run smoke`) React va como external y romperia manualChunks.
      output: isSsrBuild
        ? {}
        : {
            manualChunks: {
              react: ['react', 'react-dom', 'react-router-dom'],
              motion: ['motion'],
              icons: ['@phosphor-icons/react'],
            },
          },
    },
  },
}))
