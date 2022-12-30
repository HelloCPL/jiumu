/*
 * 评论组件参数类型
 */

import { EmitFn } from '@jiumu/utils'

export type CommentProps = {
  modelValue: {
    id: string
    isDraft?: '1' | '0'
    commentCount: number
    type: string
    [x: string]: any
  }
  type: string
}

export const commentEmit = {
  'update:modelValue': (info: Info) => true,
  change: (info: Info) => true
}

export type CommentEmit = EmitFn<typeof commentEmit>
