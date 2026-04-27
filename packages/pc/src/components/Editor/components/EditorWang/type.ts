/**
 * 富文本参数
 */

import { deleteFile, uploadFile } from '../../../../api/file'
import { IDomEditor, IToolbarConfig } from '@wangeditor/editor'
import { EmitFn, ExtractPropTypes, PropType } from 'vue'

export const editorWangProps = {
  modelValue: {
    type: String,
    default: ''
  },
  height: {
    type: Number,
    default: 520
  },
  placeholder: {
    type: String,
    default: '请输入...'
  },
  config: {
    // 富文本配置
    type: Object as PropType<Partial<IDomEditor>>,
    default: () => ({})
  },
  toolbarConfig: {
    type: Object as PropType<Partial<IToolbarConfig>>,
    default: () => ({})
  },
  // 初始化完成是否回调 change
  isEmitMounted: {
    type: Boolean,
    default: true
  },
  /**
   * 上传文件
   * pc 端有默认接口
   */
  uploadFileApi: {
    type: Function as PropType<typeof uploadFile>
  },
  /**
   *  删除文件
   * pc 端有默认接口
   */
  deleteFileApi: {
    type: Function as PropType<typeof deleteFile>
  }
} as const

export type EditorWangProps = ExtractPropTypes<typeof editorWangProps>

export const editorWangEmits = {
  'update:modelValue': (name: string) => true,
  change: (name: string, editor: IDomEditor) => true,
  blur: (name: string, editor: IDomEditor) => true,
  focus: (name: string, editor: IDomEditor) => true,
  save: (name: string) => true
}

export type EditorWangEmits = EmitFn<typeof editorWangEmits>
