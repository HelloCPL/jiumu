/**
 * 数字输入框组件参数类型
 */

import { buildProps } from '@jiumu/utils'
import { ExtractPropTypes } from 'vue'
import { inputProps as _inputProps } from 'element-plus'

export const inputProps = buildProps({
  ..._inputProps,
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
  modelValue: {
    type: [Number, String]
  },
  isFloat: Boolean // 是否允许小数
} as const)

export type InputProps = ExtractPropTypes<typeof inputProps>
