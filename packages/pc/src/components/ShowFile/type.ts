/**
 * 文件列表展示组件参数类型
 */

import { isArray } from 'lodash-es'
import { EmitFn, ExtractPropTypes, PropType } from 'vue'
import { deleteFile } from '../../api/file'

export const showFileProps = {
  // 双向绑定值 值类型为文件列表数组
  modelValue: {
    type: Array as PropType<DataBaseFile[]>,
    default: () => []
  },
  // 是否可下载
  isDownload: {
    type: Boolean,
    default: true
  },
  // 是否可预览 仅支持 图片 pdf word excel txt
  isPreview: {
    type: Boolean,
    default: true
  },
  // 是否可删除 硬删除
  isDelete: {
    type: Boolean,
    default: false
  },
  /**
   * 仅可删除时有效
   * pc 端默认pc端内置的删除接口
   */
  deleteFileApi: {
    type: Function as PropType<typeof deleteFile>
  }
} as const

export type ShowFileProps = ExtractPropTypes<typeof showFileProps>

export const showFileEmits = {
  'update:modelValue': (files: DataBaseFile[]) => isArray(files),
  change: (files: DataBaseFile[], del: DataBaseFile[]) => isArray(files) && isArray(del)
}

export type ShowFileEmits = EmitFn<typeof showFileEmits>
