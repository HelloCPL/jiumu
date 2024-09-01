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
  // 底部按钮列表
  list: {
    type: Array as PropType<FilterButtonList[]>,
    default: () => []
  },
  // id 有 为编辑 无 为新增
  id: {
    type: String,
    default: ''
  },
  // 是否为草稿
  isDraft: {
    type: String as PropType<DataBaseStatus>,
    default: '0'
  }
} as const)

export type PageBoxProps = ExtractPropTypes<typeof pageBoxProps>

export const pageBoxEmits = {
  changeBtn: (item: FilterButtonList) => item
}

export type PageBoxEmits = EmitFn<typeof pageBoxEmits>
