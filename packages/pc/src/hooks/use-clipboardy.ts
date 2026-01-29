/**
 * 复制 粘贴
 */
import { uploadFile } from '@/api/file'
import { Message } from '@/utils/interaction'
import { getSuffix } from '@jiumu/utils'
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

  /**
   * 粘贴
   * @params isUpload 如果是图片时，是否上传到服务器，并返回得到后的url
   */
  const paste = async (isUpload?: boolean) => {
    const text = await clipboard.read()
    if (!text && isUpload) {
      const data = await navigator.clipboard.read()
      if (data.length && data[0].types && data[0].types.length && data[0].types[0].startsWith('image/')) {
        const item = data[0]
        const type = data[0].types[0]
        const blob = await item.getType(type)
        const file = new FormData()
        const fileName = `paste_image_${Date.now()}.${getSuffix(blob.type, '/')}`
        file.append('file', blob, fileName)
        const res = await uploadFile(file, { staticPlace: 'images' })
        if (res?.code === 200 && res?.data?.length) {
          return res.data[0].filePath
        }
      }
    }
    return text
  }

  return {
    copy,
    paste,
    clipboard
  }
}
