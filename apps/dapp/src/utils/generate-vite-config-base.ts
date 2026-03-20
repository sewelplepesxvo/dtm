/// <reference types="vitest/config" />
import path from 'path';
import process from 'process';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import react from '@vitejs/plugin-react';
import { UserConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export function generateViteConfigBase(
  name: string,
  siteName: string,
  port: number
): UserConfig {
  const modulePath = process.cwd();

  return {
    root: modulePath,
    cacheDir: `../../node_modules/.vite/apps/${name}`,

    server: {
      port,
      host: 'localhost',
      open: `http://localhost:${port}`,
    },

    preview: {
      port,
      host: 'localhost',
    },

    plugins: [
      react(),
      nodePolyfills(),
      nxViteTsPaths(),
      nxCopyAssetsPlugin(['*.md']),
      {
        name: 'html-transform',
        transformIndexHtml(html: string) {
          return html.replace('%SITE_NAME%', `${siteName}`);
        },
      },
    ],

    resolve: {
      alias: {
        // keep legacy path for any direct imports but prefer package alias
        'libs/ui/src': path.resolve(modulePath, '../../libs/ui/src'),
        '@defi-token/ui': path.resolve(modulePath, '../../libs/ui/src/lib'),
        'libs/blockchain/src': path.resolve(
          modulePath,
          '../../libs/blockchain/src'
        ),
        '@react-native-async-storage/async-storage': false,
      },
    },

    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis',
        },
      },
      include: ['tailwindcss', '@tailwindcss/forms', '@tailwindcss/typography'],
      exclude: ['@react-native-async-storage/async-storage'],
    },

    build: {
      outDir: `../../dist/apps/${name}`,
      emptyOutDir: true,
      reportCompressedSize: true,
      chunkSizeWarningLimit: 10000,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      //minify: isProduction,
    },

    // test: {
    //   watch: false,
    //   globals: true,
    //   environment: 'jsdom',
    //   include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    //   reporters: ['default'],
    //   coverage: {
    //     reportsDirectory: `../../coverage/apps/${name}`,
    //     provider: 'v8',
    //   },
    // },

    test: {
      watch: false,
      globals: true,
      cache: {
        dir: '../../node_modules/.vitest',
      },
      environment: 'jsdom',
      setupFiles: ['../../vitest-setup.ts'],
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      reporters: ['default'],
      coverage: {
        reportsDirectory: `../../coverage/apps/${name}`,
        provider: 'v8',
      },
    },

    assetsInclude: ['**/*.md'],
  };
}
