import { ExtractPropTypes } from 'vue'

export const editorMdPreviewProps = {
  text: {
    type: String,
    default: ''
  },
  // 是否展示标题
  isShowTitle: {
    type: Boolean,
    default: true
  },
  // 是否高亮主题
  isLight: {
    type: Boolean,
    default: false
  },
  // 是否对 markdown 预览组件进行初始化
  isInit: {
    type: Boolean,
    default: true
  }
} as const

export type EditorMdPreviewProps = ExtractPropTypes<typeof editorMdPreviewProps>
