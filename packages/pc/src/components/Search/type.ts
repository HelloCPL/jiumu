/**
 * 搜索输入框盒子组件参数类型
 */

import { buildProps } from '@jiumu/utils'
import { ExtractPropTypes } from 'vue'
import { inputProps } from 'element-plus'

export const searchProps = buildProps({
  ...inputProps,
  modelValue: {
    type: String
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: '请输入'
  },
  size: {
    type: String,
    default: 'small'
  },
  clearable: {
    type: Boolean,
    default: true
  }
} as const)

export type SearchProps = ExtractPropTypes<typeof searchProps>
