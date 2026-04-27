/**
 * 文件上传组件参数
 */

import { EmitFn, ExtractPropTypes, PropType } from 'vue'
import { uploadProps as _uploadProps } from 'element-plus'
import { isArray } from 'lodash-es'
import { addFileChunk, deleteFileChunk, mergeFileChunk, verifyFileChunk } from '../../api/file'

export const uploadProps = {
  // 其余参数与 element-plus 保持一致
  ..._uploadProps,
  // 上传类型，其中 files_big 采用断点上传方式
  type: {
    type: String as PropType<ParamsFileStaticPlace>,
    default: 'images'
  },
  // 文件上传模式 auto 自动 files 普通方式 files_big 断点上传
  uploadType: {
    type: String as PropType<'auto' | 'files' | 'files_big'>,
    default: 'auto'
  },
  placeholder: {
    type: String,
    default: ''
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
  },
  // 自定义上传
  httpRequest: {
    type: Function
  },
  // 上传前是否进行图片裁剪，仅 png/jpg/jpeg 有效
  isCropper: {
    type: Boolean,
    default: false
  },
  // 图片裁剪配置
  cropperConfig: {
    type: Object
  },
  /**
   * 上传切片
   * pc 端有默认接口
   */
  addFileChunkApi: {
    type: Function as PropType<typeof addFileChunk>
  },
  /**
   * 切片合并
   * pc 端有默认接口
   */
  mergeFileChunkApi: {
    type: Function as PropType<typeof mergeFileChunk>
  },
  /**
   * 校验大文件是否上传
   * pc 端有默认接口
   */
  verifyFileChunkApi: {
    type: Function as PropType<typeof verifyFileChunk>
  },
  /**
   * 删除指定文件的所有切片
   * pc 端有默认接口
   */
  deleteFileChunkApi: {
    type: Function as PropType<typeof deleteFileChunk>
  }
} as const

export const uploadFilesBigProps = {
  type: {
    // 上传类型，其中 files_big 采用断点上传方式
    type: String as PropType<'images' | 'files' | 'videos' | 'files_big'>,
    default: 'files_big'
  },
  /**
   * 上传切片
   * pc 端有默认接口
   */
  addFileChunkApi: {
    type: Function as PropType<typeof addFileChunk>
  },
  /**
   * 切片合并
   * pc 端有默认接口
   */
  mergeFileChunkApi: {
    type: Function as PropType<typeof mergeFileChunk>
  },
  /**
   * 校验大文件是否上传
   * pc 端有默认接口
   */
  verifyFileChunkApi: {
    type: Function as PropType<typeof verifyFileChunk>
  },
  /**
   * 删除指定文件的所有切片
   * pc 端有默认接口
   */
  deleteFileChunkApi: {
    type: Function as PropType<typeof deleteFileChunk>
  }
} as const

export type UploadProps = ExtractPropTypes<typeof uploadProps>

export type UploadFilesBigProps = ExtractPropTypes<typeof uploadFilesBigProps>

export const uploadEmits = {
  change: (files: DataBaseFile[]) => isArray(files)
}

export type UploadEmits = EmitFn<typeof uploadEmits>
