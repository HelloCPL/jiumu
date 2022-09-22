/**
 * 富文本组件参数类型
 */

import { buildProps } from '@jiumu/utils'
import { ExtractPropTypes } from 'vue'

export const richTextProps = buildProps({
  // html结构文本
  html: {
    type: String,
    default: ''
  }
} as const)

export type RichTextProps = ExtractPropTypes<typeof richTextProps>
