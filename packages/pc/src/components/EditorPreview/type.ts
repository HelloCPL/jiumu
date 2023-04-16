/**
 * 预览组件参数
 */

import { buildProps } from '@jiumu/utils'
import { ExtractPropTypes, PropType } from 'vue'

export const editorPreviewProps = buildProps({
  // 其余参数看对应富文本编辑组件参数
  type: {
    // 编辑器类型 401 富文本编辑器 402 Markdown 编辑器
    type: String as PropType<'401' | '402' | '403'>,
    default: '401'
  },
  value: {
    type: String,
    default: ''
  },
  // 是否展示标题
  showTitle: {
    type: Boolean,
    default: true
  }
} as const)

export type EditorPreviewProps = ExtractPropTypes<typeof editorPreviewProps>
