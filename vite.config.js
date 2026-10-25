import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        browse: resolve(__dirname, 'browse.html'),
        flappy: resolve(__dirname, 'flappy.html'),
        merge: resolve(__dirname, 'merge.html'), // Add this line!
      },
    },
  },
});