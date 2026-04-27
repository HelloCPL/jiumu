/**
 * echarts组件参数类型
 */

import { EmitFn, ExtractPropTypes } from 'vue'

export const baseEchartsProps = {
  // 宽度
  width: {
    type: [String, Number],
    default: '580px'
  },
  height: {
    type: [String, Number],
    default: '580px'
  },
  option: {
    type: Object,
    default: () => ({})
  }
} as const

export type BaseEchartsProps = ExtractPropTypes<typeof baseEchartsProps>

export const baseEchartsEmit = {
  change: (chart) => true
}

export type BaseEchartsEmit = EmitFn<typeof baseEchartsEmit>
