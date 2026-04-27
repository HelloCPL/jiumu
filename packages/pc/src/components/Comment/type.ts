/*
 * 评论组件参数类型
 */

import { EmitFn, ExtractPropTypes, PropType } from 'vue'
import {
  addLike,
  deleteLike,
  addComment,
  getCommentOne,
  deleteCommentSelf,
  deleteCommentById,
  getCommentList
} from '../../api/interaction'

type ValueOptions = {
  id: string
  isDraft?: DataBaseStatus
  commentCount: number
  [x: string]: any
}
export const commentProps = {
  modelValue: {
    type: Object as PropType<ValueOptions>
  },
  type: {
    type: String
  },
  /**
   * 点赞api
   * pc 端有默认接口
   */
  addLikeApi: {
    type: Function as PropType<typeof addLike>
  },
  /**
   * 取消点赞api
   * pc 端有默认接口
   */
  deleteLikeApi: {
    type: Function as PropType<typeof deleteLike>
  },
  /**
   * 新增评论
   * pc 端有默认接口
   */
  addCommentApi: {
    type: Function as PropType<typeof addComment>
  },
  /**
   * 获取指定的一个评论
   * pc 端有默认接口
   */
  getCommentOneApi: {
    type: Function as PropType<typeof getCommentOne>
  },
  /**
   * 删除自己的某条评论
   * pc 端有默认接口
   */
  deleteCommentSelfApi: {
    type: Function as PropType<typeof deleteCommentSelf>
  },
  /**
   * 删除指定某条评论 仅管理员有效
   * pc 端有默认接口
   */
  deleteCommentByIdApi: {
    type: Function as PropType<typeof deleteCommentById>
  },
  /**
   * 获取评论列表（资源或某条评论的子评论列表）
   * pc 端有默认接口
   */
  getCommentListApi: {
    type: Function as PropType<typeof getCommentList>
  }
} as const

export type CommentProps = ExtractPropTypes<typeof commentProps>

export const commentEmit = {
  'update:modelValue': (info: CommentProps['modelValue']) => true,
  change: (info: CommentProps['modelValue']) => true
}

export type CommentEmit = EmitFn<typeof commentEmit>
