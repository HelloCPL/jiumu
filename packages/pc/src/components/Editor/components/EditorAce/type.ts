import { ExtractPropTypes, PropType, EmitFn } from 'vue'
import { LanguagesKey, ThemesKey } from './hooks/utils'
import { Ace } from 'ace-builds'

export const editorAceProps = {
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
  // 默认语言
  lang: {
    type: String as PropType<LanguagesKey>,
    default: 'json'
  },
  // 默认主题
  theme: {
    type: String as PropType<ThemesKey>,
    default: 'monokai'
  },
  readonly: {
    type: Boolean,
    default: false
  },
  // vue3-ace-editor 配置项
  options: {
    type: Object,
    default: () => ({})
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  // 初始化完成是否回调 change
  isEmitMounted: {
    type: Boolean,
    default: true
  }
} as const

export type EditorAceProps = ExtractPropTypes<typeof editorAceProps>

export const editorAceEmits = {
  'update:modelValue': (name: string) => true,
  change: (name: string, editor: Ace.Editor) => true,
  blur: (name: string, editor: Ace.Editor) => true,
  focus: (name: string, editor: Ace.Editor) => true,
  save: (name: string) => true
}

export type EditorAceEmits = EmitFn<typeof editorAceEmits>
