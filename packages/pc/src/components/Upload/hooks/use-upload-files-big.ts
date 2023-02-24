/**
 * @description 上传大文件逻辑处理
 * @author cpl
 * @create 2023-02-24 09:55:58
 */

import { ref } from 'vue'
import sparkMD5 from 'spark-md5'
import axios, { CancelTokenSource } from 'axios'
import { Message } from '@/utils/interaction'
import { addFileChunk, mergeFileChunk, verifyFileChunk } from '@/api/file'

interface ChunkFormDataOption {
  formData: FormData
  percentage: number
  chunkIndex: number
  cancelToken: CancelTokenSource
}
interface TaskOption {
  percent: number
  fileHash: string
  file: File
  chunkFormData: ChunkFormDataOption[]
}

const cancelToken = axios.CancelToken
// 切片大小 100 KB
const chunkSize = 1024 * 100

export const useUploadFilesBig = () => {
  // 创建文件分片
  const createChunkList = (file: File, chunkSize: number): Blob[] => {
    const fileChunkList: Blob[] = []
    let cur = 0
    while (cur < file.size) {
      fileChunkList.push(file.slice(cur, cur + chunkSize))
      cur += chunkSize
    }
    return fileChunkList
  }

  // 生成文件 hash
  const createMD5 = (fileChunkList: Blob[]) => {
    return new Promise((resolve, reject) => {
      const chunks = fileChunkList.length
      let currentChunk = 0
      const spark = new sparkMD5.ArrayBuffer()
      const reader = new FileReader()
      // 加载完成
      reader.onload = (e) => {
        // @ts-ignore
        spark.append(e.target?.result)
        currentChunk++
        console.log('spark', spark)
        if (currentChunk < chunks) {
          loadChunk()
        } else {
          resolve(spark.end())
        }
      }
      // 捕获错误
      reader.onerror = (e) => {
        reject(e)
      }
      const loadChunk = () => {
        reader.readAsArrayBuffer(fileChunkList[currentChunk])
      }
      loadChunk()
    })
  }

  const task = ref<TaskOption[]>([])

  // 文件上传
  const handleFileUpload = async (file: File) => {
    if (!file) {
      Message('请选择文件')
      return
    }
    const fileChunkList = createChunkList(file, chunkSize)
    const fileHash = <string>await createMD5(fileChunkList)
    const chunkFormData = fileChunkList
      .map((file, index) => {
        return {
          file,
          chunkIndex: index,
          fileHash
        }
      })
      .map((chunk) => {
        const formData = new FormData()
        formData.append('chunk', chunk.file)
        return {
          formData,
          chunkIndex: chunk.chunkIndex,
          percentage: 0,
          cancelToken: cancelToken.source()
        }
      })
    // 校验是否已上传
    const res = await verifyFileChunk({
      fileName: file.name,
      fileHash: fileHash
    })
    if (res.code === 200 && !res.data) {
      task.value.push({
        percent: 0,
        fileHash,
        file,
        chunkFormData
      })
      continueUpload(task.value.length - 1)
    } else {
      // 文件上传成功
      console.log(res.data)
    }

    console.log('chunkFormData', chunkFormData)
  }

  // 继续上传
  const continueUpload = (index: number) => {
    const target = task.value[index]
    const notUploaded = target.chunkFormData.filter((item) => item.percentage === 0)
    console.log('notUploaded', notUploaded)
    Promise.all(
      notUploaded.map((item) => {
        return new Promise((resolve, reject) => {
          const chunkIndex = item.chunkIndex
          addFileChunk(
            item.formData,
            { fileHash: target.fileHash, chunkIndex: item.chunkIndex },
            { cancelToken: item.cancelToken.token }
          )
            .then((res) => {
              target.chunkFormData[chunkIndex].percentage = 1
              console.log('res', res)
              console.log(1212, item)
              resolve(res)
            })
            .catch((err) => {
              console.log('err', err)
              reject(err)
            })
        })
      })
    ).then(async (data) => {
      // 所有请求完成 合并切片
      console.log(999, data)
      const res = await mergeFileChunk({
        fileName: target.file.name,
        fileHash: target.fileHash,
        chunkSize,
        chunkLength: target.chunkFormData.length,
        fileSize: target.file.size
      })
      console.log('成功', res)
      if (res.code === 200) {
      }
    })
  }

  // 暂停上传
  const stopUpload = (index: number) => {
    const target = task.value[index]
    target.chunkFormData.forEach((item) => {
      item.cancelToken.cancel('取消上传')
      item.cancelToken = cancelToken.source()
    })
  }

  return {
    handleFileUpload
  }
}
