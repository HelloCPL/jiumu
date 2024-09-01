/**
 * @description 上传大文件逻辑处理
 * @author cpl
 * @create 2023-02-24 09:55:58
 */

import { ref } from 'vue'
import sparkMD5 from 'spark-md5'
import axios, { CancelTokenSource } from 'axios'
import { Loading, Message } from '@/utils/interaction'
import { addFileChunk, mergeFileChunk, verifyFileChunk, deleteFileChunk } from '@/api/file'
import { UploadFilesBigProps, UploadEmits } from '../type'
import { getRandomId } from '@jiumu/utils'

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
  id: string
  status: DataBaseStatus // 上传状态 1 上传中 0 暂停上传
}

const cancelToken = axios.CancelToken
// 切片大小 200 KB
const CHUNK_SIZE = 1024 * 200
// 文件大于 10 M 时显示切片加载
const LOADING_SIZE = 1024 * 1024 * 10

export const useUploadFilesBig = (props: UploadFilesBigProps, emit: UploadEmits) => {
  let loading: any = null

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
    if (file.size > LOADING_SIZE) loading = Loading()
    const fileChunkList = createChunkList(file, CHUNK_SIZE)
    const fileHash = <string>await createMD5(fileChunkList)
    if (loading) {
      loading.close()
      loading = null
    }
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
    if (res.code === 200 && res.data) {
      // 文件上传成功
      emit('change', [res.data])
    } else {
      const target: TaskOption = {
        percent: 0,
        fileHash,
        file,
        chunkFormData,
        id: getRandomId(),
        status: '0'
      }
      task.value.push(target)
      handleUpload(target)
    }
  }

  let lock = false
  let timeId: any = null
  const clearTimeId = () => {
    clearTimeout(timeId)
    timeId = null
  }
  // 继续上传
  const continueUpload = (index: number) => {
    const target = task.value[index]
    target.status = '1'
    const notUploaded = target.chunkFormData.filter((item) => item.percentage === 0)
    Promise.all(
      notUploaded.map((item) => {
        return new Promise((resolve, reject) => {
          const chunkIndex = item.chunkIndex
          addFileChunk(
            item.formData,
            { fileHash: target.fileHash, chunkIndex: item.chunkIndex },
            { cancelToken: item.cancelToken.token, showErrorMessage: false }
          )
            .then((res) => {
              if (res && res.code === 200) {
                target.chunkFormData[chunkIndex].percentage = 1
                handleTargetPercent(index)
                resolve(res)
                // @ts-ignore
              } else if (res && res.code === 'ECONNABORTED') {
                // 超时处理
                if (lock) return
                lock = true
                clearTimeId()
                timeId = setTimeout(() => {
                  continueUpload(index)
                }, 1000)
                setTimeout(() => {
                  lock = false
                }, 1500)
              } else {
                reject(res)
              }
            })
            .catch((err) => {
              reject(err)
            })
        })
      })
    ).then(async (data) => {
      // 所有请求完成 合并切片
      let flag = true
      data.find((item) => {
        if (!item) flag = false
      })
      if (flag) {
        const res = await mergeFileChunk({
          fileName: target.file.name,
          fileHash: target.fileHash,
          chunkSize: CHUNK_SIZE,
          chunkLength: target.chunkFormData.length,
          fileSize: target.file.size,
          staticPlace: props.type
        })
        if (res.code === 200) {
          target.percent = 100
          task.value.splice(index, 1)
          emit('change', [res.data])
        }
      }
    })
  }

  // 处理上传进度
  const handleTargetPercent = (index: number) => {
    const target = task.value[index]
    let newPercent =
      (target.chunkFormData.filter((item) => item.percentage === 1).length / target.chunkFormData.length) *
      100
    newPercent = Number(newPercent.toFixed(2))
    target.percent = newPercent
  }

  // 暂停上传
  const stopUpload = (index: number) => {
    const target = task.value[index]
    target.status = '0'
    target.chunkFormData.forEach((item) => {
      item.cancelToken.cancel('暂停上传')
      item.cancelToken = cancelToken.source()
    })
  }

  const handleUpload = (target: TaskOption) => {
    let index = -1
    task.value.find((item, i) => {
      if (item.id === target.id) {
        index = i
        return true
      }
    })
    if (index === -1) return
    if (target.status === '1') stopUpload(index)
    else continueUpload(index)
  }

  // 取消上传
  const handleCancel = async (target: TaskOption) => {
    let index = -1
    task.value.find((item, i) => {
      if (item.id === target.id) {
        index = i
        return true
      }
    })
    if (index !== -1) {
      stopUpload(index)
      const res = await deleteFileChunk(target.fileHash)
      if (res.code === 200) {
        task.value.splice(index, 1)
      }
    }
  }

  return {
    task,
    handleFileUpload,
    handleUpload,
    handleCancel
  }
}
