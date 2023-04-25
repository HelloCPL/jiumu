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
  clearStartReg
} from './keydown-tools'

export const useMarkdownKeydown = () => {
  const instance = getCurrentInstance()

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
      const { p, pUp, pDown } = getP(value.value, start)
      const flag1 = judgeStartReg({ value: p.value, type: 'b4' })
      const flag2 = judgeStartReg({ value: p.value, type: 'b1' })
      const flag3 = judgeStartSpace(p.value)
      if (flag1 || flag2 || flag3) {
        e.preventDefault()
        let len = 0
        if (flag1) {
          if (!pUp.isExist) {
            value.value = getSubstring(value.value, 0, start) + '\n\n' + getSubstring(value.value, end)
            len = start + 2
          } else {
            value.value =
              getSubstring(value.value, 0, p.startIndex) +
              '\n' +
              getSubstring(value.value, !p.isEndNewline ? end : p.endIndex + 1)
            len = p.startIndex + 1
          }
        } else if (flag2) {
          const val = getStartReg({ value: p.value, type: 'b1', prefix: '\n' })
          value.value = getSubstring(value.value, 0, start) + val + getSubstring(value.value, end)
          len = start + val.length
        }

        setTimeout(() => {
          editor.value.$refs.editorEgine.setRange({ start: len, end: len })
        })
      }
      // const i1 = value.value.lastIndexOf('\n', start - 1)
      // const i2 = value.value.indexOf('\n', start)
      // const p: string = value.value.substring(i1 + 1, i2 === -1 ? end : i2)
      // const flag1 = p.search(/^\s*\+{1}\s+$/g) !== -1
      // const flag2 = p.search(/^\s*\+{1}\s+/gi) !== -1
      // const flag3 = judgeSpace(p)
      // let len = 0
      // if (flag1 || flag2 || flag3) {
      //   e.preventDefault()
      //   if (flag1) {
      //     if (i1 === -1) {
      //       value.value = value.value.substring(0, start) + '\n\n' + value.value.substring(end)
      //       len = start + 2
      //     } else {
      //       value.value =
      //         value.value.substring(0, i1 + 1) + '\n' + value.value.substring(i2 === -1 ? end : i2)
      //       len = i1 + 2
      //     }
      //   } else if (flag2) {
      //     const val = getSymbolVal(p)
      //     value.value = value.value.substring(0, start) + val + value.value.substring(end)
      //     len = start + val.length
      //   } else if (flag3) {
      //     if (p.search(/^\s+$/) !== -1) {
      //       let val = ''
      //       if (i1 !== -1) val = '\n'
      //       value.value =
      //         value.value.substring(0, i1 === -1 ? 0 : i1) + val + value.value.substring(i2 === -1 ? end : i2)
      //       len = i1 + 1
      //     } else {
      //       const val = getSymbolVal(p, false)
      //       value.value = value.value.substring(0, start) + val + value.value.substring(end)
      //       len = start + val.length
      //     }
      //   }
      //   setTimeout(() => {
      //     editor.value.$refs.editorEgine.setRange({ start: len, end: len })
      //   })
      // }
    }
  }

  // const _enter = (e: KeyboardEvent, editor: any, value: any) => {
  //   const editorEgine = editor.value.$refs.editorEgine
  //   const isFocus = editorEgine.$refs.textarea == document.activeElement
  //   if (isFocus) {
  //     const { start, end } = editorEgine.getRange()
  //     const i1 = value.value.lastIndexOf('\n', start - 1)
  //     const i2 = value.value.indexOf('\n', start)
  //     const p: string = value.value.substring(i1 + 1, i2 === -1 ? end : i2)
  //     const flag1 = p.search(/^\s*\+{1}\s+$/g) !== -1
  //     const flag2 = p.search(/^\s*\+{1}\s+/gi) !== -1
  //     const flag3 = judgeSpace(p)
  //     let len = 0
  //     if (flag1 || flag2 || flag3) {
  //       e.preventDefault()
  //       if (flag1) {
  //         if (i1 === -1) {
  //           value.value = value.value.substring(0, start) + '\n\n' + value.value.substring(end)
  //           len = start + 2
  //         } else {
  //           value.value =
  //             value.value.substring(0, i1 + 1) + '\n' + value.value.substring(i2 === -1 ? end : i2)
  //           len = i1 + 2
  //         }
  //       } else if (flag2) {
  //         const val = getSymbolVal(p)
  //         value.value = value.value.substring(0, start) + val + value.value.substring(end)
  //         len = start + val.length
  //       } else if (flag3) {
  //         if (p.search(/^\s+$/) !== -1) {
  //           let val = ''
  //           if (i1 !== -1) val = '\n'
  //           value.value =
  //             value.value.substring(0, i1 === -1 ? 0 : i1) + val + value.value.substring(i2 === -1 ? end : i2)
  //           len = i1 + 1
  //         } else {
  //           const val = getSymbolVal(p, false)
  //           value.value = value.value.substring(0, start) + val + value.value.substring(end)
  //           len = start + val.length
  //         }
  //       }
  //       setTimeout(() => {
  //         editor.value.$refs.editorEgine.setRange({ start: len, end: len })
  //       })
  //     }
  //   }
  // }

  /**
   * 下一行
   * 若当前行为 空格 或 空格 + [+ - *] + 至少一个空格 下一行自动补全
   */
  const ctrlEnter = (e: KeyboardEvent, editor: any, value: any) => {
    const editorEgine = editor.value.$refs.editorEgine
    const { start } = editorEgine.getRange()
    const isFocus = editorEgine.$refs.textarea == document.activeElement
    if (isFocus) {
      e.preventDefault()
      const i = value.value.indexOf('\n', start)
      // 处理特殊的 空格 或 空格 + [+ - *] +
      const i1 = value.value.lastIndexOf('\n', start - 1)
      const p: string = value.value.substring(i1 + 1, i === -1 ? start : i)
      let val = '\n'
      if (p.search(/^\s*[\*\+-]{1}\s+/g) !== -1 || p.search(/^\s+/g) !== -1) {
        val = getSymbolVal(p)
      }
      let len = 0
      if (i !== -1) {
        value.value = value.value.substring(0, i) + val + value.value.substring(i)
        len = i + val.length
      } else {
        value.value += val
        len = value.value.length + val.length - 1
      }
      setTimeout(() => {
        editor.value.$refs.editorEgine.setRange({ start: len, end: len })
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
      const i1 = start === 0 ? -1 : value.value.lastIndexOf('\n', start - 1)
      const i2 = value.value.indexOf('\n', start)
      let len = 0
      let copyText = ''
      if (i1 === -1 && i2 === -1) {
        copyText = value.value
        value.value = ''
      } else if (i1 === -1 && i2 !== -1) {
        copyText = value.value.substring(0, i2)
        value.value = value.value.substring(i2 + 1)
      } else if (i1 !== -1 && i2 === -1) {
        copyText = value.value.substring(i1)
        value.value = value.value.substring(0, i1)
        len = i1 + 1
      } else if (i1 !== -1 && i2 !== -1) {
        copyText = value.value.substring(i1, i2)
        value.value = value.value.substring(0, i1) + value.value.substring(i2)
        len = i1 + 1
      }
      setTimeout(() => {
        editor.value.$refs.editorEgine.setRange({ start: len, end: len })
      })
      copyText = copyText.replace(/\n/g, '') || ''
      copyText = copyText + '\n'
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
      const i1 = start === 0 ? -1 : value.value.lastIndexOf('\n', start - 1)
      const i2 = value.value.indexOf('\n', start)
      let copyText = ''
      if (i1 === -1 && i2 === -1) {
        copyText = value.value
      } else if (i1 === -1 && i2 !== -1) {
        copyText = value.value.substring(0, i2)
      } else if (i1 !== -1 && i2 === -1) {
        copyText = value.value.substring(i1)
      } else if (i1 !== -1 && i2 !== -1) {
        copyText = value.value.substring(i1, i2)
      }
      copyText = copyText.replace(/\n/g, '') || ''
      copyText = copyText + '\n'
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
        const i1 = copyText.indexOf('\n')
        const i2 = copyText.lastIndexOf('\n')
        const flag = i1 !== -1 && i2 !== -1 && i1 === i2
        let len = 0
        const i = value.value.lastIndexOf('\n', start - 1)
        if (flag) {
          value.value = value.value.substring(0, i + 1) + copyText + value.value.substring(i + 1)
          len = copyText.length + start - 1
        } else {
          instance?.proxy?.$forceUpdate()
          value.value = value.value.substring(0, start) + copyText + value.value.substring(start)
          len = copyText.length + start
        }
        setTimeout(() => {
          editor.value.$refs.editorEgine.setRange({ start: len, end: len })
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
      let len = 0
      value.value = value.value.substring(0, start) + '  ' + value.value.substring(end)
      len = start + 2
      setTimeout(() => {
        editor.value.$refs.editorEgine.setRange({ start: len, end: len })
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

// 获取前缀
function getSymbolVal(p: string, isPrefix = true): string {
  let val: string = '\n'
  let i = -1
  const sArr = ['*', '-', '+']
  for (let j = 0; j < p.length; j++) {
    const flag1 = p[j] === ' '
    const flag2 = sArr.indexOf(p[j]) !== -1 && isPrefix
    if (flag2) i = 0
    if (flag1 && i >= 0) i += 1
    if (i >= 2) break
    if (flag1 || flag2) {
      val += p[j]
    } else {
      break
    }
  }
  return val
}

/**
 * 判断是否以空格开头，排除指定字符
 */
function judgeSpace(str: string): boolean {
  let flag1 = false
  let flag2 = true
  const sArr = ['*', '-', '+']
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ' ') {
      flag1 = true
    } else {
      if (sArr.indexOf(str[i]) !== -1) flag2 = false
      break
    }
  }
  return flag1 && flag2
}

/**
 * 判断是否全为空格
 */

function judgeAllSpace(str: string): boolean {
  let flag1 = true
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== ' ') {
      flag1 = false
      break
    }
  }
  return flag1 && str.length > 0
}
