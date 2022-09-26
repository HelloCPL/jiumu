/*
 * markdown 编辑器参数
 */

import { buildProps } from '@jiumu/utils'
import { ExtractPropTypes, PropType } from 'vue'

export const editorMarkdownProps = buildProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '请输入...'
  },
  height: {
    type: Number,
    default: 520
  },
  config: {
    // markdown 编辑器配置
    type: Object as PropType<Config>,
    default: () => ({})
  },
  toolbarConfig: {
    // 工具栏配置 与v-md-editor toolbarConfig保持一致
    type: Object as PropType<ToolbarConfig>,
    default: () => ({})
  }
} as const)

export type EditorMarkdownProps = ExtractPropTypes<typeof editorMarkdownProps>

// 工具栏配置类型，里面每一项配置与v-md-editor对应配置项保持一致

export type Config = {
  autofocus?: boolean
}

export type ToolbarConfig = {
  includeLevel?: number[]
  leftToolbar?: string
  rightToolbar?: string
  toolbar?: ObjectAny
  toolbarConfig?: ObjectAny
  disabledMenus?: string[]
}
