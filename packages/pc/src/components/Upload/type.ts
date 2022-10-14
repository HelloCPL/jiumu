/**
 * 文件上传组件参数
 */

import { buildProps, EmitFn } from '@jiumu/utils'
import { ExtractPropTypes, PropType } from 'vue'
import { uploadProps as _uploadProps } from 'element-plus'
import { isArray } from 'lodash-es'

export const uploadProps = buildProps({
  // 其余参数与 element-plus 保持一致
  ..._uploadProps,
  type: {
    // 上传类型
    type: String as PropType<'images' | 'files' | 'videos'>,
    default: 'images'
  },
  accept: {
    // 文件类型
    type: String,
    default: ''
  },
  multiple: {
    // 是否多选
    type: Boolean,
    default: false
  },
  limit: {
    // 最大上传数量
    type: Number,
    default: 9
  },
  limited: {
    // 已上传数量
    type: Number,
    default: 0
  },
  disabled: {
    type: Boolean,
    default: false
  },
  params: {
    // 自定义上传参数
    type: Object as PropType<ParamsFileOther>,
    default: () => ({})
  }
} as const)

export type UploadProps = ExtractPropTypes<typeof uploadProps>

export const uploadEmits = {
  change: (files: DataBaseFile[]) => isArray(files)
}

export type UploadEmits = EmitFn<typeof uploadEmits>
