/*
 * markdown 编辑器参数
 */

import { buildProps, EmitFn } from '@jiumu/utils'
import { isString } from 'lodash-es'
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
      'undo redo | customTitle bold italic strikethrough ul ol customTip code link image table sync-scroll toc preview fullscreen'
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
  },
  // 初始化完成是否回调 change
  isEmitMounted: {
    type: Boolean,
    default: true
  }
} as const)

export type EditorMarkdownProps = ExtractPropTypes<typeof editorMarkdownProps>

export const editorMarkdownEmits = {
  'update:modelValue': (name: string) => isString(name),
  change: (name: string) => isString(name),
  save: (name: string) => isString(name)
}

export type EditorMarkdownEmits = EmitFn<typeof editorMarkdownEmits>
