/**
 * @describe: 新增或编辑页面盒子参数
 * @author: cpl
 * @create: 2022-10-16 01:42:03
 */

import { buildProps, EmitFn } from '@jiumu/utils'
import { ExtractPropTypes, PropType } from 'vue'
import { FilterButtonList } from '../FilterButton/type'

export const pageBoxProps = buildProps({
  // 是否展示底部
  showFooter: {
    type: Boolean,
    default: true
  },
  // 是否处于编辑页面
  isEdit: {
    type: [String, Boolean],
    default: ''
  },
  // 底部按钮列表
  list: {
    type: Array as PropType<FilterButtonList[]>,
    default: () => []
  }
} as const)

export type PageBoxProps = ExtractPropTypes<typeof pageBoxProps>

export const pageBoxEmits = {
  changeBtn: (item: FilterButtonList) => item
}

export type PageBoxEmits = EmitFn<typeof pageBoxEmits>
