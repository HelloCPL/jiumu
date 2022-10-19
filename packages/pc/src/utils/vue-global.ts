/**
 * 定义 vue 的全局变量或方法
 */

import { App } from 'vue'
import { useUserStore } from '@/store'
import { ElInfiniteScroll } from 'element-plus'

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
  app.directive('code', (el: HTMLElement, binding) => {
    const value = <string>binding.value
    if (!value) return
    const userStore = useUserStore()
    const values = value.split(',')
    let flag: boolean = true
    values.find((val) => {
      flag = _findPermissions(val, userStore.permissions)
      if (!flag) return true
    })
    if (!flag) el.style.display = 'none'
  })

  app.directive('InfiniteScroll', ElInfiniteScroll)
}

function _findPermissions(val: string, arr: DataPermission[]): boolean {
  let flag = false
  arr.find((item) => {
    if (item.code === val) {
      flag = true
      return flag
    }
  })
  return flag
}
