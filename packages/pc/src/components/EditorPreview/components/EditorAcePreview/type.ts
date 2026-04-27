import { LanguagesKey, ThemesKey } from '../../../Editor/components/EditorAce/hooks/utils'
import { ExtractPropTypes, PropType } from 'vue'

export const editorAcePreviewProps = {
  value: {
    type: String,
    default: ''
  },
  height: {
    type: Number,
    default: 520
  },
  lang: {
    type: String as PropType<LanguagesKey>,
    default: 'json'
  },
  theme: {
    type: String as PropType<ThemesKey>,
    default: 'monokai'
  },
  // vue3-ace-editor 配置项
  options: {
    type: Object,
    default: () => ({
      useWorker: false,
      enableLiveAutocompletion: false
    })
  },
  showHeader: {
    type: Boolean,
    default: true
  }
} as const

export type EditorAcePreviewProps = ExtractPropTypes<typeof editorAcePreviewProps>
