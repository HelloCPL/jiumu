/**
 * 搜索输入框盒子组件参数类型
 */

import { buildProps } from '@jiumu/utils'
import { ExtractPropTypes } from 'vue'
import { inputProps } from 'element-plus'

export const searchProps = buildProps({
  // 其他参数与 elementPlus Input 参数保持一致
  ...inputProps,
  // 双向绑定
  modelValue: {
    type: String
  },
  // 类型
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
