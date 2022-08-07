/**
 * @author chen
 * @description 文件下载方法
 * @update 2022-08-07 15:43:50
 */

import { useUserStore } from '@/store'
import { Message } from './interaction'

/**
 * 文件下载
 */
export const downloadFile = (file: DataBaseFile) => {
  _getBlob(file.filePath, (blob: Blob) => {
    _saveFile(blob, file.fileName)
  })
}

function _getBlob(url: string, cd: Function) {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.responseType = 'blob'
  const store = useUserStore()
  if (store.token) {
    xhr.setRequestHeader('Authorization', store.token)
  }
  // 监听请求
  xhr.onload = function () {
    if (xhr.status === 200) {
      cd(xhr.response)
    } else {
      Message('文件下载失败')
    }
  }
  xhr.send()
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
export const downloadText = (url: string): Promise<any> => {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'blob'
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    const store = useUserStore()
    if (store.token) {
      xhr.setRequestHeader('Authorization', store.token)
    }
    xhr.onload = function () {
      if (xhr.status === 200) {
        const reader = new FileReader()
        reader.readAsText(xhr.response, 'GBK')
        reader.onload = function (e) {
          resolve(e.target?.result)
        }
      } else {
        Message('文件请求失败')
      }
    }
    xhr.send()
  })
}
