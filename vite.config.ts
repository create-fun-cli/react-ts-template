import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig, loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import { AntdResolve, createStyleImportPlugin } from 'vite-plugin-style-import'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.')

  return {
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve('src'),
        components: resolve('src/components'),
        views: resolve('src/views'),
      },
    },
    plugins: [
      react(),
      createHtmlPlugin({
        inject: {
          data: {
            title: env.VITE_SITE_TITLE,
          },
        },
      }),
      createStyleImportPlugin({
        resolves: [AntdResolve()],
      }),
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
    ],
    build: {
      minify: 'esbuild',
      target: 'esnext',
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom', 'react-transition-group'],
            antd: ['antd'],
          },
        },
      },
    },
    server: {
      open: true,
    },
  }
})
