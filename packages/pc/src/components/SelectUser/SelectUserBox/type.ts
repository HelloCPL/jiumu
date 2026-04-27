/*
 * 用户选择弹窗盒子组件参数类型
 */

import { getUserList } from '../../../api/user'
import { EmitFn, ExtractPropTypes, PropType } from 'vue'

export const selectUserBoxProps = {
  data: {
    type: Array as PropType<DataUserInfo[]>,
    default: () => []
  },
  multiple: {
    type: Boolean,
    default: true
  },
  /**
   * 获取所有用户列表
   * pc 端有默认接口
   */
  getUserListApi: {
    type: Function as PropType<typeof getUserList>
  }
} as const

export type SelectUserBoxProps = ExtractPropTypes<typeof selectUserBoxProps>

export const selectUserBoxEmits = {
  change: (data: DataUserInfo[]) => data
}

export type SelectUserBoxEmits = EmitFn<typeof selectUserBoxEmits>
