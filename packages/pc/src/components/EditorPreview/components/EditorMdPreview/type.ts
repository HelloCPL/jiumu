import { buildProps } from '@jiumu/utils'
import { ExtractPropTypes } from 'vue'

export const editorMdPreviewProps = buildProps({
  text: {
    type: String,
    default: ''
  },
  // 是否展示标题
  isShowTitle: {
    type: Boolean,
    default: true
  },
  isLight: {
    type: Boolean,
    default: false
  }
} as const)

export type EditorMdPreviewProps = ExtractPropTypes<typeof editorMdPreviewProps>
