/**
 * 图片列表展示组件参数类型
 */

import { buildProps } from '@jiumu/utils'
import { ExtractPropTypes, PropType } from 'vue'

export const showImageProps = buildProps({
  modelValue: {
    type: Array as PropType<DataBaseFile[]>,
    default: () => []
  },
  isDelete: {
    // 是否可删除
    type: Boolean,
    default: true
  },
  isPreview: {
    type: Boolean,
    default: true
  }
} as const)

export type ShowImageProps = ExtractPropTypes<typeof showImageProps>
