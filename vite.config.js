import { defineConfig } from 'vite';

export default defineConfig({
  root: './app',
  base: './',
  resolve: {
    extensions: ['.js', '.ts'],
  },
  build: {
    outDir: 'dist',
    target: 'chrome89',
    rollupOptions: {
      external: ['electron'],
    },
  },
});
