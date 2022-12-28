/*
 * 评论组件参数类型
 */

import { buildProps, EmitFn } from '@jiumu/utils'
import { isNumber } from 'lodash-es'
import { ExtractPropTypes } from 'vue'

export const commentProps = buildProps({
  id: {
    type: String,
    require: true,
    default: ''
  },
  type: {
    type: String,
    default: ''
  }
} as const)

export type CommentProps = ExtractPropTypes<typeof commentProps>

export const commentEmit = {
  change: (total: number) => isNumber(total)
}

export type CommentEmit = EmitFn<typeof commentEmit>
