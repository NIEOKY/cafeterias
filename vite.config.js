import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/vite-deploy/',
  assetsInclude: ['cafes.csv'],
  server: {
    open: true, // Opcional: abrir automáticamente la aplicación en el navegador
  },
});
