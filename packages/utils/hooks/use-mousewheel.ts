/**
 * 监听鼠标在某个div中滚动
 * 向下滚动为负数 向上滚动为正数
 */
import { nextTick, onMounted, onUnmounted } from 'vue'
import { MaybeElementRef, getElementClient, getTargetElement } from './use-div'

type Callback = (t: number) => void

export const useMousewheel = (box: MaybeElementRef, cb: Callback) => {
  const mousewheel = (e: any) => {
    nextTick(() => {
      const el = getTargetElement(box)
      if (!el) return
      const { clientWidth, clientHeight } = el
      const { x, y } = getElementClient(el)
      const { clientX, clientY } = e
      const flag = clientX >= x && clientX <= x + clientWidth && clientY >= y && clientY <= y + clientHeight

      if (flag) {
        // -1 向下滚动 1 向上滚动
        let wheel = 0
        if (e.type === 'mousewheel') {
          wheel = e.wheelDeltaY > 0 ? 1 : -1
        } else if (e.type === 'DOMMouseScroll') {
          wheel = e.detail > 0 ? -1 : 1
        }
        if (wheel === 1 || wheel === -1) {
          cb(wheel)
        }
      }
    })
  }

  onMounted(() => {
    addEvent(mousewheel)
  })

  onUnmounted(() => {
    removeEvent(mousewheel)
  })
}

function addEvent(fn: any): void {
  // @ts-ignore
  if (window.onmousewheel === null) {
    window.addEventListener('mousewheel', fn)
  } else {
    window.addEventListener('DOMMouseScroll', fn)
  }
}

function removeEvent(fn: any): void {
  // @ts-ignore
  if (window.onmousewheel === null) {
    window.removeEventListener('mousewheel', fn)
  } else {
    window.addEventListener('DOMMouseScroll', fn)
  }
}
