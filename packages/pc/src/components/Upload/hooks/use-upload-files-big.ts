/**
 * @description 上传大文件逻辑处理
 * @author cpl
 * @create 2023-02-24 09:55:58
 */

import { ref } from 'vue'
import sparkMD5 from 'spark-md5'
import axios, { CancelTokenSource } from 'axios'
import { Message, useLoading } from '@jiumu/utils'
import { addFileChunk, mergeFileChunk, verifyFileChunk, deleteFileChunk } from '@/api/file'
import { UploadFilesBigProps, UploadEmits } from '../type'
import { getRandomId } from '@jiumu/utils'

type Status = '0' | '1' | '2'

interface ChunkFormDataOption {
  formData: FormData
  status: Status // 切片上传状态 '0' 未上传 '1' 上传中 '2' 已上传
  chunkIndex: number // 切片编号 从 0 开始
  cancelToken: CancelTokenSource
}
interface TaskOption {
  percent: number // 任务上传进度
  fileHash: string // 原始文件 hash
  file: File // 任务的原始文件对象
  chunkFormData: ChunkFormDataOption[] // 任务的切片列表
  id: string // 任务 id
  status: Status // 任务状态 '0' 等待上传 '1' 上传中 '2' 暂停上传
  retryCount: number // 重试次数
}

const cancelToken = axios.CancelToken
// 切片大小 1 M
const CHUNK_SIZE = 1024 * 1024 * 1
// 文件大于 10 M 时显示切片加载
const LOADING_SIZE = 1024 * 1024 * 8
// 每个任务的切片并发上传数量
const MAX_CHUNK_COUNT = 4
// 每个任务切片错误最大重试数
const MAX_RETRY_COUNT = 10
// 最大任务并发数（超过则等待）
const MAX_TASK_COUNT = 6

export const useUploadFilesBig = (props: UploadFilesBigProps, emit: UploadEmits) => {
  const { showLoading, hideLoading } = useLoading()

  const task = ref<TaskOption[]>([])

  /**
   * 大文件上传
   * 添加上传任务，并执行上传任务
   */
  const handleFileUpload = async (file: File) => {
    if (!file) {
      Message('请选择文件')
      return
    }
    if (file.size > LOADING_SIZE) showLoading()
    const fileChunkList = createChunkList(file, CHUNK_SIZE)
    const fileHash = await createMD5(fileChunkList)
    if (file.size > LOADING_SIZE) hideLoading()

    const chunkFormData: ChunkFormDataOption[] = fileChunkList.map((file, index) => {
      const formData = new FormData()
      formData.append('chunk', file)
      return {
        formData,
        chunkIndex: index,
        status: '0',
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
        status: '0',
        retryCount: 0
      }
      task.value.push(target)
      startTask()
    }
  }

  /**
   * 开始任务
   */
  const startTask = () => {
    const waitTask = task.value.filter((item) => item.status === '0')
    const runningTask = task.value.filter((item) => item.status !== '0')
    if (runningTask.length < MAX_TASK_COUNT) {
      const canStartCount = MAX_TASK_COUNT - runningTask.length
      const startTaskList = waitTask.slice(0, canStartCount)
      startTaskList.forEach((item) => {
        handleUpload(item)
      })
    }
  }

  /**
   * 删除某个任务
   */
  const deleteTask = (target: TaskOption) => {
    const index = task.value.findIndex((item) => item.id === target.id)
    if (index !== -1) {
      target.file = null as any
      target.chunkFormData.forEach((item) => {
        item.formData = null as any
      })
      task.value.splice(index, 1)
    }
  }

  /**
   * 合并某个任务
   */
  const mergeTask = async (target: TaskOption) => {
    const flag = target.chunkFormData.every((item) => item.status === '2')
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
        deleteTask(target)
        emit('change', [res.data])
        startTask()
      }
    }
  }

  /**
   * 继续上传某个任务
   */
  const continueUpload = (target: TaskOption) => {
    target.status = '1'
    const uploadChunk = () => {
      const finished = target.chunkFormData.every((item) => item.status === '2')
      const pendingChunks = target.chunkFormData.filter((item) => item.status === '0')
      const activeChunk = target.chunkFormData.filter((item) => item.status === '1').length
      if (finished) {
        mergeTask(target)
      } else if (
        activeChunk < MAX_CHUNK_COUNT &&
        pendingChunks.length > 0 &&
        target.status === '1' &&
        target.retryCount < MAX_RETRY_COUNT
      ) {
        const chunk = pendingChunks[0]
        chunk.status = '1'
        addFileChunk(
          chunk.formData,
          { fileHash: target.fileHash, chunkIndex: chunk.chunkIndex },
          { cancelToken: chunk.cancelToken.token, showErrorMessage: false }
        )
          .then((res) => {
            if (res?.code === 200) {
              chunk.status = '2'
              handleTargetPercent(target)
            } else {
              target.retryCount += 1
              chunk.status = '0'
            }
          })
          .catch(() => {
            target.retryCount += 1
            chunk.status = '0'
          })
          .finally(() => {
            setTimeout(() => {
              uploadChunk()
            })
          })
        uploadChunk()
      } else if (target.retryCount >= MAX_RETRY_COUNT) {
        stopUpload(target)
      }
    }
    uploadChunk()
  }

  /**
   * 暂停上传某个任务
   */
  const stopUpload = (target: TaskOption) => {
    target.status = '2'
    target.retryCount = 0
    target.chunkFormData.forEach((item) => {
      if (item.status === '1') {
        item.cancelToken.cancel('暂停上传')
        item.cancelToken = cancelToken.source()
      }
    })
  }

  /**
   * 执行指定任务
   * 若任务未开始，则开始任务
   * 若任务已开始，则暂停任务
   */
  const handleUpload = (target: TaskOption) => {
    if (target.status === '1') stopUpload(target)
    else continueUpload(target)
  }

  /**
   * 取消某个任务
   */
  const handleCancel = async (target: TaskOption) => {
    stopUpload(target)
    await deleteFileChunk(target.fileHash).catch(() => {})
    deleteTask(target)
    startTask()
  }

  return {
    task,
    handleFileUpload,
    handleUpload,
    handleCancel
  }
}

/**
 * 创建文件分片
 */
function createChunkList(file: File, chunkSize: number): Blob[] {
  const fileChunkList: Blob[] = []
  let cur = 0
  while (cur < file.size) {
    fileChunkList.push(file.slice(cur, cur + chunkSize))
    cur += chunkSize
  }
  return fileChunkList
}

/**
 * 生成文件 hash
 */
function createMD5(fileChunkList: Blob[]): Promise<string> {
  return new Promise((resolve) => {
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
    reader.onerror = () => {
      resolve(getRandomId())
    }
    const loadChunk = () => {
      reader.readAsArrayBuffer(fileChunkList[currentChunk])
    }
    loadChunk()
  })
}

/**
 * 处理某个任务的上传进度
 */
function handleTargetPercent(target: TaskOption) {
  const newPercent =
    (target.chunkFormData.filter((item) => item.status === '2').length / target.chunkFormData.length) * 100
  target.percent = Number(newPercent.toFixed(2))
}
