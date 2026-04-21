/**
 * @description 锁定遮罩层底下滚动
 * @author cpl
 * @create 2023-04-20 11:49:35
 */

import { onBeforeUnmount } from 'vue'
import { isSetup } from '../tools'

let islocked = false

export const useBodyLocked = () => {
  const lockScroll = () => {
    let bar = 17
    const root = document.documentElement
    if (typeof window.innerWidth == 'number') {
      bar = window.innerWidth - root.clientWidth
    }
    root.style.overflow = 'hidden'
    root.style.borderRight = bar + 'px solid transparent'
    islocked = true
  }

  const unlockScroll = () => {
    const root = document.documentElement
    root.style.overflow = ''
    root.style.borderRight = ''
    islocked = false
  }

  if (isSetup()) {
    onBeforeUnmount(() => {
      if (islocked) {
        unlockScroll()
      }
    })
  }

  return {
    lockScroll,
    unlockScroll
  }
}
