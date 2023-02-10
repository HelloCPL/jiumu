// 笔记组件类型

import { buildProps, EmitFn } from '@jiumu/utils'
import { ExtractPropTypes, PropType } from 'vue'
import { isString } from 'lodash-es'

// 笔记组件类型
export const novelNoteProps = buildProps({
  // 目标id
  id: {
    type: String,
    require: true,
    default: ''
  },
  // 目标类型
  type: {
    type: String as PropType<'502' | '503' | '504' | '505' | '507'>,
    require: true
  },
  // 标题
  title: {
    type: String,
    default: ''
  },
  // 指定共享笔记字段
  share: {
    type: String,
    default: ''
  }
} as const)

// 笔记添加类型
export const novelNoteAddProps = buildProps({
  // 笔记id
  id: {
    type: String,
    default: ''
  },
  // 目标id 若传则新增时同时添加关联
  targetId: {
    type: String,
    default: ''
  },
  // 目标类型
  targetType: {
    type: String as PropType<'502' | '503' | '504' | '505' | '507'>
  },
  // 目标共享字段
  targetShare: {
    type: String,
    default: ''
  }
} as const)

export type NovelNoteProps = ExtractPropTypes<typeof novelNoteProps>

export type NovelNoteAddProps = ExtractPropTypes<typeof novelNoteAddProps>

export const novelNoteEmit = {
  close: (type?: string) => isString(type)
}

export type NovelNoteEmit = EmitFn<typeof novelNoteEmit>
