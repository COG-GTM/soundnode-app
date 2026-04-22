import { defineConfig } from 'vite';

// Electron loads app/index.html directly via file://, so the Lit code must be
// shipped as a self-contained bundle (bare module specifiers like 'lit' and
// '@vaadin/router' cannot be resolved by the browser at runtime). We use Vite's
// library mode to produce a single ES module at app/dist/lit-bundle.js, which
// app/index.html references directly.
export default defineConfig({
  root: './app',
  base: './',
  resolve: {
    extensions: ['.js', '.ts'],
  },
  build: {
    outDir: 'dist',
    target: 'chrome89',
    emptyOutDir: true,
    lib: {
      entry: 'public/js/lit-entry.js',
      formats: ['es'],
      fileName: () => 'lit-bundle.js',
    },
    rollupOptions: {
      external: ['electron'],
    },
  },
});
