/**
 * 卡片参数类型
 */

import { EmitFn } from '@jiumu/utils'
import { ExtractPropTypes } from 'vue'

export const cardProps = {
  title: String,
  subTitle: String,
  content: String,
  showClose: Boolean, // 是否显示关闭按钮
  date: String, // 展示时间
  modelValue: {
    type: Boolean
  }, // 展示选择框时的数据绑定
  showCheckbox: Boolean // 是否展示选择框
}

export type CardProps = ExtractPropTypes<typeof cardProps>

export const cardEmits = {
  'update:modelValue': (val: any) => val,
  change: (val: any) => val,
  close: () => true
}

export type CardEmits = EmitFn<typeof cardEmits>
