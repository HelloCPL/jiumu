import { defineConfig, loadEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'
import VueJsx from '@vitejs/plugin-vue-jsx'
import ElementPlus from 'unplugin-element-plus/vite'

const path = require('path')
const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const { VITE_MODE, VITE_PUBLIC_PATH } = env

  return {
    plugins: [Vue(), DefineOptions(), VueJsx(), ElementPlus()],
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
        '/jiumu-koa2-ts-test/': {
          target: 'https://www.jiumublog.cn/',
          changeOrigin: true
        },
        // 使用本地服务
        // '/jiumu-koa2-ts-test/': {
        //   target: 'http://localhost:3030/',
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
          additionalData: `@import "./src/style/css/env.${VITE_MODE}.scss";`
        },
        less: {
          javascriptEnabled: true
        }
      }
    }
  }
})
