import { buildProps } from '@jiumu/utils'
import { ExtractPropTypes } from 'vue'

export const editorWangPreviewProps = buildProps({
  value: {
    type: String,
    default: ''
  },
  // 是否展示标题
  isShowTitle: {
    type: Boolean,
    default: true
  }
} as const)

export type EditorWangPreviewProps = ExtractPropTypes<typeof editorWangPreviewProps>
