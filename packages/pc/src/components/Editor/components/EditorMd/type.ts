/*
 * markdown 编辑器参数
 */

import { EmitFn, ExtractPropTypes, PropType } from 'vue'
import { handleTooltip } from './hooks/handle-tooltip'
import { VMdEditorInstance } from './hooks/use-markdown-init'
import { uploadFile, deleteFile } from '../../../../api/file'

export const editorMarkdownProps = {
  // 其余参数看 v-md-editor Props 参数
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
  // v-md-editor 自定义配置
  config: {
    type: Object,
    default: () => ({})
  },
  leftToolbar: {
    type: String,
    default:
      'undo redo | customTitle bold italic strikethrough ul ol customTip code link image table sync-scroll toc preview fullscreen'
  },
  rightToolbar: {
    type: String,
    default: ''
  },
  // 自定义工具栏
  toolbar: {
    type: Object,
    default: function () {
      return handleTooltip()
    }
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

export type EditorMarkdownProps = ExtractPropTypes<typeof editorMarkdownProps>

export const editorMarkdownEmits = {
  'update:modelValue': (name: string) => true,
  change: (name: string, editor: VMdEditorInstance) => true,
  save: (name: string) => true
}

export type EditorMarkdownEmits = EmitFn<typeof editorMarkdownEmits>
