/**
 * 定时器
 */

import { onBeforeUnmount } from 'vue'
import { isSetup } from '../tools'

type TimerFn = () => void

export const useTimer = (delay?: number) => {
  let timer: any = null

  const getTimer = () => timer

  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  const setTimer = (fn: TimerFn, time?: number) => {
    const t = time || delay || 0
    clearTimer()
    timer = setTimeout(fn, t)
  }

  if (isSetup()) {
    onBeforeUnmount(clearTimer)
  }

  return {
    getTimer,
    clearTimer,
    setTimer
  }
}
