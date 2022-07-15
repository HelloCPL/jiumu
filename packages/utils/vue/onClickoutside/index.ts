/**
 * 监听是否在某个div内点击
 * 用于指定div内某个子div是否显示
 */
import { ref, Ref, watch, nextTick } from 'vue'

// 监听是否在某个div内点击
export const onClickOutside = (box: Ref<HTMLElement | undefined>, time: number = 50) => {
  // 指定div内某个子div是否显示
  const isShow = ref<boolean>(false)
  let timeId: any = null
  // 点击判断
  const _clickoutside = (e: MouseEvent) => {
    nextTick(() => {
      if (!box.value) return
      // @ts-ignore
      if (box.value.contains(e.target)) {
        if (timeId) clearTimeout(timeId)
        isShow.value = true
      } else {
        if (timeId) clearTimeout(timeId)
        timeId = setTimeout(() => {
          isShow.value = false
        }, time)
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
export const onClickOutsideInput = (box: Ref<HTMLElement | undefined>, time: number = 50) => {
  // 指定div内某个子div是否显示
  const isShow = ref<boolean>(false)
  let _isFocus: boolean = false
  const switchShow = (flag: boolean) => {
    if (flag) {
      _isFocus = true
      isShow.value = true
    } else _isFocus = false
  }
  let timeId: any = null
  // 点击判断
  const _clickoutside = (e: MouseEvent) => {
    nextTick(() => {
      if (!box.value) return
      // @ts-ignore
      if (box.value.contains(e.target) || _isFocus) {
        if (timeId) clearTimeout(timeId)
        isShow.value = true
      } else {
        if (timeId) clearTimeout(timeId)
        timeId = setTimeout(() => {
          isShow.value = false
        }, time)
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
