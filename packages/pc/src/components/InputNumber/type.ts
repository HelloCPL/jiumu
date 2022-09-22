/**
 * 数字输入框组件参数类型
 */

import { buildProps } from '@jiumu/utils'
import { ExtractPropTypes } from 'vue'
import { inputNumberProps as _inputNumberProps } from 'element-plus'

export const inputNumberProps = buildProps({
  // 其他参数与elementPlus inputNumber 组件参数保持一致
  ..._inputNumberProps,
  // 最小值
  min: {
    type: Number,
    default: 1
  },
  // 最大值
  max: {
    type: Number,
    default: 9999
  },
  // 步长
  step: {
    type: Number,
    default: 1
  },
  // 是否只能输入step的倍数
  stepStrictly: {
    type: Boolean,
    default: true
  },
  // 双向绑定值
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
