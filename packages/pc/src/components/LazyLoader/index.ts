/**
 * @description 懒加载组件逻辑处理
 * @author cpl
 * @create 2023-04-10 11:21:45
 */

import { ref, onMounted, onBeforeUnmount } from 'vue'

export const useIndex = () => {
  const isLoad = ref(false)
  const box = ref<any>(null)

  let observer: any

  const _load = () => {
    observer = initLazyIntersectionObserver((entry: IntersectionObserverEntry) => {
      // 当内容可见
      if (entry.isIntersecting) {
        isLoad.value = true
        observer.unobserve(box.value)
        observer = null
      }
    })
    if (observer && box.value) observer.observe(box.value)
  }

  onMounted(_load)
  onBeforeUnmount(() => {
    if (observer && box.value) observer.unobserve(box.value)
  })

  return {
    isLoad,
    box
  }
}

// 监听元素是否在可视窗口出现
function initLazyIntersectionObserver(fn: Function) {
  const observer = new IntersectionObserver(
    (entries) => {
      return entries.forEach((entry) => fn(entry))
    },
    {
      rootMargin: '0px',
      threshold: 0
    }
  )
  return observer
}
