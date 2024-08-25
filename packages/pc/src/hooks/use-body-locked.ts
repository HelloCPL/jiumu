/**
 * @description 锁定遮罩层底下滚动
 * @author cpl
 * @create 2023-04-20 11:49:35
 */

import { onMounted, onBeforeUnmount } from 'vue'

export const useBodyLocked = () => {
  const lockScroll = () => {
    let bar = 17
    const root = document.documentElement
    if (typeof window.innerWidth == 'number') {
      bar = window.innerWidth - root.clientWidth
    }
    root.style.overflow = 'hidden'
    root.style.borderRight = bar + 'px solid transparent'
  }
  onMounted(lockScroll)

  const unlockScroll = () => {
    const root = document.documentElement
    root.style.overflow = ''
    root.style.borderRight = ''
  }
  onBeforeUnmount(unlockScroll)
}
