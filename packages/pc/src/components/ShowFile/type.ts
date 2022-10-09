/**
 * 文件列表展示组件参数类型
 */

import { buildProps, EmitFn } from '@jiumu/utils'
import { isArray } from 'lodash-es'
import { ExtractPropTypes, PropType } from 'vue'

export const showFileProps = buildProps({
  // 双向绑定值 值类型为文件列表数组
  modelValue: {
    type: Array as PropType<DataBaseFile[]>,
    default: () => []
  },
  isDelete: {
    // 是否可删除 硬删除
    type: Boolean,
    default: false
  },
  isDownload: {
    // 是否可下载
    type: Boolean,
    default: true
  },
  isPreview: {
    // 是否可预览 仅支持 图片 pdf word excel txt
    type: Boolean,
    default: true
  }
} as const)

export type ShowFileProps = ExtractPropTypes<typeof showFileProps>

export const showFileEmits = {
  'update:modelValue': (files: DataBaseFile[]) => isArray(files),
  change: (files: DataBaseFile[], del: DataBaseFile[]) => isArray(files) && isArray(del)
}

export type ShowFileEmits = EmitFn<typeof showFileEmits>
