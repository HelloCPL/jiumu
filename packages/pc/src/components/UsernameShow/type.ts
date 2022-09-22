/**
 * 账号显示组件参数类型
 */

import { buildProps } from '@jiumu/utils'
import { ExtractPropTypes } from 'vue'

export const usernameShowProps = buildProps({
  // 文本
  text: {
    type: String,
    default: ''
  },
  // 显示前面位数
  start: {
    type: Number,
    default: 3
  },
  // 显示后面位数
  end: {
    type: Number,
    default: 4
  }
} as const)

export type UsernameShowProps = ExtractPropTypes<typeof usernameShowProps>
