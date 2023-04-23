/**
 * @description md 快捷键扩展
 * @author cpl
 * @create 2023-04-23 09:28:55
 */
import clipboard from 'clipboardy'

export const useMarkdownKeydown = () => {
  // 下一行
  const ctrlEnter = (e: KeyboardEvent, editor: any, value: any) => {
    const editorEgine = editor.value.$refs.editorEgine
    const { start, end } = editorEgine.getRange()
    const isFocus = editorEgine.$refs.textarea == document.activeElement
    if (start === end && isFocus) {
      e.preventDefault()
      const i = value.value.indexOf('\n', start)
      let len = 0
      if (i !== -1) {
        value.value = value.value.substring(0, i) + '\n' + value.value.substring(i)
        len = i + 1
      } else {
        value.value += '\n'
        len = value.value.length
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
    const isFocus = editorEgine.$refs.textarea == document.activeElement
    if (isFocus) {
      e.preventDefault()
      clipboard.read().then((copyText) => {
        const { start, end } = editorEgine.getRange()
        const i1 = copyText.indexOf('\n')
        const i2 = copyText.lastIndexOf('\n')
        const flag = i1 !== -1 && i2 !== -1 && i1 === i2
        let len = 0
        console.log('start end', i1, i2)
        console.log('start end222', value.value[start], value.value[end])
        console.log('copyText', copyText)
        console.log('copyText', start, end)
        const i = value.value.lastIndexOf('\n', start - 1)

        if (start === end) {
          if (flag) {
            console.log('aaa')
            value.value = value.value.substring(0, i + 1) + copyText + value.value.substring(i + 1)
            len = copyText.length + start - 1
          } else {
            console.log('bbb')
            value.value = value.value.substring(0, start) + copyText + value.value.substring(start)
            len = copyText.length + start
          }
        } else {
          // 直接替换内容
          if (flag) {
            // 这个有问题
            value.value = value.value.substring(0, start) + copyText + value.value.substring(end)
            len = start + copyText.length - 1
          } else {
            value.value = value.value.substring(0, start) + copyText + value.value.substring(end)
            len = start + copyText.length
          }

          //   if (flag) {
          //   console.log('ccc')
          // } else {
          //   console.log('ddd')
          // }
          // value.value = value.value.substring(0, start) + copyText + value.value.substring(end + 1)
          // len = start + copyText.length
        }
        setTimeout(() => {
          editor.value.$refs.editorEgine.setRange({ start: len, end: len })
        })
      })
    }
  }

  return {
    ctrlEnter,
    ctrlX,
    ctrlC,
    ctrlV
  }
}
