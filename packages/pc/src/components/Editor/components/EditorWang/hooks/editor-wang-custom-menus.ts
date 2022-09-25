/*
 * 添加自定义菜单按钮
 */

import { Boot, IModuleConf } from '@wangeditor/editor'
import { MyMenuButton } from './editor-wang-custom-menus-button'
// import { previewSvg } from '@/assets/svg/index'
import { titleSvg } from '@/assets/svg/index'
import { fullScreenSvg } from '@/assets/svg/index'

export const initCustomMenus = (id: string) => {
  // const menuButtonPreview = {
  //   key: 'MyButtonPreview',
  //   factory() {
  //     return new MyMenuButton('预览', 'preview', previewSvg, id)
  //   }
  // }

  const menuButtonTitle = {
    key: 'MyButtonTitle',
    factory() {
      return new MyMenuButton('查看目录', 'title', titleSvg, id)
    }
  }

  const menuButtonFullScreen = {
    key: 'MyButtonFullScreen',
    factory() {
      return new MyMenuButton('全屏', 'fullScreen', fullScreenSvg, id)
    }
  }

  const module: Partial<IModuleConf> = {
    menus: [menuButtonTitle, menuButtonFullScreen]
  }

  Boot.registerModule(module)
}
