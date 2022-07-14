/**
 * 监听鼠标在某个div中滚动
 * 向下滚动为负数 向上滚动为正数
 */
import { ref, nextTick, onMounted, onUnmounted } from 'vue'

type Callback = (t: number) => void

export const useDivMousewheel = (cb: Callback) => {
  const refDiv = ref<HTMLElement>()

  const mousewheel = (e: any) => {
    nextTick(() => {
      if (!refDiv.value) return
      const { clientWidth, clientHeight } = refDiv.value
      const left = getElLeft(refDiv.value)
      const top = getElTop(refDiv.value)
      const { clientX, clientY } = e
      const flag =
        clientX >= left && clientX <= left + clientWidth && clientY >= top && clientY <= top + clientHeight

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

  return {
    refDiv
  }
}

function addEvent(fn): void {
  // @ts-ignore
  if (window.onmousewheel === null) {
    window.addEventListener('mousewheel', fn)
  } else {
    window.addEventListener('DOMMouseScroll', fn)
  }
}

function removeEvent(fn): void {
  // @ts-ignore
  if (window.onmousewheel === null) {
    window.removeEventListener('mousewheel', fn)
  } else {
    window.addEventListener('DOMMouseScroll', fn)
  }
}

// 获取节点距离页面左侧距离
function getElLeft(el: HTMLElement): number {
  let left = el.offsetLeft
  let current: HTMLElement | null = <HTMLElement>el.offsetParent
  while (current) {
    left += current.offsetLeft
    current = <HTMLElement>current.offsetParent
  }
  return left
}

// 获取节点距离页面上方距离
function getElTop(el: HTMLElement): number {
  let top = el.offsetTop
  let current: HTMLElement | null = <HTMLElement>el.offsetParent
  while (current) {
    top += current.offsetTop
    current = <HTMLElement>current.offsetParent
  }
  return top
}
