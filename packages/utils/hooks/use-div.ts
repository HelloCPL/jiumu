/**
 * div 中的一些方法
 */
import { isRef, Ref } from 'vue'

export type MaybeElementRef = Ref<HTMLElement | undefined> | HTMLElement | string

/**
 * 获取指定元素
 * @params target ref 元素 或类名
 */
export const getTargetElement = (target: MaybeElementRef): HTMLElement | null => {
  if (isRef(target)) {
    return target.value || null
  }
  if (target instanceof HTMLElement) {
    return target
  }
  if (typeof target === 'string') {
    return document.querySelector(target)
  }
  return null
}

/**
 * 获取指定元素距离页面距离
 * @param el 指定元素
 */
interface ClientResult {
  x: number
  y: number
}
export function getElementClient(el: HTMLElement): ClientResult {
  if (!el) return { x: 0, y: 0 }
  let current: HTMLElement | null = <HTMLElement>el.offsetParent
  let x = el.offsetLeft
  let y = el.offsetTop
  while (current) {
    x += current.offsetLeft
    y += current.offsetTop
    current = <HTMLElement>current.offsetParent
  }
  return {
    x,
    y
  }
}

interface ElementRectResult extends ClientResult {
  width: number
  height: number
  top: number
  left: number
  right: number
  bottom: number
}

export function getElementRect(el: HTMLElement): ElementRectResult {
  if (!el) {
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }
  }
  const rect = el.getBoundingClientRect()
  const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop
  const scrollLeft = window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft
  return {
    x: rect.left + scrollLeft,
    y: rect.top + scrollTop,
    width: rect.width,
    height: rect.height,
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft,
    right: rect.right + scrollLeft,
    bottom: rect.bottom + scrollTop
  }
}
