/*
 * 添加自定义预览菜单
 */

import { IButtonMenu, IDomEditor } from '@wangeditor/editor'
import $ from 'jquery'

// 自定义菜单
export class MyMenuButton implements IButtonMenu {
  private _isActive = false
  private _titleEmit: string
  title
  iconSvg
  alwaysEnable
  tag

  constructor(title: string, _titleEmit: string, iconSvg: any) {
    this.title = title
    this._titleEmit = _titleEmit
    this.iconSvg = iconSvg

    this.alwaysEnable = true
    this.tag = 'button'
  }

  getValue() {
    return ''
  }

  isDisabled(): boolean {
    return false
  }

  isActive(): boolean {
    return false
  }

  // 点击菜单触发事件
  exec(editor: IDomEditor) {
    this._isActive = !this._isActive
    const title = this._isActive ? this.title : '取消' + this.title
    const id = editor.id
    const box = $(
      `.editor-wang-container[data-id="${id}"] .toolbar-container .w-e-bar .w-e-bar-item button[data-tooltip="${title}"]`
    )
    const len = box.length
    if (len) {
      if (this._isActive) {
        box[0].classList.add('myactive')
        box[0].dataset.tooltip = '取消' + this.title
      } else {
        box[0].classList.remove('myactive')
        box[0].dataset.tooltip = this.title
      }
      editor.emit(`wang-editor-${this._titleEmit}`, this._isActive)
    }
  }
}
