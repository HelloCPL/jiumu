/**
 * 富文本参数
 */

import { buildProps, EmitFn } from '@jiumu/utils'
import { IDomEditor, IToolbarConfig } from '@wangeditor/editor'
import { isString } from 'lodash-es'
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
    default: 520
  },
  config: {
    // 富文本配置
    type: Object as PropType<Partial<IDomEditor>>,
    default: () => ({})
  },
  toolbarConfig: {
    type: Object as PropType<Partial<IToolbarConfig>>,
    default: () => ({})
  },
  // 初始化完成是否回调 change
  isEmitMounted: {
    type: Boolean,
    default: true
  }
} as const)

export type EditorWangProps = ExtractPropTypes<typeof editorWangProps>

export const editorWangEmits = {
  'update:modelValue': (name: string) => isString(name),
  change: (name: string) => isString(name),
  blur: (name: string) => isString(name),
  focus: (name: string) => isString(name),
  save: (name: string) => isString(name)
}

export type EditorWangEmits = EmitFn<typeof editorWangEmits>
