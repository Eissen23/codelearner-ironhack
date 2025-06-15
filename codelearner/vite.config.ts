import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: `@import "bootstrap/scss/functions";
                        @import "bootstrap/scss/variables";
                        @import "bootstrap/scss/mixins";`,
      },
    },
  },
  build: {
    sourcemap: true,
  },
  optimizeDeps: {
    exclude: ['ollama']
  },
  resolve: {
    alias: {
      'ollama': 'ollama/dist/index.mjs'
    }
  },
  ssr: {
    noExternal: ['ollama']
  },
  define: {
    'process.env.NODE_DEBUG': 'false'
  }
});
