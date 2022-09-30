/*
 * markdown 编辑器参数
 */

import { buildProps } from '@jiumu/utils'
import { ExtractPropTypes, PropType } from 'vue'

export const editorMarkdownProps = buildProps({
  // 其余参数看 v-md-editor Props 参数
  modelValue: {
    type: String,
    default: ''
  },
  height: {
    type: Number,
    default: 520
  },
  placeholder: {
    type: String,
    default: '请输入...'
  },
  tocNavPositionRight: {
    type: Boolean,
    default: true
  },
  includeLevel: {
    type: Array as PropType<number[]>,
    default: () => [1, 2, 3, 4, 5]
  },
  leftToolbar: {
    type: String,
    default:
      'undo redo | h bold italic strikethrough quote hr ul ol code link image table sync-scroll toc preview fullscreen'
  },
  rightToolbar: {
    type: String,
    default: ''
  },
  disabledMenus: {
    type: Array as PropType<string[]>,
    default: () => []
  }
} as const)

export type EditorMarkdownProps = ExtractPropTypes<typeof editorMarkdownProps>
