import { buildProps } from '@jiumu/utils'
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

export interface EditorAoMaoEmits {
  (event: 'update:modelValue', name: string): void
  (event: 'change', name: string): void
  (event: 'focus', name: string): void
  (event: 'blur', name: string): void
}
