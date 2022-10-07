/*
 * 添加自定义菜单按钮
 */

import { Boot, IModuleConf } from '@wangeditor/editor'
import { MyMenuButton } from './editor-wang-custom-menus-button'
import { previewSvg } from '@/assets/svg/index'
import { titleSvg } from '@/assets/svg/index'
import { fullScreenSvg } from '@/assets/svg/index'

export const initEditorWangCustomMenus = () => {
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
}
