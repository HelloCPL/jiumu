/**
 * 弹框组件参数类型
 */

import { buildProps } from '@jiumu/utils'
import { ExtractPropTypes } from 'vue'
import { dialogProps as _dialogProps } from 'element-plus'

export const dialogProps = buildProps({
  // 其余参数跟 ElDialog 参数保持一致
  ..._dialogProps,
  title: {
    type: String,
    default: ''
  },
  draggable: {
    type: Boolean,
    default: true
  },
  width: {
    type: [String, Number],
    default: '580px'
  },
  showFooter: {
    type: Boolean,
    default: true
  },
  showHeader: {
    type: Boolean,
    default: true
  }
} as const)

export type DialogProps = ExtractPropTypes<typeof dialogProps>
