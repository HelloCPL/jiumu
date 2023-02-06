// 笔记组件类型

import { buildProps, EmitFn } from '@jiumu/utils'
import { ExtractPropTypes } from 'vue'
import { isString } from 'lodash-es'

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
  close: (type?: string) => isString(type)
}

export type NovelNoteEmit = EmitFn<typeof novelNoteEmit>
