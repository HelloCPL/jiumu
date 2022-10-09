/**
 * 图片列表展示组件参数类型
 */

import { buildProps, EmitFn } from '@jiumu/utils'
import { isArray } from 'lodash-es'
import { ExtractPropTypes, PropType } from 'vue'

export const showImageProps = buildProps({
  // 双向绑定值 值类型为文件列表数组或图片链接列表数组
  modelValue: {
    type: Array as PropType<DataBaseFile[] | string[]>,
    default: () => []
  },
  isDelete: {
    // 是否可删除
    type: Boolean,
    default: false
  },
  // 是否可预览
  isPreview: {
    type: Boolean,
    default: true
  }
} as const)

export type ShowImageProps = ExtractPropTypes<typeof showImageProps>

export const showImageEmits = {
  'update:modelValue': (files: DataBaseFile[] | string[]) => isArray(files),
  change: (files: DataBaseFile[] | string[], del: DataBaseFile[] | string[]) => isArray(files) && isArray(del)
}

export type ShowImageEmits = EmitFn<typeof showImageEmits>
