/*
 * 点赞 收藏组件参数
 */

import { buildProps, EmitFn } from '@jiumu/utils'
import { isString } from 'lodash-es'
import { ExtractPropTypes, PropType } from 'vue'

export const interationProps = buildProps({
  isLike: {
    type: String as PropType<'1' | '0'>,
    default: '0'
  },
  isCollection: {
    type: String as PropType<'1' | '0'>,
    default: '0'
  },
  targetId: {
    // 目标id
    type: String,
    default: ''
  },
  type: {
    // 目标类型
    type: String,
    default: ''
  }
} as const)

export type InterationProps = ExtractPropTypes<typeof interationProps>

export const interationEmits = {
  'update:isLike': (val: '1' | '0') => isString(val),
  'update:isCollection': (val: '1' | '0') => isString(val),
  change: (type: string, status: '1' | '0') => isString(type) && isString(status)
}

export type InterationEmits = EmitFn<typeof interationEmits>
