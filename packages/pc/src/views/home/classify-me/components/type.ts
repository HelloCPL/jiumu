/**
 * 自定义标签相关类型
 */

import { buildProps, EmitFn } from '@jiumu/utils'
import { ExtractPropTypes } from 'vue'

// 添加或编辑参数
export const classifyMeAddProps = buildProps({
  id: {
    type: String,
    default: ''
  }
} as const)

export type ClassifyMeAddProps = ExtractPropTypes<typeof classifyMeAddProps>

export const classifyMeAddEmits = {
  close: () => true,
  confirm: () => true
}

export type ClassifyMeAddEmits = EmitFn<typeof classifyMeAddEmits>
