/*
 * markdown 编辑器参数
 */

import { buildProps } from '@jiumu/utils'
import { ExtractPropTypes, PropType } from 'vue'
import { handleTooltip } from './hooks/handle-tooltip'

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
  // 标题导航级别
  includeLevel: {
    type: Array as PropType<number[]>,
    default: () => [1, 2, 3, 4, 5]
  },
  leftToolbar: {
    type: String,
    default:
      'undo redo | h bold italic strikethrough ul ol customTip code link image table sync-scroll toc preview fullscreen'
  },
  rightToolbar: {
    type: String,
    default: ''
  },
  // 自定义工具栏
  toolbar: {
    type: Object,
    default: function () {
      return handleTooltip()
    }
  },
  // 禁止选择的菜单
  disabledMenus: {
    type: Array as PropType<string[]>,
    default: () => []
  }
} as const)

export type EditorMarkdownProps = ExtractPropTypes<typeof editorMarkdownProps>
