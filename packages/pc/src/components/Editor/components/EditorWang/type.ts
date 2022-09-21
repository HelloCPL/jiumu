/**
 * 富文本参数
 */

import { buildProps } from '@jiumu/utils'
import { IDomEditor, IToolbarConfig } from '@wangeditor/editor'
import { ExtractPropTypes, PropType } from 'vue'

export const editorWangProps = buildProps({
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
    default: 580
  },
  config: {
    // 富文本配置
    type: Object as PropType<Partial<IDomEditor>>,
    default: () => ({})
  },
  toolbarConfig: {
    type: Object as PropType<Partial<IToolbarConfig>>,
    default: () => ({})
  }
} as const)

export type EditorWangProps = ExtractPropTypes<typeof editorWangProps>
