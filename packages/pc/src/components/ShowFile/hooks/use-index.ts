/**
 * 文件展示组件处理逻辑
 */

import { ShowFileProps } from '../type'
import { deleteFile } from '@/api/file'
import { Confirm } from '@/utils/interaction'
import { reactive } from 'vue'

export const useIndex = (props: ShowFileProps, emit: any) => {
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
    urlTxt: ''
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
      case 'txt':
        state.urlTxt = file.filePath
        state.showTxt = true
        break
    }
  }
  // 删除
  const handleDelete = (file: DataBaseFile, index: number) => {
    Confirm('确定删除这个文件吗？').then(async () => {
      const res = await deleteFile(file.id)
      if (res.code === 200) {
        const arr = props.modelValue
        arr.splice(index, 1)
        emit('update:modelValue', arr)
      }
    })
  }

  return {
    state,
    handlePreview,
    handleDelete
  }
}

/**
 * 获取文件类型
 */
type FileType = 'pdf' | 'word' | 'image' | 'ppt' | 'rar' | 'txt' | 'excel' | 'zip' | 'unknown'
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
