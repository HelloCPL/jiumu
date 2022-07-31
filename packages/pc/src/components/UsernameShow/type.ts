/**
 * 账号显示组件参数类型
 */

import { buildProps } from '@jiumu/utils'
import { ExtractPropTypes } from 'vue'

export const usernameShowProps = buildProps({
  text: {
    type: String,
    default: ''
  },
  start: {
    type: Number,
    default: 3
  },
  end: {
    type: Number,
    default: 4
  }
} as const)

export type UsernameShowProps = ExtractPropTypes<typeof usernameShowProps>
