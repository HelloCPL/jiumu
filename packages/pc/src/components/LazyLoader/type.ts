/*
 * 懒加载组件参数类型
 */

import { ExtractPropTypes, PropType } from 'vue'

type PreloadFn = (...args: any[]) => void

export const lazyLoaderProps = {
  // 监听配置
  observerOptions: {
    type: Object as PropType<IntersectionObserverInit>,
    default: () => ({})
  },
  // 是否展示加载状态
  showLoading: {
    type: Boolean,
    default: true
  },
  // 自定义预加载资源
  preloadResources: {
    type: Function as PropType<PreloadFn>
  },
  // 自定义延迟加载时间，单位 ms
  delay: {
    type: Number,
    default: 0
  }
} as const

export type LazyLoaderProps = ExtractPropTypes<typeof lazyLoaderProps>
