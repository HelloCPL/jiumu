/**
 * 筛选按钮组件参数类型
*/

import { buildProps } from '@jiumu/utils'
import { PropType, ExtractPropTypes } from 'vue'

export type PropsList = {
  name: string
  key: string
  code?: string // 权限标识
  type?: any
  plain?: boolean
  text?: boolean
  disabled?: boolean
}

export const filterButtonProps = buildProps({
  list: {
    type: Array as PropType<PropsList[]>,
    default: () => [{ name: '新增', key: 'add', type: 'primary' }]
  }
} as const)

export type FilterButtonProps = ExtractPropTypes<typeof filterButtonProps>
