/**
 * 文本编辑器参数类型
 */

import { EmitFn, ExtractPropTypes, PropType } from 'vue'

type EditorType = '401' | '402' | '403'

export const editorProps = {
  // 其余参数看对应富文本编辑组件参数
  type: {
    // 编辑器类型 401 wangEditor富文本编辑器 402 Markdown 编辑器 403 AceBuilds 代码编辑器
    type: String as PropType<EditorType>,
    default: '401'
  },
  // 默认可选择的编辑器类型
  types: {
    type: String,
    default: '401,402'
  },
  modelValue: {
    // 双向绑定值
    type: String,
    default: ''
  },
  // 初始化完成是否回调 change
  isEmitMounted: {
    type: Boolean,
    default: true
  }
} as const

export type EditorProps = ExtractPropTypes<typeof editorProps>

export const editorEmits = {
  'update:modelValue': (name: string) => true,
  change: (name: string, editor: any) => true,
  blur: (name: string, editor: any) => true,
  focus: (name: string, editor: any) => true,
  'update:type': (name: string) => true,
  changeType: (name: string) => true,
  save: (name: string) => true
}

export type EditorEmits = EmitFn<typeof editorEmits>
