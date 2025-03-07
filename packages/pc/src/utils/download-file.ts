/**
 * @author chen
 * @description 文件下载方法
 * @update 2022-08-07 15:43:50
 */

import { useUserStore } from '@/store'
import { isPlainObject } from 'lodash-es'
import { Message } from './interaction'

interface ParamsFile {
  filePath: string
  fileName: string
  fileSize?: number
  force?: boolean
}

/**
 * 文件下载
 * 如果文件大小大于 5M 或者 force 为 true，则直接使用 a 标签下载，
 * 否则先下载文件流，再使用 a 标签下载
 */
export function downloadFile<T extends ParamsFile = DataBaseFile>(file: T): Promise<boolean> {
  return new Promise((resolve) => {
    const size = file.fileSize || 0
    if (file.force || size > 5 * 1024 * 1024) {
      const link: HTMLAnchorElement = document.createElement('a')
      link.style.display = 'none'
      link.href = file.filePath
      link.download = file.fileName
      document.body.appendChild(link)
      link.click()
      setTimeout(() => {
        window.URL.revokeObjectURL(link.href)
        document.body.removeChild(link)
        resolve(true)
      })
    } else {
      getFileBlod(file.filePath, {}).then((data) => {
        if (!data) {
          _saveFile(data, file.fileName).then(resolve)
        } else {
          resolve(false)
        }
      })
    }
  })
}

/**
 * 将一个 Blob 对象保存为文件
 */
export function _saveFile(blob: Blob, fileName: string): Promise<boolean> {
  return new Promise((resolve) => {
    // @ts-ignore
    if (window.navigator.msSaveOrOpenBlob) {
      // @ts-ignore
      navigator.msSaveBlob(blob, fileName)
      resolve(true)
    } else {
      const link: HTMLAnchorElement = document.createElement('a')
      link.style.display = 'none'
      try {
        link.href = window.URL.createObjectURL(blob)
      } catch (err) {
        console.warn('Create Blob URL failed:', err)
        resolve(false)
        return
      }
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      setTimeout(() => {
        window.URL.revokeObjectURL(link.href)
        document.body.removeChild(link)
        resolve(true)
      })
    }
  })
}

/**
 * 请求返回文本
 */
export const getFileText = (url: string, unicode: string = 'GBK'): Promise<any> => {
  return new Promise((resolve) => {
    getFileBlod(url).then((data) => {
      const reader = new FileReader()
      reader.readAsText(data, unicode)
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
        resolve(null)
        Message('文件请求失败')
      }
    }
    xhr.send()
  })
}
