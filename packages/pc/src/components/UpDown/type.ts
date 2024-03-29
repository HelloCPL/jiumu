/**
 * 展开收起组件props传参
 */

import { buildProps, EmitFn } from '@jiumu/utils'
import { isBoolean } from 'lodash-es'
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

export const upDownEmits = {
  'update:modelValue': (bol: boolean) => isBoolean(bol),
  change: (bol: boolean) => isBoolean(bol)
}

export type UpDownEmits = EmitFn<typeof upDownEmits>
