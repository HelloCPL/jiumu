/**
 * 权限管理
 */

import { useUserStore } from '@/store'
import { isArray, isElement } from 'lodash-es'
import { App, Directive, nextTick } from 'vue'

/**
 * 判断当前用户是否为超级管理员
 * 注意：超级管理员直接使用角色标识；其他情况请使用权限标识
 */
export function isSuper() {
  const userStore = useUserStore()
  return !!userStore.roles.find((item) => item.code === 'super')
}

/**
 * 检查权限
 * 注意：如果是超级管理员，直接返回 true
 * @params option 权限标识
 */
export function hasPermission(option: string | PermissionOptions) {
  if (isSuper()) return true
  const userStore = useUserStore()
  const isValid = (code: string) => {
    return !!userStore.permissions.find((item) => item.code === code)
  }

  if (typeof option === 'string' && option) {
    return isValid(option)
  } else if (typeof option === 'object') {
    const { code, rule = 'and' } = option
    if (typeof code === 'string' && code) return isValid(code)
    else if (isArray(code) && code.length) {
      let len = 0
      code.forEach((c) => {
        if (isValid(c)) len++
      })
      return rule === 'and' ? len === code.length : len > 0
    }
  }
  return true
}

const originalDisplayMap = new WeakMap<HTMLElement, string>()
/**
 * 保存元素原始 display 值
 */
function saveOriginalDisplay(el: HTMLElement) {
  if (!originalDisplayMap.has(el) && isElement(el)) {
    const originalDisplay = window.getComputedStyle(el).display
    originalDisplayMap.set(el, originalDisplay)
  }
}

/**
 * 恢复元素原始 display 值
 */
function restoreOriginalDisplay(el: HTMLElement) {
  const originalDisplay = originalDisplayMap.get(el)
  if (originalDisplay) {
    el.style.display = originalDisplay
  } else if (originalDisplayMap.has(el)) {
    el.style.display = ''
  }
}

function initElement(el: HTMLElement, option: string | PermissionOptions, t) {
  saveOriginalDisplay(el)
  const result = hasPermission(option)
  if (result === false) {
    nextTick(() => {
      el && el.style && (el.style.display = 'none')
    })
  } else {
    restoreOriginalDisplay(el)
  }
}

/**
 * 权限指令
 * 示例
 * v-permissions="'add'"
 * v-permissions="{code: 'add'}"
 * v-permissions="{code: ['add', 'add2']}" // 多个同时存在才真
 * v-permissions="{code: ['add', 'add2'], rule: 'or'}" // 有一个存在则真
 */
export const vPermission: Directive<HTMLElement, string | PermissionOptions> = {
  mounted(el, binding) {
    initElement(el, binding.value, 'mounted')
  },
  updated(el, binding) {
    initElement(el, binding.value, 'updated')
  },
  beforeUnmount(el) {
    originalDisplayMap.delete(el)
  }
}

/**
 * 注册权限指令
 */
export const registerPermission = (app: App) => {
  if (app) app.directive('permission', vPermission)
}
