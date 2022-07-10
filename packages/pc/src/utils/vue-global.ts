/**
 * 定义 vue 的全局变量或方法
 */

import { App } from 'vue'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $STATIC_URL: string // 这里可以用$Api具体的类型代替any
  }
}

export const defineGlobal = (app: App) => {
  // 全局属性/变量
  app.config.globalProperties.$STATIC_URL = import.meta.env.VITE_STATIC_URL

  // 全局方法
}
