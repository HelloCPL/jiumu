/**
 * div 中的一些方法
 */
import { Ref } from 'vue'

export type MaybeElementRef = Ref<HTMLElement | undefined> | string

/**
 * 获取指定元素距离页面距离
 */
interface ClientResult {
  x: number
  y: number
}
export function getElementClient(el: HTMLElement): ClientResult {
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
