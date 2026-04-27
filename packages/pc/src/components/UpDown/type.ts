/**
 * 展开收起组件props传参
 */

import { isBoolean } from 'lodash-es'
import { EmitFn, ExtractPropTypes } from 'vue'

export const upDownProps = {
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
} as const

export type UpDownProps = ExtractPropTypes<typeof upDownProps>

export const upDownEmits = {
  'update:modelValue': (bol: boolean) => isBoolean(bol),
  change: (bol: boolean) => isBoolean(bol)
}

export type UpDownEmits = EmitFn<typeof upDownEmits>
