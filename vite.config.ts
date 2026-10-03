// Vite configuration for Sembros Electric Co.
// No plugin imports are required here: Vite natively transpiles TSX via esbuild.
/** @type {import('vite').UserConfig} */
export default {
  root: '.',
  server: {
    open: false,
    port: 5173,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
};