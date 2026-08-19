import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuração enxuta: o Vite serve a pasta public como raiz estática,
// então os CSV ficam disponíveis em /datasets/<arquivo>.csv tanto em
// desenvolvimento quanto no build de produção.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
