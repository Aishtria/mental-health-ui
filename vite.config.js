import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  // only set base for GitHub Pages deployment
  base: process.env.NODE_ENV === 'production' ? '/mental-health-ui/' : '/',
});