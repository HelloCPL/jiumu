import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'
import VueJsx from '@vitejs/plugin-vue-jsx'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [vue(), DefineOptions(), VueJsx()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    // publicDir: env.VITE_PUBLIC_PATH,
    server: {
      port: 8002,
      proxy: {
        '/jiumu-koa2-ts-test/web/': {
          target: 'https://www.jiumublog.cn',
          changeOrigin: true
        }
      }
    }
  }
})
