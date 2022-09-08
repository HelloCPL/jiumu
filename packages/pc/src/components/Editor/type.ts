/**
 * 文本编辑器参数类型
 */

import { buildProps } from '@jiumu/utils'
import { ExtractPropTypes, PropType } from 'vue'

export const editorProps = buildProps({
  modelValue: {
    type: String,
    default: ''
  },
  config: {
    type: Object,
    default: () => ({})
  },
  type: {
    // 编辑器类型 401 富文本编辑器 402 Markdown 编辑器
    type: String as PropType<'401' | '402'>,
    default: '401'
  }
} as const)

export type EditorProps = ExtractPropTypes<typeof editorProps>
