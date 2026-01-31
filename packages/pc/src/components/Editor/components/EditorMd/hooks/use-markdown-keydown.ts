/**
 * @description md 快捷键扩展
 * @author cpl
 * @create 2023-04-23 09:28:55
 */
import { useClipboardy } from '@/hooks/use-clipboardy'
import {
  getMatchReg,
  getParagraphContext,
  isMatchReg,
  isMatchSpace,
  replaceMatchReg,
  getSubstring,
  getParagraphInfo,
  formatMarkdownText,
  getParagraphLines
} from './keydown-tools'

const { copy, paste } = useClipboardy()

type UOption = {
  editorEgine: any
  value: string
  start: number
  end: number
}

export const useMarkdownKeydown = () => {
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
   * enter 换行拦截
   * 注意：无序列表仅支持[+]，其中[*-]有编辑器默认行为，且无法捕捉
   * 1. 若当前行整行仅为无序列表格式，则清除当前行的无序列表格式内容
   * 2. 若当前行为无序列表开头，则下一行自动补全无序列表开头前缀
   * 3. 若当前行为空格开头且有非空格内容，则下一行自动补全空格
   */
  const _enter = (e: KeyboardEvent, editor: any, text: string) => {
    const editorEgine = editor.value.$refs.editorEgine
    const isFocus = editorEgine.$refs.textarea == document.activeElement
    if (isFocus) {
      const { start, end } = editorEgine.getRange()
      const { p, pUp } = getParagraphContext(text, start)
      const flag1 = isMatchReg({ value: p.value, type: 'unordered-list-add-trailing-whitespace-single' })
      const flag2 = isMatchReg({ value: p.value, type: 'unordered-list-add' })
      const flag3 = isMatchSpace(p.value)
      if (flag1 || flag2 || flag3) {
        e.preventDefault()
        let v1 = getSubstring(text, 0, start)
        let v2 = ''
        let v3 = getSubstring(text, end)
        let len = 0
        if (flag1) {
          // 1. 若当前行整行仅为无序列表格式，则清除当前行的无序列表格式内容
          if (!pUp.isExist) {
            v2 = '\n\n'
            len = start + 2
          } else {
            v1 = getSubstring(text, 0, p.startIndex)
            v2 = '\n'
            v3 = getSubstring(text, p.endIndex)
            len = p.startIndex + 1
          }
        } else if (flag2) {
          // 2. 若当前行为无序列表开头，则下一行自动补全无序列表开头前缀
          v2 = getMatchReg({ value: p.value, type: 'unordered-list-strict', prefix: '\n' })
          len = start + v2.length
        } else if (flag3) {
          // 3. 若当前行为空格开头且有非空格内容，则下一行自动补全空格
          if (isMatchReg({ value: p.value, type: 'blank-line' })) {
            // 纯空格
            v1 = getSubstring(text, 0, p.startIndex)
            v3 = getSubstring(text, p.endIndex)
            len = p.startIndex
          } else {
            // 空格 *
            v2 = getMatchReg({ value: p.value, type: 'leading-whitespace', prefix: '\n' })
            v3 = replaceMatchReg({
              value: getSubstring(text, end),
              type: 'leading-space'
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
   * ctrl + enter 换行拦截
   * 1. 若当前行为无序列表开头，则保留当前行内容，且下一行自动补全无序列表开头前缀
   * 2. 若当前行为空格开头，则保留当前行内容，且下一行自动补全空格
   * 3. 其他情况，直接跳到下一行
   */
  const ctrlEnter = (e: KeyboardEvent, editor: any, text: string) => {
    const editorEgine = editor.value.$refs.editorEgine
    const isFocus = editorEgine.$refs.textarea == document.activeElement
    if (isFocus) {
      e.preventDefault()
      const { start } = editorEgine.getRange()
      const { p, pDown } = getParagraphContext(text, start)
      const v1 = getSubstring(text, 0, p.endIndex)
      let v2 = '\n'
      let v3 = ''
      const flag1 = isMatchReg({ value: p.value, type: 'unordered-list' })
      const flag2 = isMatchReg({ value: p.value, type: 'leading-whitespace' })
      if (flag1) {
        v2 = getMatchReg({ value: p.value, type: 'unordered-list', prefix: '\n' })
      } else if (flag2) {
        v2 = getMatchReg({ value: p.value, type: 'leading-whitespace', prefix: '\n' })
      }
      if (pDown.isExist) {
        v3 = getSubstring(text, p.endIndex)
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

  /**
   * ctrl + x 剪切
   * 1. 若无选中内容，则剪切当前行内容（行尾保留一个换行符）
   * 2. 其他情况（如有选中内容），使用默认剪切
   */
  const ctrlX = (e: KeyboardEvent, editor: any, text: string) => {
    const editorEgine = editor.value.$refs.editorEgine
    const { start, end } = editorEgine.getRange()
    const isFocus = editorEgine.$refs.textarea == document.activeElement
    if (start === end && isFocus && text) {
      e.preventDefault()
      const { p, pUp, pDown } = getParagraphContext(text, start)
      let len = 0
      let val = ''
      if (!pUp.isExist && pDown.isExist) {
        val = getSubstring(text, pDown.startIndex)
      } else if (pUp.isExist && !pDown.isExist) {
        val = getSubstring(text, 0, pUp.endIndex)
        len = Math.min(pUp.endIndex, text.length - 1)
      } else if (pUp.isExist && pDown.isExist) {
        val = getSubstring(text, 0, pUp.endIndex) + getSubstring(text, p.endIndex)
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
      copy(copyText)
    }
  }

  /**
   * ctrl + c 复制
   * 1. 若无选中内容，则复制当前行内容（行尾保留一个换行符）
   * 2. 其他情况（如有选中内容），使用默认复制
   */
  const ctrlC = (e: KeyboardEvent, editor: any, text: string) => {
    const editorEgine = editor.value.$refs.editorEgine
    const { start, end } = editorEgine.getRange()
    const isFocus = editorEgine.$refs.textarea == document.activeElement
    if (start === end && isFocus && text) {
      e.preventDefault()
      const p = getParagraphInfo(text, start)
      let copyText = p.value
      copyText = copyText.replace(/\n/g, '') || ''
      copyText += '\n'
      copy(copyText)
    }
  }

  /*
   * ctrl + v 粘贴
   * 1. 粘贴内容转换
   *   1.1 若粘贴内容为图片链接，则内容转换为MD图片格式内容
   *   1.2 若粘贴内容为图片文件，则上传图片并替换成MD图片格式内容
   * 2. 若无选中内容，且粘贴内容为仅一行文本，则在当前行行首插入整行内容
   * 3. 其他情况，则直接粘贴内容
   */
  const ctrlV = (e: KeyboardEvent, editor: any, text: string) => {
    const editorEgine = editor.value.$refs.editorEgine
    const { start, end } = editorEgine.getRange()
    const isFocus = editorEgine.$refs.textarea == document.activeElement
    if (isFocus) {
      e.preventDefault()
      paste(true).then((copyText) => {
        const textInfo = formatMarkdownText(copyText)
        const p = getParagraphInfo(text, start)
        let v1 = getSubstring(text, 0, start)
        let v2 = textInfo.text
        let v3 = getSubstring(text, end)
        let len = start + textInfo.text.length
        const flag = copyText && copyText.indexOf('\n') === copyText.length - 1
        if (start === end && flag) {
          v1 = getSubstring(text, 0, p.startIndex)
          v3 = getSubstring(text, p.startIndex)
          len = start + textInfo.text.length - 1
        } else if (textInfo.type !== 'text') {
          if (start !== p.startIndex) {
            v2 = `\n${v2}`
            len = start + v2.length
          }
          if (end !== p.endIndex) {
            v2 = `${v2}\n`
            len = start + v2.length
          }
        }
        updateValue({
          editorEgine,
          value: v1 + v2 + v3,
          start: len,
          end: len
        })
      })
    }
  }

  /**
   * tab 缩进
   * 1. 若有选中内容，且选中内容为多行文本
   *   1.1 对每行的处理：当前行有内容，则插入两个空格；当前行无内容，不处理
   * 2. 其他情况，则直接插入或替换成两个空格
   */
  const _tab = (e: KeyboardEvent, editor: any, text: string) => {
    const editorEgine = editor.value.$refs.editorEgine
    const { start, end } = editorEgine.getRange()
    const isFocus = editorEgine.$refs.textarea == document.activeElement
    if (isFocus) {
      e.preventDefault()
      const pStart = getParagraphInfo(text, start)
      const pEnd = getParagraphInfo(text, end)
      if (start < end && pStart.startIndex !== pEnd.startIndex && pStart.endIndex !== pEnd.endIndex) {
        // 每行行首增加两个空格
        const lines = getParagraphLines(text, start, end)
        let newText = ''
        let lastEnd = 0
        let newStart = start
        let newEnd = end
        lines.forEach((line) => {
          newText += text.substring(lastEnd, line.startIndex)
          if (line.value) {
            newText += '  ' + line.value
            if (line.startIndex <= start && start <= line.endIndex) {
              newStart += 2
            }
            newEnd += 2
          }
          lastEnd = line.endIndex
          if (line.isEndNewLine) {
            newText += '\n'
            lastEnd += 1
          }
        })
        newText += text.substring(lastEnd)
        updateValue({
          editorEgine,
          value: newText,
          start: newStart,
          end: newEnd
        })
      } else {
        const v1 = text.substring(0, start)
        const v2 = '  '
        const v3 = text.substring(end)
        const len = start + v2.length
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
   * shift + tab 缩进
   * 1. 单行清空行首空格
   *   1.1 行首没有空格，不做处理
   *   1.2 行首空格数量为奇数，清空一个行首空格
   *   1.3 行首空格为偶数，清空两个行首空格
   * 2. 多行清空行首空格
   *   2.1 行首没有空格，不做处理
   *   2.2 行首只有一个空格，清空一个行首空格
   *   2.3 行首空格大于一个空格，清空两个行首空格
   */
  const shiftTab = (e: KeyboardEvent, editor: any, text: string) => {
    const editorEgine = editor.value.$refs.editorEgine
    const { start, end } = editorEgine.getRange()
    const isFocus = editorEgine.$refs.textarea == document.activeElement
    if (isFocus) {
      e.preventDefault()
      const pStart = getParagraphInfo(text, start)
      const pEnd = getParagraphInfo(text, end)
      const isMultiLine = start < end && pStart.startIndex !== pEnd.startIndex
      if (isMultiLine) {
        // 多行清空行首空格
        const lines = getParagraphLines(text, start, end)
        let newText = ''
        let newStart = start
        let newEnd = end
        let lastEnd = 0
        let totalRemove = 0
        lines.forEach((line) => {
          newText += getSubstring(text, lastEnd, line.startIndex)
          let processedLine = line.value
          let removedSpaces = 0
          if (line.value) {
            const leadingSpaceCount = getMatchReg({
              value: line.value,
              type: 'leading-space'
            }).length
            if (leadingSpaceCount === 1) {
              processedLine = line.value.substring(1)
              removedSpaces = 1
            } else if (leadingSpaceCount > 1) {
              processedLine = line.value.substring(2)
              removedSpaces = 2
            }
          }
          newText += processedLine
          lastEnd = line.endIndex
          if (line.isEndNewLine) {
            newText += '\n'
            lastEnd += 1
          }
          if (start >= line.startIndex && start <= line.endIndex) {
            newStart = Math.max(line.startIndex, start - removedSpaces)
          }
          newEnd -= removedSpaces
          if (end >= line.startIndex && end <= line.endIndex) {
            newEnd = Math.max(line.startIndex - totalRemove, newEnd)
          } else {
            totalRemove += removedSpaces
          }
        })
        newText += getSubstring(text, lastEnd)
        updateValue({
          editorEgine,
          value: newText,
          start: newStart,
          end: newEnd
        })
      } else {
        // 单行清空行首空格
        const leadingSpaceCount = getMatchReg({
          value: pStart.value,
          type: 'leading-space'
        }).length
        if (leadingSpaceCount === 0) return
        const spaceToRemove = leadingSpaceCount % 2 === 1 ? 1 : 2
        const v1 = getSubstring(text, 0, pStart.startIndex)
        const v2 = getSubstring(pStart.value, spaceToRemove)
        const v3 = getSubstring(text, pStart.endIndex)
        const newStart = Math.max(pStart.startIndex, start - spaceToRemove)
        const newEnd = Math.max(pStart.startIndex, end - spaceToRemove)
        updateValue({
          editorEgine,
          value: v1 + v2 + v3,
          start: newStart,
          end: newEnd
        })
      }
    }
  }

  return {
    ctrlEnter,
    ctrlX,
    ctrlC,
    ctrlV,
    _tab,
    _enter,
    shiftTab
  }
}
