/**
 * 展开收起组件props传参
 */

import { buildProps } from '@jiumu/utils'
import { ExtractPropTypes } from 'vue'

export const upDownProps = buildProps({
  modelValue: {
    // 是否展开
    type: Boolean,
    default: true
  },
  minHeight: {
    // 超过最小高度时开启功能
    type: Number,
    default: 150
  }
} as const)

export type UpDownProps = ExtractPropTypes<typeof upDownProps>
