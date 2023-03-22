/**
 * @description 类型选择组件参数类型
 * @author cpl
 * @create 2023-03-13 12:07:34
 */

import { buildProps, EmitFn } from '@jiumu/utils'
import { ExtractPropTypes, PropType } from 'vue'

export const selectTypeProps = buildProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  // 选择类型 type 类型 classify 标签 isSecret 是否公开
  type: {
    type: String as PropType<'type' | 'classify' | 'isSecret'>,
    default: 'type'
  },
  // 父级code 仅  type 为 type classify 需要
  parentCode: {
    type: String,
    default: ''
  },
  // 过滤仅包含其中的 code 仅 type = 'type' 时有效
  // 多个用逗号隔开 如 '502,503,504,505,507'
  filterCodes: {
    type: String,
    default: ''
  },
  // 是否显示清除按钮
  clearable: {
    type: Boolean,
    default: true
  },
  placeholder: {
    type: String,
    default: ''
  },
  // 显示样式
  showType: {
    type: String as PropType<'select' | 'radio'>,
    default: 'select'
  },
  // 自定义选择数据列表 不传时根据 type 采用默认的数据
  data: {
    type: Array as PropType<ValueLabel[]>,
    default: () => []
  }
} as const)

export type SelectTypeProps = ExtractPropTypes<typeof selectTypeProps>

export const selectTypeEmit = {
  'update:modelValue': (val: any) => val,
  change: (val: any) => val
}

export type SelectTypeEmit = EmitFn<typeof selectTypeEmit>
