/**
 * 复制 粘贴
 */
import { Message } from '@/utils/interaction'
import clipboard from 'clipboardy'
export const useClipboardy = () => {
  /**
   * 复制
   * @params text 复制文本
   * @params showSuccess 是否显示成功提示
   */
  const copy = (text: string, showSuccess?: boolean) => {
    clipboard
      .write(text)
      .then(() => {
        if (showSuccess) {
          Message({
            message: '复制成功',
            type: 'success'
          })
        }
      })
      .catch(() => {
        if (showSuccess) {
          Message({
            message: '复制失败',
            type: 'error'
          })
        }
      })
  }
  const paste = () => clipboard.read()

  return {
    copy,
    paste,
    clipboard
  }
}
