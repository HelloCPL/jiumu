/**
 * 文件上传逻辑处理
 */

import { UploadProps, UploadEmits } from '../type'
import { ref, computed, nextTick, watch } from 'vue'
import { UploadInstance, UploadRawFile, UploadRequestOptions } from 'element-plus'
import { Message } from '@/utils/interaction'
import { getSuffix } from '@jiumu/utils'
import { uploadFile } from '@/api/file'
import { isPlainObject } from 'lodash-es'

// 超过 3 M 使用断点上传方式
const UPLOAD_BIG_SIZE = 1024 * 1024 * 3

export const useIndex = (props: UploadProps, emit: UploadEmits) => {
  const refUpload = ref<UploadInstance>()
  const refUploadFilesBig = ref<any>(null)

  // 接收类型
  const _accept = computed(() => {
    if (props.accept) return props.accept
    else if (props.type === 'files') return '.pdf,.doc,.docx,.txt,.xls,.xlsx,.xlsm,.zip,.rar,.7z'
    else if (props.type === 'videos') return '.flv,.avi,.mov,.mp4,.wmv'
    else if (props.type === 'files_big') return '*'
    else return 'image/*'
  })

  // 文件个数超过限制大小
  const onExceed = () => {
    Message(`最多可以再上传${_limit.value}个文件`)
  }
  // 上传前校验
  const beforeUpload = (file: UploadRawFile) => {
    const flag = validSuffix(file, _accept.value)
    if (flag) return true
    Message(`文件格式不正确，请选择${_accept.value}格式的文件`)
    return false
  }
  // 上传
  const httpRequest = (fileOption: UploadRequestOptions) => {
    const up1 = async (fileOption: UploadRequestOptions) => {
      refUploadFilesBig.value?.handleFileUpload(fileOption.file)
    }
    const up2 = async (fileOption: UploadRequestOptions) => {
      const file = new FormData()
      file.append('file', fileOption.file)
      let params: ParamsFileOther = {}
      if (isPlainObject(props.params)) params = Object.assign(params, props.params)
      params.staticPlace = props.type
      const res = await uploadFile(file, params)
      if (res.code === 200) {
        emit('change', res.data)
      } else {
        Message(res.message)
      }
    }
    if (props.uploadType === 'files_big') {
      up1(fileOption)
    } else if (props.uploadType === 'files') {
      up2(fileOption)
    } else {
      if (fileOption.file.size > UPLOAD_BIG_SIZE) {
        up1(fileOption)
      } else {
        up2(fileOption)
      }
    }
  }

  // 上传状态改变
  const onChange = () => {
    nextTick(() => {
      refUpload.value?.clearFiles()
    })
  }

  // 处理上传数量限制
  const _limit = ref<number>(0)
  const handleLimit = (limit: number, limited: number) => {
    if (limit === 0 || limited === 0) _limit.value = 10
    else _limit.value = limit - limited
  }
  watch(
    () => props.limit,
    (val) => {
      handleLimit(val, props.limit)
    },
    { immediate: true }
  )
  watch(
    () => props.limited,
    (val) => {
      onChange()
      handleLimit(props.limit, val)
    },
    { immediate: true }
  )

  return {
    refUpload,
    refUploadFilesBig,
    _accept,
    _limit,
    onChange,
    onExceed,
    beforeUpload,
    httpRequest
  }
}

// 校验文件后缀格式
const validSuffix = (file: UploadRawFile, accept: string): boolean => {
  const suffix = getSuffix(file.name, '.', true)
  if (accept.includes(suffix) || accept === '*' || (file.type.includes('image') && accept.includes('image')))
    return true
  return false
}
