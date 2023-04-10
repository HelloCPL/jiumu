/*
 * 懒加载组件参数类型
 */

import { buildProps } from '@jiumu/utils'
import { ExtractPropTypes } from 'vue'

export const lazyLoaderProps = buildProps({
  // 宽
  width: {
    type: String,
    default: '100%'
  },
  // 高
  height: {
    type: String,
    default: '100%'
  }
} as const)

export type LazyLoaderProps = ExtractPropTypes<typeof lazyLoaderProps>
