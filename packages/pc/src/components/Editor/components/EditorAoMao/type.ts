import { buildProps, EmitFn } from '@jiumu/utils'
import { isString } from 'lodash-es'
import { ExtractPropTypes } from 'vue'

export const editorAoMaoProps = buildProps({
  modelValue: {
    // 双向绑定
    type: String,
    default: ''
  },
  height: {
    // 编辑器高度
    type: Number,
    default: 520
  },
  placeholder: {
    type: String,
    default: '请输入...'
  }
} as const)

export type EditorAoMaoProps = ExtractPropTypes<typeof editorAoMaoProps>

export const editorAoMaoEmits = {
  'update:modelvalue': (val: string) => isString(val),
  change: (val: string) => isString(val),
  focus: (val: string) => isString(val),
  blur: (val: string) => isString(val)
}

export type EditorAoMaoEmits = EmitFn<typeof editorAoMaoEmits>
