import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: '/', // Default — adjust if deploying to a subdirectory
  build: {
    // Generate source maps for debugging production issues
    sourcemap: false,
    // Keep chunks manageable
    chunkSizeWarningLimit: 800,
  },
  server: {
    port: 5173,
    open: false,
  },
});
