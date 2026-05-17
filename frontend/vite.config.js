import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react';
          }
          if (id.includes('node_modules/react-router-dom')) {
            return 'router';
          }
          if (
            id.includes('node_modules/axios') ||
            id.includes('node_modules/react-hook-form') ||
            id.includes('node_modules/react-toastify') ||
            id.includes('node_modules/lucide-react') ||
            id.includes('node_modules/date-fns')
          ) {
            return 'vendor';
          }
        },
      },
    },
  },
});
