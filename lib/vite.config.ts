import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index.ts'),
      name: 'sisux-react',
      formats: ['es', 'umd'],
      fileName: (format) => `sisux-react.${format}.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        '@azure/msal-browser',
        '@azure/msal-react',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@azure/msal-browser': 'MsalBrowser',
          '@azure/msal-react': 'MsalReact',
        },
      },
    },
  },
});
