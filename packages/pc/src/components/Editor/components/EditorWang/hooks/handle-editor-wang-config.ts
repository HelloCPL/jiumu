/**
 * 富文本编辑器配置
 */

import { IEditorConfig, IToolbarConfig, i18nGetResources } from '@wangeditor/editor'
import { isPlainObject } from 'lodash-es'
import { EditorWangProps } from '../type'
import { editorWangCustom } from './editor-wang-custom'

// 工具栏配置
export const getToolbarConfig = (config: Partial<IToolbarConfig>): Partial<IToolbarConfig> => {
  const toolbarConfig: Partial<IToolbarConfig> = {
    toolbarKeys: [
      'undo',
      'redo',
      // 'clearStyle',
      '|',
      'headerSelect',
      'fontSize',
      'fontFamily',
      'lineHeight',
      // '|',
      'bold',
      'italic',
      'color',
      'bgColor',
      'underline',
      'through',
      {
        key: 'group-justify',
        title: '对齐',
        menuKeys: ['justifyLeft', 'justifyRight', 'justifyCenter', 'justifyJustify']
      },
      {
        key: 'group-indent',
        title: '缩进',
        menuKeys: ['indent', 'delIndent']
      },
      // '|',
      'blockquote',
      // 'divider',
      // 'sup',
      // 'sub',
      'bulletedList',
      // 'numberedList',
      // '|',
      'code',
      'codeBlock',
      'insertLink',
      {
        key: 'group-image',
        title: '图片',
        menuKeys: ['insertImage', 'uploadImage']
      },
      {
        key: 'group-video',
        title: '视频',
        menuKeys: ['insertVideo', 'uploadVideo']
      },
      'insertTable',
      // '|',
      'MyButtonTitle',
      // 'MyButtonPreview',
      'MyButtonFullScreen'
    ]
  }
  if (isPlainObject(config)) {
    for (const key in config) {
      // @ts-ignore
      toolbarConfig[key] = config[key]
    }
  }
  return toolbarConfig
}

type EditorConfigReturn = {
  originFiles: DataBaseFile[]
  editorConfig: Partial<IEditorConfig>
}
// 编辑器配置
export const getEditorConfig = (props: EditorWangProps): EditorConfigReturn => {
  const { originFiles, customUploadImage, customUploadVideo } = editorWangCustom()
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入...',
    scroll: true,
    MENU_CONF: {
      fontSize: {
        fontSizeList: ['12px', '14px', '16px', '18px', '20px', '21px', '24px', '29px', '32px', '34px'],
        title: '号',
        default: '默号'
      },
      lineHeight: {
        lineHeightList: ['1', '1.2', '1.5', '2']
      },
      uploadImage: {
        maxFileSize: 10 * 1024 * 1024,
        customUpload: customUploadImage
      },
      uploadVideo: {
        maxFileSize: 500 * 1024 * 1024,
        customUpload: customUploadVideo
      }
    }
  }

  const config: Partial<IEditorConfig> = props.config || {}
  config.placeholder = props.placeholder
  if (isPlainObject(config)) {
    for (const key in config) {
      // @ts-ignore
      editorConfig[key] = config[key]
    }
  }
  return {
    originFiles,
    editorConfig
  }
}

// 设置wangEditor语言配置
const setLanguage = () => {
  const l = i18nGetResources('zh-CN')
  l.fontFamily.default = '字体'
  l.fontSize.default = '字号'
  l.lineHeight.default = '行高'
}
setLanguage()
