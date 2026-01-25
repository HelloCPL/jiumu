/*
 * 评论组件参数类型
 */

import { EmitFn } from '@jiumu/utils'

export type CommentProps = {
  modelValue: {
    id: string
    isDraft?: DataBaseStatus
    commentCount: number
    [x: string]: any
  }
  type: string
}

export const commentEmit = {
  'update:modelValue': (info: CommentProps['modelValue']) => true,
  change: (info: CommentProps['modelValue']) => true
}

export type CommentEmit = EmitFn<typeof commentEmit>
