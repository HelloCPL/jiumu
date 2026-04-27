import { LanguagesKey, ThemesKey } from '../../Editor/components/EditorAce/hooks/utils'
import { ExtractPropTypes, PropType } from 'vue'

export const previewProps = {
  url: {
    type: String
  },
  file: {
    type: Object as PropType<DataBaseFile>
  },
  close: {
    type: Function as PropType<() => void>
  }
} as const

export type PreviewProps = ExtractPropTypes<typeof previewProps>

export const previewCommonProps = {
  ...previewProps,
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
    default: 'github'
  }
} as const

export type PreviewCommonProps = ExtractPropTypes<typeof previewCommonProps>
