/**
 * 富文本编辑器配置
 */

import { IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { isPlainObject } from 'lodash-es'

// 工具栏配置
const toolbarConfig: Partial<IToolbarConfig> = {
  // toolbarKeys: [
  //   'undo',
  //   'redo',
  //   'clearStyle',
  //   '|',
  //   'headerSelect',
  //   'fontSize',
  //   'fontFamily',
  //   'lineHeight',
  //   '|',
  //   'bold',
  //   'italic',
  //   'color',
  //   'bgColor',
  //   'underline',
  //   'through',
  //   {
  //     key: 'group-justify',
  //     title: '对齐',
  //     menuKeys: ['justifyLeft', 'justifyRight', 'justifyCenter', 'justifyJustify']
  //   },
  //   {
  //     key: 'group-indent',
  //     title: '缩进',
  //     menuKeys: ['indent', 'delIndent']
  //   },
  //   '|',
  //   'blockquote',
  //   'sup',
  //   'sub',
  //   'bulletedList',
  //   // 'numberedList',
  //   '|',
  //   'code',
  //   'codeBlock',
  //   // 'insertLink',
  //   {
  //     key: 'group-image',
  //     title: '图片',
  //     menuKeys: ['insertImage', 'uploadImage']
  //   },
  //   {
  //     key: 'group-video',
  //     title: '视频',
  //     menuKeys: ['insertVideo', 'uploadVideo']
  //   },
  //   'insertTable',
  //   'divider',
  //   '|',
  //   'fullScreen'
  // ]
}

export const getToolbarConfig = (config: Partial<IToolbarConfig>): Partial<IToolbarConfig> => {
  const option: Partial<IToolbarConfig> = {
    ...toolbarConfig
  }
  if (isPlainObject(config)) {
    for (const key in config) {
      // @ts-ignore
      option[key] = config[key]
    }
  }
  return option
}

// 编辑器配置
const editorConfig: Partial<IEditorConfig> = {
  placeholder: '请输入...',
  scroll: true,
  MENU_CONF: {
    fontSize: {
      fontSizeList: ['12px', '14px', '16px', '18px', '20px', '21px', '24px', '29px', '32px', '34px']
    },
    lineHeight: {
      lineHeightList: ['1', '1.2', '1.5', '2']
    },
    insertLink: {
      checkLink: () => true,
      parseLinkUrl: (url) => url
    }
  }
}
// editorConfig.MENU_CONF['fontSize'] = {
//   fontSizeList: ['12px', '14px', '16px'],
//   title: '字号',
//   default: '12px'

// }

export const getEditorConfig = (config: Partial<IEditorConfig>): Partial<IEditorConfig> => {
  const option: Partial<IEditorConfig> = {
    ...editorConfig
  }
  if (isPlainObject(config)) {
    for (const key in config) {
      // @ts-ignore
      option[key] = config[key]
    }
  }
  return option
}
