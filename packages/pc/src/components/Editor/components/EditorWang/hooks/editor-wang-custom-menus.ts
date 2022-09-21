/*
 * 添加自定义菜单按钮
 */

import { Boot } from '@wangeditor/editor'
import { MyButtonMenuPreview } from './editor-wang-custom-menus-preview'

const menuConf1 = {
  key: 'preview',
  factory() {
    return new MyButtonMenuPreview()
  }
}

Boot.registerMenu(menuConf1)
