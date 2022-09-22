/**
 * table组件参数类型
 */

import { buildProps } from '@jiumu/utils'
import { ExtractPropTypes } from 'vue'
import { tableV2Props } from 'element-plus'

export const tableProps = buildProps({
  // 其他参数与elementPlus Table 参数保持一致
  ...tableV2Props,
  // 行key名称
  rowKey: {
    type: String,
    default: 'id'
  },
  // 列表数据
  data: {
    type: Array,
    default: () => []
  }
} as const)

export type TableProps = ExtractPropTypes<typeof tableProps>
