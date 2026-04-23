/*
 * 添加自定义菜单按钮
 */

import { Boot, IModuleConf } from '@wangeditor/editor'
import { MyMenuButton } from './editor-wang-custom-menus-button'
import { previewSvg, titleSvg, fullScreenSvg } from '@jiumu/utils'

export const initEditorWangCustomMenus = () => {
  if (window._initEditorWangCustomMenus_) return

  const menuButtonPreview = {
    key: 'MyButtonPreview',
    factory() {
      return new MyMenuButton('预览', 'preview', previewSvg)
    }
  }

  const menuButtonTitle = {
    key: 'MyButtonTitle',
    factory() {
      return new MyMenuButton('查看目录', 'title', titleSvg)
    }
  }

  const menuButtonFullScreen = {
    key: 'MyButtonFullScreen',
    factory() {
      return new MyMenuButton('全屏', 'fullScreen', fullScreenSvg)
    }
  }

  const module: Partial<IModuleConf> = {
    menus: [menuButtonTitle, menuButtonPreview, menuButtonFullScreen]
  }

  Boot.registerModule(module)

  window._initEditorWangCustomMenus_ = '1'
}
