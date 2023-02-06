// 笔记组件类型

import { buildProps, EmitFn } from '@jiumu/utils'
import { ExtractPropTypes } from 'vue'

export const novelNoteProps = buildProps({
  id: {
    type: String,
    require: true,
    default: ''
  },
  // 标题
  title: {
    type: String,
    default: ''
  }
} as const)

export type NovelNoteProps = ExtractPropTypes<typeof novelNoteProps>

export const novelNoteEmit = {
  close: () => true
}

export type NovelNoteEmit = EmitFn<typeof novelNoteEmit>
