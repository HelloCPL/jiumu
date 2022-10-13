/**
 * 筛选按钮组件参数类型
 */

import { buildProps, EmitFn } from '@jiumu/utils'
import { PropType, ExtractPropTypes } from 'vue'

export type FilterButtonList = {
  name: string
  key: string
  code?: string // 权限标识
  type?: any
  plain?: boolean
  text?: boolean
  disabled?: boolean
}

export const filterButtonProps = buildProps({
  // 按钮列表
  list: {
    type: Array as PropType<FilterButtonList[]>,
    default: () => [{ name: '新增', key: 'add', type: 'primary' }]
  }
} as const)

export type FilterButtonProps = ExtractPropTypes<typeof filterButtonProps>

export const filterButtonEmits = {
  click: (item: FilterButtonList) => item
}

export type FilterButtonEmits = EmitFn<typeof filterButtonEmits>
