/**
 * 文件展示组件处理逻辑
 */

import { ShowFileProps, ShowFileEmits } from '../type'
import { deleteFile } from '@/api/file'
import { Confirm } from '@/utils/interaction'
import { reactive } from 'vue'

export const useIndex = (props: ShowFileProps, emit: ShowFileEmits) => {
  const state = reactive({
    showImage: false,
    urlImage: '',
    showPdf: false,
    urlPdf: '',
    showWord: false,
    urlWord: '',
    showExcel: false,
    urlExcel: '',
    showTxt: false,
    urlTxt: '',
    showMd: false,
    urlMd: ''
  })
  // 预览
  const handlePreview = (file: DataBaseFile) => {
    const fileType = getFileType(file.suffix)
    switch (fileType) {
    case 'image':
      state.urlImage = file.filePath
      state.showImage = true
      break
    case 'pdf':
      state.urlPdf = file.filePath
      state.showPdf = true
      break
    case 'word':
      state.urlWord = file.filePath
      state.showWord = true
      break
    case 'excel':
      state.urlExcel = file.filePath
      state.showExcel = true
      break
    case 'txt':
      state.urlTxt = file.filePath
      state.showTxt = true
      break
    case 'md':
      state.urlMd = file.filePath
      state.showMd = true
      break
    }
  }

  const showPreView = (suffix: string) => {
    const fileType = getFileType(suffix)
    const types = ['image', 'pdf', 'word', 'excel', 'txt', 'md']
    if (props.isPreview && types.indexOf(fileType) !== -1) return true
    return false
  }

  // 删除
  const handleDelete = (file: DataBaseFile, index: number) => {
    Confirm('确定删除这个文件吗？').then(async () => {
      // const res =
      await deleteFile(file.id, false)
      // if (res.code === 200) {
      const arr = props.modelValue
      const item = arr.splice(index, 1)
      emit('update:modelValue', arr)
      emit('change', arr, item)
      // }
    })
  }

  return {
    state,
    handlePreview,
    handleDelete,
    showPreView
  }
}

/**
 * 获取文件类型
 */
type FileType =
  | 'pdf'
  | 'word'
  | 'image'
  | 'video'
  | 'ppt'
  | 'rar'
  | 'txt'
  | 'excel'
  | 'zip'
  | 'md'
  | 'unknown'
export const getFileType = (suffix: string): FileType => {
  switch (suffix) {
  case 'pdf':
    return 'pdf'
  case 'doc':
  case 'docx':
    return 'word'
  case 'bmp':
  case 'gif':
  case 'jpg':
  case 'pic':
  case 'png':
  case 'tif':
  case 'jpeg':
    return 'image'
  case 'ppt':
  case 'pptx':
  case 'pps':
  case 'pot':
  case 'ppa':
    return 'ppt'
  case 'rar':
    return 'rar'
  case 'txt':
    return 'txt'
  case 'xls':
  case 'xlsx':
  case 'xlsm':
  case 'csv':
    return 'excel'
  case 'zip':
  case 'arj':
    return 'zip'
  case 'mp4':
  case 'mov':
  case 'avi':
  case 'm3u8':
  case 'flv':
  case 'wmv':
  case 'mpg':
  case 'mpeg':
  case 'rm':
  case 'ram':
  case 'swf':
    return 'video'
  case 'md':
    return 'md'
  default:
    return 'unknown'
  }
}

/**
 * 文件大小单位转换
 */
export const getFileSize = (size: number, len = 1): string => {
  if (size <= 0) return ''
  const units = ['B', 'KB', 'M', 'G', 'T']
  let unit: string
  while ((unit = <string>units.shift()) && size > 1024) {
    size = size / 1024
  }
  return (unit === 'B' ? size : size.toFixed(len)) + unit
}
