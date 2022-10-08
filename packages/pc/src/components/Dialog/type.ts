/**
 * 弹框组件参数类型
 */

import { buildProps, EmitFn } from '@jiumu/utils'
import { ExtractPropTypes } from 'vue'
import { dialogProps as _dialogProps } from 'element-plus'

export const dialogProps = buildProps({
  // 其余参数跟 ElDialog 参数保持一致
  ..._dialogProps,
  // 标题
  title: {
    type: String,
    default: ''
  },
  // 是否可拖拽
  draggable: {
    type: Boolean,
    default: true
  },
  // 宽度
  width: {
    type: [String, Number],
    default: '580px'
  },
  // 是否显示底部
  showFooter: {
    type: Boolean,
    default: true
  },
  // 是否显示头部
  showHeader: {
    type: Boolean,
    default: true
  },
  // 内容区自定义类
  classContent: {
    type: String,
    default: ''
  }
} as const)

export type DialogProps = ExtractPropTypes<typeof dialogProps>

export const dialogEmit = {
  confirm: () => true,
  close: () => true
}

export type DialogEmits = EmitFn<typeof dialogEmit>
