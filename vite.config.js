import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('/react/') || id.includes('/react-dom/')) return 'react';
          if (id.includes('/framer-motion/') || id.includes('/motion-dom/') || id.includes('/motion-utils/')) return 'motion';
          if (id.includes('/@supabase/')) return 'supabase';
          if (id.includes('/lucide-react/') || id.includes('/canvas-confetti/') || id.includes('/qrcode/')) return 'ui';
          return 'vendor';
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true,
  }
})
