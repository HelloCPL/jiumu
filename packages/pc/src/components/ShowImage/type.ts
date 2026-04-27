/**
 * 图片列表展示组件参数类型
 */

import { isArray } from 'lodash-es'
import { EmitFn, ExtractPropTypes, PropType } from 'vue'
import { deleteFile } from '../../api/file'

export const showImageProps = {
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
  },
  /**
   * 仅可删除时有效
   * pc 端默认pc端内置的删除接口
   */
  deleteFileApi: {
    type: Function as PropType<typeof deleteFile>
  }
} as const

export type ShowImageProps = ExtractPropTypes<typeof showImageProps>

export const showImageEmits = {
  'update:modelValue': (files: DataBaseFile[] | string[]) => isArray(files),
  change: (files: DataBaseFile[] | string[], del: DataBaseFile[] | string[]) => isArray(files) && isArray(del)
}

export type ShowImageEmits = EmitFn<typeof showImageEmits>
