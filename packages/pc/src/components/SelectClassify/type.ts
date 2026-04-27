/**
 * @describe: 自定义标签选择组件参数
 * @author: cpl
 * @create: 2022-10-16 20:17:34
 */

import { addTagCustom, getTagCustomListSelf } from '../../api/classify'
import { isArray, isString } from 'lodash-es'
import { EmitFn, ExtractPropTypes, PropType } from 'vue'

export const selectClassifyProps = {
  modelValue: {
    type: String,
    default: ''
  },
  // 标签类型
  type: {
    type: String,
    default: ''
  },
  // 最多可选几个
  maxLength: {
    type: Number,
    default: 3
  },
  // 新增时默认排序
  sort: {
    type: Number,
    default: 1
  },
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * 添加自定义标签
   * pc 端有默认接口
   */
  addTagCustomApi: {
    type: Function as PropType<typeof addTagCustom>
  },
  /**
   * 获取我的自定义标签列表
   * pc 端有默认接口
   */
  getTagCustomListSelfApi: {
    type: Function as PropType<typeof getTagCustomListSelf>
  }
} as const

export type SelectClassifyProps = ExtractPropTypes<typeof selectClassifyProps>

export const selectClassifyEmits = {
  'update:modelValue': (val: string) => isString(val),
  change: (val: string, list: DataTagCustom[]) => isString(val) && isArray(list)
}

export type SelectClassifyEmits = EmitFn<typeof selectClassifyEmits>
