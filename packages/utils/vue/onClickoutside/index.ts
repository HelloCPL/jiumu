/**
 * 监听是否在某个div内点击
 * 用于指定div内某个子div是否显示
 */
import { isArray } from 'lodash-es'
import { ref, watch, nextTick, isRef } from 'vue'
import { MaybeElementRef } from '../use-div'

// 监听是否在某个div内点击
export const onClickOutside = (box: MaybeElementRef, time: number = 50) => {
  // 指定div内某个子div是否显示
  const isShow = ref<boolean>(false)
  let timeId: any = null
  // 点击判断
  const _clickoutside = (e: MouseEvent) => {
    nextTick(() => {
      let el: HTMLElement
      if (isRef(box)) el = <HTMLElement>box.value
      else {
        const _box: any = document.querySelector(<string>box)
        if (isArray(_box)) el = _box[0]
        else if (_box) el = _box
      }
      if (!el) {
        isShow.value = false
        return
      }
      // @ts-ignore
      if (el.contains(e.target)) {
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
export const onClickOutsideInput = (box: MaybeElementRef, time: number = 50) => {
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
      let el: HTMLElement
      if (isRef(box)) el = <HTMLElement>box.value
      else {
        const _box: any = document.querySelector(<string>box)
        if (isArray(_box)) el = _box[0]
        else if (_box) el = _box
      }
      if (!el) {
        isShow.value = false
        _isFocus = false
        return
      }
      // @ts-ignore
      if (el.contains(e.target) || _isFocus) {
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
