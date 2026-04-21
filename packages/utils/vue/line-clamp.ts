import type { App, Directive } from 'vue'
import { nextTick } from 'vue'

interface LineClampElement extends HTMLElement {
  _tooltipAdded?: boolean
}

interface LineClampOptions {
  content: string
  lineClamp: number
}

/**
 * 指定多行显示指令
 * v-line-clamp="{
 *   content: string // 原始文本
 *   lineClamp: number // 最多显示几行
 * }"
 */
export const vLineClamp: Directive<LineClampElement, LineClampOptions> = {
  mounted(el, binding) {
    initTooltip(el, binding.value)
  },
  updated(el, binding) {
    initTooltip(el, binding.value)
  },
  unmounted(el) {
    cleanupTooltip(el)
  }
}

/**
 * 全局注册
 */
export const registerLineClamp = (app: App) => {
  if (app) {
    app.directive('line-clamp', vLineClamp)
  }
}

/**
 * !!!!!!!!!!!!!!!!!
 * 使用方法
 * 直接导入 vLineClamp
 * 或导入 registerLineClamp 全局注册
 */

function initTooltip(el: LineClampElement, options: LineClampOptions) {
  const { content, lineClamp = 2 } = options

  // 确保先应用多行省略样式
  applyLineClamp(el, lineClamp)

  // 检查是否需要Tooltip
  nextTick(() => {
    checkOverflow(el, content)
  })
}
function applyLineClamp(el: LineClampElement, lineClamp: number) {
  // 确保基础样式应用
  el.style.display = '-webkit-box'
  el.style.webkitLineClamp = `${lineClamp}`
  el.style.webkitBoxOrient = 'vertical'
  el.style.overflow = 'hidden'
  el.style.textOverflow = 'ellipsis'
  el.style.wordBreak = 'break-all'
  el.style.boxSizing = 'content-box'
  el.style.whiteSpace = 'normal'
  el.style.textAlign = 'left'
  el.style.height = 'auto'

  // 精确计算高度
  const lineHeight = Number.parseInt(getComputedStyle(el).lineHeight) || 20
  el.style.lineHeight = `${lineHeight}px`
  el.style.maxHeight = `${lineHeight * lineClamp}px`
}

function checkOverflow(el: LineClampElement, content: string) {
  const isOverflow = el.scrollHeight > el.clientHeight

  if (isOverflow) {
    if (!el._tooltipAdded) {
      // 仅添加原生title作为简单解决方案
      el.setAttribute('title', content)
      el._tooltipAdded = true
    }
  }
  else {
    if (el._tooltipAdded) {
      el.removeAttribute('title')
      el._tooltipAdded = false
    }
  }
}

function cleanupTooltip(el: LineClampElement) {
  if (el._tooltipAdded) {
    el.removeAttribute('title')
    delete el._tooltipAdded
  }
}
