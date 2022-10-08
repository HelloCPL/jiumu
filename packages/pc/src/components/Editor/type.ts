/**
 * 文本编辑器参数类型
 */

import { buildProps, EmitFn } from '@jiumu/utils'
import { isString } from 'lodash-es'
import { ExtractPropTypes, PropType } from 'vue'

export const editorProps = buildProps({
  // 其余参数看对应富文本编辑组件参数
  type: {
    // 编辑器类型 401 wangEditor富文本编辑器 402 Markdown 编辑器 403 AoMaoEditor
    type: String as PropType<'401' | '402' | '403'>,
    default: '403'
  },
  modelValue: {
    // 双向绑定值
    type: String,
    default: ''
  }
} as const)

export type EditorProps = ExtractPropTypes<typeof editorProps>

export const editorEmits = {
  'update:modelValue': (name: string) => isString(name),
  change: (name: string) => isString(name),
  blur: (name: string) => isString(name),
  focus: (name: string) => isString(name),
  'update:type': (name: string) => isString(name),
  changeType: (name: string) => isString(name)
}

export type EditorEmits = EmitFn<typeof editorEmits>
