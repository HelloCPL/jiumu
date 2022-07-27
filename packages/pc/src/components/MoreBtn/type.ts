/**
 * 是否还有更多按钮组件参数类型
 */

import { buildProps } from '@jiumu/utils'
import { ExtractPropTypes } from 'vue'

export const moreBtnProps = buildProps({
  show: Boolean
} as const)

export type MoreBtnProps = ExtractPropTypes<typeof moreBtnProps>
