import { defineConfig, loadEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import ElementPlus from 'unplugin-element-plus/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'
import Components from 'unplugin-vue-components/vite'

const path = require('path')
const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const { VITE_MODE, VITE_PORT, VITE_PUBLIC_PATH } = env

  const plugins: any[] = [
    Vue(),
    VueJsx(),
    ElementPlus({}),
    Components({
      resolvers: [
        (componentName: string) => {
          if (componentName.startsWith('El')) {
            return { name: componentName, from: 'element-plus' }
          }
        }
      ]
    })
  ]

  if (VITE_MODE !== 'development') {
    // 打包压缩
    plugins.push(
      viteCompression({
        filter: (file) => {
          const flag1 = file.includes('jm-')
          const flag2 = /\.(js|mjs|json|css|html)$/i.test(file)
          return flag1 && flag2
        }
        // /dist\/assets.*\.(js|mjs|json|css)$/i
      })
    )
  }
  if (VITE_MODE === 'test') {
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
      port: Number(VITE_PORT),
      proxy: {
        '/jiumu-koa2-ts-test/': {
          target: 'https://www.jiumublog.cn/',
          changeOrigin: true
        },
        // 使用本地服务
        // '/jiumu-koa2-ts-test/': {
        //   target: 'http://localhost:7100/',
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/jiumu-koa2-ts-test/g, '')
        // },
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
          // api: 'modern-compiler'
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
          chunkFileNames: 'assets/js/jm-[name]-[hash].js',
          entryFileNames: 'assets/js/jm-[name]-[hash].js',
          assetFileNames: 'assets/[ext]/jm-[name]-[hash].[ext]',
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

const pkgs = [
  { name: 'echarts', path: 'echarts' },
  { name: 'mermaid', path: 'mermaid' },
  { name: 'docx-preview', path: 'docx-preview' },
  { name: '@kangc/v-md-editor', path: 'kangc-v-md-editor' },
  { name: '@wangeditor/editor', path: 'wangeditor-editor' },
  { name: 'vue3-ace-editor', path: 'vue3-ace-editor' },
  { name: 'ace-builds', path: 'ace-builds' },
  { name: 'gsap', path: 'gsap' },
  { name: 'highlight', path: 'highlight' },
  { name: 'luckyexcel', path: 'luckyexcel' },
  { name: 'luckysheet', path: 'luckysheet' },
  { name: 'pdfjs-dist', path: 'pdfjs-dist' },
  { name: 'jquery', path: 'jquery' }
]

function manualChunks(id: string) {
  if (id.includes('node_modules')) {
    for (const pkg of pkgs) {
      if (id.includes(pkg.name)) {
        return `vendor-${pkg.path}`
      }
    }
    // return 'vendor-other';
  }
}
