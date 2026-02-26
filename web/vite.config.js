import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // REST: /api/health → http://localhost:8000/health
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      // WebSocket: /ws/voice → ws://localhost:8000/ws/voice
      '/ws': {
        target: 'ws://localhost:8000',
        ws: true,
      },
    },
  },
})
