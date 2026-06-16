import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// En dev (npm run dev), /api est proxifié vers le backend local.
// En prod (Docker), nginx s'en charge.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:4000',
      '/health': 'http://localhost:4000',
    },
  },
});
