import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  // Base path for the application
  base: '/',

  // Root directory
  root: 'src',

  // Build configuration
  build: {
    // Output directory (relative to project root)
    outDir: '../dist',
    // Empty output directory before build
    emptyOutDir: true,
    // Generate source maps for production
    sourcemap: false,
    // Minify for production
    minify: 'terser',
    // Terser options for better compression
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Rollup options
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
      },
      output: {
        // Manual chunks for better caching
        manualChunks: undefined,
      },
    },
    // Force rebuild
    watch: null,
    // Target browsers
    target: 'es2015',
    // CSS code splitting
    cssCodeSplit: true,
    // Assets directory
    assetsDir: 'assets',
    // File name pattern
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
  },

  // Development server configuration
  server: {
    // Host
    host: true,
    // Port
    port: 5173,
    // Open browser automatically
    open: true,
    // Hot module replacement
    hmr: true,
    // CORS
    cors: true,
    // Proxy configuration (uncomment and configure if needed)
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
  },

  // Preview server configuration (for production build preview)
  preview: {
    port: 4173,
    host: true,
    open: true,
  },

  // Plugin configuration
  plugins: [
    // Legacy plugin for older browsers (if needed)
    // legacy({
    //   targets: ['defaults', 'not IE 11'],
    // }),
  ],

  // Path aliases
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@components': resolve(__dirname, 'src/components'),
      '@styles': resolve(__dirname, 'src/styles'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@js': resolve(__dirname, 'src/js'),
    },
  },

  // CSS configuration
  css: {
    // CSS modules
    modules: {
      localsConvention: 'camelCase',
    },
    // PostCSS configuration
    postcss: './postcss.config.js',
    // CSS preprocessor options
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.css";`,
      },
    },
  },

  // Dependency optimization
  optimizeDeps: {
    include: [
      // Add dependencies to pre-bundle
    ],
    exclude: [
      // Exclude dependencies from pre-bundling
    ],
  },

  // Environment variables
  envPrefix: 'VITE_',

  // Define global constants
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },

  // ESBuild configuration (for faster builds)
  esbuild: {
    // Drop console.log in production
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    // Target
    target: 'es2015',
    // Minify identifiers
    minifyIdentifiers: true,
    // Minify syntax
    minifySyntax: true,
    // Minify whitespace
    minifyWhitespace: true,
  },

  // Logging
  logLevel: 'info',
  clearScreen: true,
});
