/**
 * 监听是否在某个div内点击
 * 用于指定div内某个子div是否显示
 */
import { ref, watch, nextTick } from 'vue'
import { getTargetElement, MaybeElementRef } from './use-div'
import { useTimer } from './use-timer'

// 监听是否在某个div内点击
export const useClickOutside = (box: MaybeElementRef, time: number = 50) => {
  // 指定div内某个子div是否显示
  const isShow = ref<boolean>(false)

  const { clearTimer, setTimer } = useTimer(time)
  // 点击判断
  const _clickoutside = (e: MouseEvent) => {
    nextTick(() => {
      const el = getTargetElement(box)
      if (!el) {
        isShow.value = false
        return
      }
      clearTimer()
      // @ts-ignore
      if (el.contains(e.target)) {
        isShow.value = true
      } else {
        setTimer(() => {
          isShow.value = false
        })
      }
    })
  }

  watch(isShow, (val) => {
    if (val) {
      document.addEventListener('click', _clickoutside, true)
    } else {
      document.removeEventListener('click', _clickoutside, true)
    }
  })
  return {
    isShow
  }
}

// 监听是否在某个输入框内聚焦或某个div内点击
export const useClickOutsideInput = (box: MaybeElementRef, time: number = 50) => {
  // 指定div内某个子div是否显示
  const isShow = ref<boolean>(false)
  let _isFocus: boolean = false
  const switchShow = (flag: boolean) => {
    if (flag) {
      _isFocus = true
      isShow.value = true
    } else _isFocus = false
  }
  const { clearTimer, setTimer } = useTimer(time)
  // 点击判断
  const _clickoutside = (e: MouseEvent) => {
    nextTick(() => {
      const el = getTargetElement(box)
      if (!el) {
        isShow.value = false
        _isFocus = false
        return
      }
      clearTimer()
      // @ts-ignore
      if (el.contains(e.target) || _isFocus) {
        isShow.value = true
      } else {
        setTimer(() => {
          isShow.value = false
        })
      }
    })
  }

  watch(isShow, (val) => {
    if (val) {
      document.addEventListener('click', _clickoutside, true)
    } else {
      document.removeEventListener('click', _clickoutside, true)
    }
  })
  return {
    isShow,
    switchShow
  }
}
