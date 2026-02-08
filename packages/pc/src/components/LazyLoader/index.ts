/**
 * @description 懒加载组件逻辑处理
 * @author cpl
 * @create 2023-04-10 11:21:45
 */

import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { LazyLoaderProps } from './type'

export const useIndex = (props: LazyLoaderProps) => {
  const isLoaded = ref(false)
  const isLoading = ref(false)
  const observerRef = ref<HTMLElement | null>(null)

  let observer: IntersectionObserver | null = null

  // 初始化观察者
  const initObserver = () => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return loadContent()
    }
    const options: IntersectionObserverInit = {
      rootMargin: '0px',
      threshold: 0,
      ...props.observerOptions
    }
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // 元素进入视口或达到阈值
        if (entry.isIntersecting) {
          loadContent()
          observer?.unobserve(entry.target)
          observer = null
        }
      })
    }, options)

    if (observerRef.value) {
      observer.observe(observerRef.value)
    }
  }

  // 加载内容
  const loadContent = async () => {
    if (isLoaded.value || isLoading.value) return
    isLoading.value = true
    try {
      if (props.preloadResources) {
        await props.preloadResources()
      }
      await nextTick()
    } finally {
      setTimeout(() => {
        isLoaded.value = true
        isLoading.value = false
      }, props.delay)
    }
  }

  const reload = () => {
    isLoaded.value = false
    initObserver()
  }

  const cleanup = () => {
    if (observer && observerRef.value) {
      observer.unobserve(observerRef.value)
      observer.disconnect()
      observer = null
    }
  }

  onMounted(() => {
    initObserver()
  })

  onBeforeUnmount(() => {
    cleanup()
  })

  return {
    isLoaded,
    isLoading,
    observerRef,
    loadContent,
    reload
  }
}
