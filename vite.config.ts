import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';
import { defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  test: {
    environment: 'jsdom', // Specify jsdom for testing React components
    globals: true, // Enable global variables like `describe`, `it`, etc.
    include: ['**/*.test.tsx', '**/*.test.ts'], // Specify test files pattern
    setupFiles: './src/setupTests.ts', // Optionally, a setup file for additional configuration
  },
  plugins: [
    react(),
    compression({
      verbose: true,
      disable: false,
      threshold: 10240, // Only compress files larger than 10KB
      algorithm: 'gzip', // Use Brotli compression
      ext: '.br',
    }),
  ],
  build: {
    minify: 'esbuild', // Minify the code with esbuild
    target: 'es2020', // Set modern JavaScript target
    cssCodeSplit: true, // Split CSS files for better cacheability
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Externalize big dependencies
        },
      },
    },
  },
});
