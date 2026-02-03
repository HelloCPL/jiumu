/**
 * 是否还有更多按钮组件参数类型
 */

import { buildProps, EmitFn } from '@jiumu/utils'
import { ExtractPropTypes } from 'vue'

export const moreBtnProps = buildProps({
  // 是否显示更多
  show: Boolean,
  text: {
    type: String,
    default: '更多'
  }
} as const)

export type MoreBtnProps = ExtractPropTypes<typeof moreBtnProps>

export const moreBtnEmits = {
  click: () => true
}

export type MoreBtnEmits = EmitFn<typeof moreBtnEmits>
