/*
 * 懒加载组件参数类型
 */

import { buildProps } from '@jiumu/utils'
import { ExtractPropTypes, PropType } from 'vue'

export const lazyLoaderProps = buildProps({
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
    type: Function
  }
} as const)

export type LazyLoaderProps = ExtractPropTypes<typeof lazyLoaderProps>
