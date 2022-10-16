/**
 * @describe: 自定义标签选择组件参数
 * @author: cpl
 * @create: 2022-10-16 20:17:34
 */

import { buildProps, EmitFn } from '@jiumu/utils'
import { isArray, isString } from 'lodash-es'
import { ExtractPropTypes } from 'vue'

export const selectClassifyProps = buildProps({
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
  }
} as const)

export type SelectClassifyProps = ExtractPropTypes<typeof selectClassifyProps>

export const selectClassifyEmits = {
  'update:modelValue': (val: string) => isString(val),
  change: (val: string, list: DataTagCustom[]) => isString(val) && isArray(list)
}

export type SelectClassifyEmits = EmitFn<typeof selectClassifyEmits>
