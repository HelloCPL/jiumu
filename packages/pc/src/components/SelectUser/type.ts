import { buildProps } from '@jiumu/utils'
import { ExtractPropTypes, PropType } from 'vue'

export const selectUser = buildProps({
  modelValue: {
    type: Array as PropType<DataUserInfo[]>,
    default: () => []
  },
  disabled: {
    // 是否可选择
    type: Boolean
  },
  multiple: { // 是否多选
    type: Boolean,
    default: true
  },
  showList: {
    // 是否显示列表
    type: Boolean,
    default: false
  },
  isDelete: {
    // 是否可删除
    type: Boolean,
    default: true
  }
} as const)

export type SelectUser = ExtractPropTypes<typeof selectUser>
