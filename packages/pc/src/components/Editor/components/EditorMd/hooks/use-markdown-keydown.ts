/**
 * @description md 快捷键扩展
 * @author cpl
 * @create 2023-04-23 09:28:55
 */
import clipboard from 'clipboardy'
import { getCurrentInstance } from 'vue'
import {
  getP,
  judgeStartReg,
  judgeStartSpace,
  getStartReg,
  getSubstring,
  clearStartReg,
  findCountReeg
} from './keydown-tools'

type UOption = {
  editorEgine: any
  value: string
  start: number
  end: number
}

export const useMarkdownKeydown = () => {
  const instance = getCurrentInstance()

  let lock = false

  const updateValue = (option: UOption) => {
    if (lock) return
    lock = true
    option.editorEgine.isComposing = false
    option.editorEgine.handleInput({ target: { value: option.value } })
    setTimeout(() => {
      option.editorEgine.clearTimeout()
      option.editorEgine.textareaEl.dispatchEvent(new Event('input'))
      option.editorEgine.setRange({ start: option.start, end: option.end })
      option.editorEgine.saveHistory()
      lock = false
    }, 0)
  }

  /**
   * 换行
   * 若当前行为 空格 或 空格 + [+ - *] + 至少一个空格 开头 下一行自动补全
   * 若当前行为仅为 空格 + [+] + 至少一个空格 清除当前行内容
   */
  const _enter = (e: KeyboardEvent, editor: any, value: any) => {
    const editorEgine = editor.value.$refs.editorEgine
    const isFocus = editorEgine.$refs.textarea == document.activeElement
    if (isFocus) {
      const { start, end } = editorEgine.getRange()
      const { p, pUp } = getP(value.value, start)
      const flag1 = judgeStartReg({ value: p.value, type: 'b4' })
      const flag2 = judgeStartReg({ value: p.value, type: 'b1' })
      const flag3 = judgeStartSpace(p.value)
      if (flag1 || flag2 || flag3) {
        e.preventDefault()
        let v1 = getSubstring(value.value, 0, start)
        let v2 = ''
        let v3 = getSubstring(value.value, end)
        let len = 0
        if (flag1) {
          // +
          if (!pUp.isExist) {
            v2 = '\n\n'
            len = start + 2
          } else {
            v1 = getSubstring(value.value, 0, p.startIndex)
            v2 = '\n'
            v3 = getSubstring(value.value, p.endIndex)
            len = p.startIndex + 1
          }
        } else if (flag2) {
          // + *
          v2 = getStartReg({ value: p.value, type: 'b2', prefix: '\n' })
          len = start + v2.length
        } else if (flag3) {
          if (judgeStartReg({ value: p.value, type: 'c3' })) {
            // 纯空格
            v1 = getSubstring(value.value, 0, p.startIndex)
            v3 = getSubstring(value.value, p.endIndex)
            len = p.startIndex
          } else {
            // 空格 *
            v2 = getStartReg({ value: p.value, type: 'c1', prefix: '\n' })
            v3 = clearStartReg({
              value: getSubstring(value.value, end),
              type: 'c2'
            })
            len = start + v2.length
          }
        }

        updateValue({
          editorEgine,
          value: v1 + v2 + v3,
          start: len,
          end: len
        })
      }
    }
  }

  /**
   * 下一行
   * 若当前行为 空格 或 空格 + [+ - *] + 至少一个空格 下一行自动补全
   */
  const ctrlEnter = (e: KeyboardEvent, editor: any, value: any) => {
    const editorEgine = editor.value.$refs.editorEgine
    const isFocus = editorEgine.$refs.textarea == document.activeElement
    if (isFocus) {
      e.preventDefault()
      const { start } = editorEgine.getRange()
      const { p, pDown } = getP(value.value, start)
      const v1 = getSubstring(value.value, 0, p.endIndex)
      let v2 = '\n'
      let v3 = ''

      const flag1 = judgeStartReg({ value: p.value, type: 'a1' })
      const flag2 = judgeStartReg({ value: p.value, type: 'c1' })
      if (flag1) {
        v2 = getStartReg({ value: p.value, type: 'a1', prefix: '\n' })
      } else if (flag2) {
        v2 = getStartReg({ value: p.value, type: 'c1', prefix: '\n' })
      }
      if (pDown.isExist) {
        v3 = getSubstring(value.value, p.endIndex)
      }
      const len = p.endIndex + v2.length

      updateValue({
        editorEgine,
        value: v1 + v2 + v3,
        start: len,
        end: len
      })
    }
  }

  // 无选中内容时剪切当前行
  const ctrlX = (e: KeyboardEvent, editor: any, value: any) => {
    const editorEgine = editor.value.$refs.editorEgine
    const { start, end } = editorEgine.getRange()
    const isFocus = editorEgine.$refs.textarea == document.activeElement
    if (start === end && isFocus) {
      e.preventDefault()
      const { p, pUp, pDown } = getP(value.value, start)
      let len = 0
      let val = ''
      if (!pUp.isExist && !pDown.isExist) {
        val = ''
      } else if (!pUp.isExist && pDown.isExist) {
        val = getSubstring(value.value, pDown.startIndex)
      } else if (pUp.isExist && !pDown.isExist) {
        val = getSubstring(value.value, 0, pUp.endIndex)
        len = pUp.endIndex
      } else if (pUp.isExist && pDown.isExist) {
        val = getSubstring(value.value, 0, pUp.endIndex) + getSubstring(value.value, p.endIndex)
        len = pUp.endIndex + 1
      }

      updateValue({
        editorEgine,
        value: val,
        start: len,
        end: len
      })

      let copyText = p.value
      copyText = copyText.replace(/\n/g, '') || ''
      copyText += '\n'
      clipboard.write(copyText)
    }
  }

  // 无选中内容时复制当前行
  const ctrlC = (e: KeyboardEvent, editor: any, value: any) => {
    const editorEgine = editor.value.$refs.editorEgine
    const { start, end } = editorEgine.getRange()
    const isFocus = editorEgine.$refs.textarea == document.activeElement
    if (start === end && isFocus) {
      e.preventDefault()
      const { p } = getP(value.value, start)
      let copyText = p.value
      copyText = copyText.replace(/\n/g, '') || ''
      copyText += '\n'
      clipboard.write(copyText)
    }
  }
  /*
   * 重写复制
   * 有选中时 直接替换粘贴内容
   * 无选中时 直接替换粘贴内容
   */
  const ctrlV = (e: KeyboardEvent, editor: any, value: any) => {
    const editorEgine = editor.value.$refs.editorEgine
    const { start, end } = editorEgine.getRange()
    const isFocus = editorEgine.$refs.textarea == document.activeElement
    if (isFocus && start === end) {
      e.preventDefault()
      clipboard.read().then((copyText) => {
        const flag = copyText && copyText.indexOf('\n') === copyText.length - 1
        let len = 0
        let val = ''
        if (flag) {
          instance?.proxy?.$forceUpdate()
          const { p } = getP(value.value, start)
          val =
            getSubstring(value.value, 0, p.startIndex) + copyText + getSubstring(value.value, p.startIndex)
          len = copyText.length + start - 1
        } else {
          instance?.proxy?.$forceUpdate()
          val = value.value.substring(0, start) + copyText + value.value.substring(start)
          len = copyText.length + start - findCountReeg(copyText)
        }

        updateValue({
          editorEgine,
          value: val,
          start: len,
          end: len
        })
      })
    }
  }

  // tab 空两格
  const _tab = (e: KeyboardEvent, editor: any, value: any) => {
    const editorEgine = editor.value.$refs.editorEgine
    const { start, end } = editorEgine.getRange()
    const isFocus = editorEgine.$refs.textarea == document.activeElement
    if (isFocus) {
      e.preventDefault()
      const len = start + 2
      const val = value.value.substring(0, start) + '  ' + value.value.substring(end)

      updateValue({
        editorEgine,
        value: val,
        start: len,
        end: len
      })
    }
  }

  return {
    ctrlEnter,
    ctrlX,
    ctrlC,
    ctrlV,
    _tab,
    _enter
  }
}
