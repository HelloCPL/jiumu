/**
 * 文件上传逻辑处理
 */

import { UploadProps } from '../type'
import { ref, computed, nextTick, watch } from 'vue'
import { UploadInstance, UploadRawFile, UploadRequestOptions } from 'element-plus'
import { Message } from '@/utils/interaction'
import { getSuffix } from '@jiumu/utils'
import { uploadFile } from '@/api/file'
import { isPlainObject } from 'lodash-es'

export const useIndex = (props: UploadProps, emit: any) => {
  const refUpload = ref<UploadInstance>()

  // 接收类型
  const _accept = computed(() => {
    if (props.accept) return props.accept
    else if (props.type === 'files') return '.pdf,.doc,.docx,.txt,.xls,.xlsx,.xlsm,.zip,.rar,.7z'
    else if (props.type === 'videos') return '.flv,.avi,.mov,.mp4,.wmv'
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
  const httpRequest = async (fileOption: UploadRequestOptions) => {
    const file = new FormData()
    file.append('file', fileOption.file)
    let params: ObjectAny = {}
    if (isPlainObject(props.params)) params = Object.assign(params, props.params)
    params.staticPlace = props.type
    const res = await uploadFile(file, params)
    if (res.code === 200) {
      emit('change', res.data)
    } else {
      Message(res.message)
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