/**
 * 分页组件参数类型
 */

import { buildProps } from '@jiumu/utils'
import { ExtractPropTypes, PropType } from 'vue'
import { paginationProps as _paginationProps } from 'element-plus'

export const paginationProps = buildProps({
  ..._paginationProps, // 其他参数跟官网保持一致
  pageNo: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  },
  total: {
    type: Number,
    default: 0
  },
  layout: {
    type: String,
    default: 'prev, pager, next, sizes, jumper, total'
  },
  pageSizes: {
    type: Array as PropType<number[]>,
    default: () => [2, 5, 10, 20, 30, 50, 100]
  }
} as const)

export type PaginationProps = ExtractPropTypes<typeof paginationProps>
