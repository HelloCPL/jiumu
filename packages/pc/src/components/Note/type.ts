/**
 * 笔记组件类型
 */

import { buildProps, EmitFn } from '@jiumu/utils'
import { isString } from 'lodash-es'
import { ExtractPropTypes } from 'vue'

export const noteProps = buildProps({
  // 所属根节点
  rootId: {
    type: String,
    require: true
  },
  // 所属目标节点
  targetId: {
    type: String,
    require: true
  },
  title: {
    type: String
  }
})

export type NoteProps = ExtractPropTypes<typeof noteProps>

export const noteEmit = {
  close: (type?: string) => isString(type)
}

export type NoteEmit = EmitFn<typeof noteEmit>


// 笔记新增类型
export const noteAddProps = buildProps({
  ...noteProps,
  // 当前笔记 id
  id: {
    type: String
  }
})
export type NoteAddProps = ExtractPropTypes<typeof noteAddProps>
export const noteAddEmit = {
  cancel: () => true,
  confirm: () => true
}
export type NoteAddEmit = EmitFn<typeof noteAddEmit>
