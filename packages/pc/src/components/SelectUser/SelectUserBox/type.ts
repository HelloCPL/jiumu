/*
 * 用户选择弹窗盒子组件参数类型
 */

import { buildProps, EmitFn } from '@jiumu/utils'
import { ExtractPropTypes, PropType } from 'vue'

export const selectUserBoxProps = buildProps({
  data: {
    type: Array as PropType<DataUserInfo[]>,
    default: () => []
  },
  multiple: {
    type: Boolean,
    default: true
  }
} as const)

export type SelectUserBoxProps = ExtractPropTypes<typeof selectUserBoxProps>

export const selectUserBoxEmits = {
  change: (data: DataUserInfo[]) => data
}

export type SelectUserBoxEmits = EmitFn<typeof selectUserBoxEmits>
