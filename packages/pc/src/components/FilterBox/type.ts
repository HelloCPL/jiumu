/**
 * 筛选容器参数类型
 */

import { buildProps, EmitFn } from '@jiumu/utils'
import { ExtractPropTypes } from 'vue'

export const filterBoxProps = buildProps({
  // 元素数量为最小值时判断是否显示更多
  minLength: {
    type: Number,
    default: 2
  }
} as const)

export type FilterBoxProps = ExtractPropTypes<typeof filterBoxProps>

export const filterBoxEmits = {
  search: () => true,
  reset: () => true
}

export type FilterEmits = EmitFn<typeof filterBoxEmits>
