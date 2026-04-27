import { getSuffix, Message } from '@jiumu/utils'
import { getPreviewFileType } from './utils'
import PreviewImage from '../components/PreviewImage/index'
import PreviewPdf from '../components/PreviewPdf/index'
import PreviewWord from '../components/PreviewWord/index'
import PreviewExcel from '../components/PreviewExcel/index'
import PreviewMd from '../components/PreviewMd/index'
import PreviewCommon from '../components/PreviewCommon/index'

type PreviewFileOption = {
  url?: string
  file?: DataBaseFile
}

/**
 * 文件预览
 * @param url 文件地址
 * @param file 文件信息
 */
export function previewFile(options: PreviewFileOption) {
  let type = ''
  if (options?.file?.filePath) type = getPreviewFileType(getSuffix(options.file.filePath))
  if (!type && options.url) type = getPreviewFileType(getSuffix(options.url))
  if (!type) {
    Message({ type: 'warning', message: '请传入预览地址' })
    return
  }
  if (type === 'image') {
    PreviewImage(options)
  } else if (type === 'pdf') {
    PreviewPdf(options)
  } else if (type === 'word') {
    PreviewWord(options)
  } else if (type === 'excel') {
    PreviewExcel(options)
  } else if (type === 'markdown') {
    PreviewMd(options)
  } else if (type) {
    PreviewCommon({
      ...options,
      lang: type
    })
  }
}
