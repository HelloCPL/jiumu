/**
 * @author chen
 * @description 文件下载方法
 * @update 2022-08-07 15:43:50
 */

import { useUserStore } from '@/store'
import { isPlainObject } from 'lodash-es'
import { Message } from './interaction'

/**
 * 文件下载
 */
export const downloadFile = (file: DataBaseFile) => {
  getFileBlod(file.filePath, {}).then((data) => {
    _saveFile(data, file.fileName)
  })
}

// 保存文件
function _saveFile(blob: Blob, fileName: string) {
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, fileName)
  } else {
    const link: HTMLAnchorElement = document.createElement('a')
    const body: HTMLBodyElement = <HTMLBodyElement>document.querySelector('body')
    link.href = window.URL.createObjectURL(blob)
    link.download = fileName
    link.style.display = 'none'
    body.appendChild(link)
    link.click()
    body.removeChild(link)
    window.URL.revokeObjectURL(link.href)
  }
}

/**
 * 请求返回文本
 */
export const getFileText = (url: string): Promise<any> => {
  return new Promise((resolve) => {
    getFileBlod(url).then((data) => {
      const reader = new FileReader()
      reader.readAsText(data, 'GBK')
      reader.onload = function (e) {
        resolve(e.target?.result)
      }
    })
  })
}

/**
 * 请求返回 blob 文件流
 */
export const getFileBlod = (
  url: string,
  headers: ObjectAny = { 'Content-Type': 'application/x-www-form-urlencoded' }
): Promise<any> => {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'blob'
    if (isPlainObject(headers)) {
      for (const key in headers) {
        xhr.setRequestHeader(key, headers[key])
      }
    }
    const store = useUserStore()
    if (store.token) {
      xhr.setRequestHeader('Authorization', store.token)
    }
    xhr.onload = function () {
      if (xhr.status === 200) {
        resolve(xhr.response)
      } else {
        Message('文件请求失败')
      }
    }
    xhr.send()
  })
}
