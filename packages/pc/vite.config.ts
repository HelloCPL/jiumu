import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite'
import Vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'
import VueJsx from '@vitejs/plugin-vue-jsx'
import ElementPlus from 'unplugin-element-plus/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'
import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'
import Components from 'unplugin-vue-components/vite'

const path = require('path')
const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const { VITE_MODE, VITE_PUBLIC_PATH } = env

  const plugins: any[] = [Vue(), DefineOptions(), VueJsx(), ElementPlus(), Components()]

  if (VITE_MODE === 'development') {
    // 本地预加载
    plugins.push(...[PkgConfig(), OptimizationPersist()])
  }
  if (VITE_MODE === 'test') {
    // 代码分割
    plugins.push(splitVendorChunkPlugin())
    // 打包压缩
    plugins.push(viteCompression())
    // 生成打包可视化
    plugins.push(visualizer())
  }

  return {
    plugins,
    resolve: {
      alias: {
        '@': pathSrc
      }
    },
    base: VITE_PUBLIC_PATH,
    // publicDir: VITE_PUBLIC_PATH,
    server: {
      port: 8002,
      proxy: {
        // '/jiumu-koa2-ts-test/': {
        //   target: 'https://www.jiumublog.cn/',
        //   changeOrigin: true
        // },
        // 使用本地服务
        '/jiumu-koa2-ts-test/': {
          target: 'http://localhost:3030/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/jiumu-koa2-ts-test/g, '')
        },
        '/jiumu-static-test/': {
          target: 'https://www.jiumublog.cn/',
          changeOrigin: true
        }
        // 使用本地服务
        // '/jiumu-static-test/': {
        //   target: 'http://127.0.0.1:8080/',
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/jiumu-static-test/g, '')
        // }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/style/css/env.${VITE_MODE}.scss";`
        },
        less: {
          javascriptEnabled: true
        }
      }
    },
    // 打包优化
    build: {
      // target: 'esnext',
      // outDir: 'dist',
      // assetsDir: 'assets',
      // minify: 'terser',
      // rollupOptions: {
      //   manualChunks(id) {
      //     if (id.includes('node_modules')) {
      //       return id.toString().split('node_modules/')[1].split('/')[0].toString()
      //     }
      //   }
      // }
      target: 'esnext',
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks
          // manualChunks: {
          //   Echarts: ['echarts']
          //   // Vue: ['vue', 'vue-router'],
          //   // VuePdfEmbed: ['vue-pdf-embed'],
          //   // Vue3Pdf3: ['vue3-pdfjs'],
          //   // // DocxPreview: ['docx-preview'],
          //   // VMdEditor: ['@kangc/v-md-editor'],
          //   // WangEditor: ['@wangeditor/editor'],
          //   // HighLight: ['highlight.js'],
          //   // Jquery: ['jquery'],
          //   // JiumuUtils: ['@jiumu/utils'],
          //   // GSAP: ['gsap']
          // }
        }
      }
    }
  }
})

function manualChunks(id) {
  if (id.includes('node_modules')) {
    if (id.includes('echarts')) {
      return 'vendor-echarts'
    }
    if (id.includes('mermaid')) {
      return 'vendor-mermaid'
    }
    // return 'vendor-other';
  }
}
