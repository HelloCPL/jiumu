/**
 * table组件参数类型
 */

import { buildProps } from '@jiumu/utils'
import { ExtractPropTypes } from 'vue'
// import { tableV2Props, TableV2Props } from 'element-plus'

export const tableProps = buildProps({
  // ...tableV2Props,
  rowKey: {
    type: String,
    default: 'id'
  },
  data: Array,
  default: () => []
} as const)

export type TableProps = ExtractPropTypes<typeof tableProps>
