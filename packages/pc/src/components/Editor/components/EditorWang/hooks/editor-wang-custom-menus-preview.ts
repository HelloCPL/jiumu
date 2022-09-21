/*
 * 添加自定义预览菜单
 */

import { IButtonMenu, IDomEditor } from '@wangeditor/editor'

const STATIC_URL = import.meta.env.VITE_STATIC_URL

export class MyButtonMenuPreview implements IButtonMenu {
  private _isActive = true

  constructor() {
    this.title = '预览'
    // this.iconSvg = STATIC_URL + 'pc/svg/preview.svg'
    this.tag = 'button'
  }

  getValue() {
    return ''
  }

  isDisabled(): boolean {
    return false
  }

  isActive(editor: IDomEditor): boolean {
    return this._isActive
  }

  // 点击菜单触发事件
  exec(editor: IDomEditor, value: boolean) {
    this._isActive = value
    editor.insertText(value)
  }
}
