/**
 * 笔记组件类型
 */

import { addNote, deleteNote, getNoteList, getNoteOne, updateNote } from '../../api/note'
import { isString } from 'lodash-es'
import { EmitFn, ExtractPropTypes, PropType } from 'vue'

export const noteProps = {
  // 所属根节点，即公共所属资源的id，同一资源中的笔记可共享关联、查看
  rootId: {
    type: String,
    require: true
  },
  // 所属目标节点
  targetId: {
    type: String,
    require: true
  },
  // 笔记标题
  title: {
    type: String
  },
  /**
   * 获取指定节点所有的笔记列表
   * pc 端有默认接口
   */
  getNoteListApi: {
    type: Function as PropType<typeof getNoteList>
  },
  /**
   * 删除一个笔记
   * pc 端有默认接口
   */
  deleteNoteApi: {
    type: Function as PropType<typeof deleteNote>
  }
}

export type NoteProps = ExtractPropTypes<typeof noteProps>

export const noteEmit = {
  close: (type?: string) => isString(type)
}

export type NoteEmit = EmitFn<typeof noteEmit>

// 笔记新增类型
export const noteAddProps = {
  ...noteProps,
  // 当前笔记 id
  id: {
    type: String
  },
  /**
   * 新增一个笔记
   * pc 端有默认接口
   */
  addNoteApi: {
    type: Function as PropType<typeof addNote>
  },
  /**
   * 获取指定的一个笔记
   * pc 端有默认接口
   */
  getNoteOneApi: {
    type: Function as PropType<typeof getNoteOne>
  },
  /**
   * 编辑一个笔记
   * pc 端有默认接口
   */
  updateNoteApi: {
    type: Function as PropType<typeof updateNote>
  }
}
export type NoteAddProps = ExtractPropTypes<typeof noteAddProps>
export const noteAddEmit = {
  cancel: () => true,
  confirm: () => true
}
export type NoteAddEmit = EmitFn<typeof noteAddEmit>
