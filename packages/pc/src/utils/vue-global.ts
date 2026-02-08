/**
 * 定义 vue 的全局变量或方法
 */

import { App } from 'vue'
import { ElInfiniteScroll } from 'element-plus'
import { createPinia, Pinia } from 'pinia'
import { usePiniaStoragePlugin } from '@jiumu/utils'
import { registerPermission } from './permission'

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

// 定义全局指令
export const defineDirective = (app: App) => {
  // element-plus 无限滚动
  app.directive('InfiniteScroll', ElInfiniteScroll)

  // 权限指令
  registerPermission(app)
}

const pinia: Pinia = createPinia()
pinia.use(usePiniaStoragePlugin)

// 引用 pinia
export const definePinia = (app: App) => {
  app.use(pinia)
}
