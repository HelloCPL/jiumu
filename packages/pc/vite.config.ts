import { defineConfig, loadEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'
import VueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      Vue(),
      DefineOptions(),
      VueJsx(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    publicDir: env.VITE_PUBLIC_DIR,
    server: {
      port: 8002,
      proxy: {
        '/jiumu-koa2-ts-test/pc/': {
          target: 'https://www.jiumublog.cn/',
          changeOrigin: true
        }
        // // 使用本地服务
        // '/jiumu-koa2-ts-test/pc/': {
        //   target: 'http://localhost:3030/',
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/jiumu-koa2-ts-test/g, '')
        // }
      }
    }
  }
})
