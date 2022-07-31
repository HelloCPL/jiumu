/**
 * 数字输入框组件参数类型
 */

import { buildProps } from '@jiumu/utils'
import { ExtractPropTypes } from 'vue'
import { inputNumberProps as _inputNumberProps } from 'element-plus'

export const inputNumberProps = buildProps({
  ..._inputNumberProps,
  min: {
    type: Number,
    default: 1
  },
  max: {
    type: Number,
    default: 9999
  },
  step: {
    type: Number,
    default: 1
  },
  stepStrictly: {
    type: Boolean,
    default: true
  },
  modelValue: {
    type: [Number],
    default: 1
  },
  placeholder: {
    type: String,
    default: '请输入'
  },
  isFloat: Boolean // 是否允许小数
} as const)

export type inputNumberProps = ExtractPropTypes<typeof inputNumberProps>
