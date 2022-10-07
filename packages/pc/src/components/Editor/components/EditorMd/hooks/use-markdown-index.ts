/*
 * markdown 编辑器逻辑处理
 */
import { debounce, isArray } from 'lodash-es'
import { nextTick, ref, watch, onMounted, onUnmounted } from 'vue'
import { EditorMarkdownProps } from '../type'
import { uploadFile, deleteFile } from '@/api/file'

type insertFnParams = {
  url: string
  desc?: string
  width?: string
  height?: string
}
type insertFn = (obj: insertFnParams) => void

export const useMarkdownIndex = (props: EditorMarkdownProps, emit: any) => {
  const value = ref<string>('')
  const refVMdEditor = ref<any>()

  // 改变
  const handleChange = (text: string) => {
    value.value = text
    emit('update:modelValue', text)
    emit('change', text)
  }

  // 自定义上传图片
  const originFiles: DataBaseFile[] = []
  const handleUploadImage = async (event: Event, insertFn: insertFn, files: File[]) => {
    if (isArray(files) && files.length) {
      for (let i = 0, len = files.length; i < len; i++) {
        const params: FormData = new FormData()
        params.append('file', files[i])
        const res = await uploadFile(params, {
          staticPlace: 'editors'
        })
        if (res.code === 200) {
          res.data.forEach((item) => {
            insertFn({
              url: item.filePath,
              desc: item.fileName
            })
            originFiles.push(item)
          })
        }
      }
    }
  }
  // 销毁时删除富文本已删除的在线图片
  const removeFile = () => {
    let ids: string = ''
    originFiles.forEach((item) => {
      if (!value.value.includes(item.filePath)) {
        if (ids) ids += ',' + item.id
        else ids = item.id
      }
    })
    if (ids) deleteFile(ids)
  }
  onUnmounted(removeFile)

  // 监听modelValue 同时做防抖处理
  const debounceValue = debounce(() => {
    nextTick(() => {
      value.value = props.modelValue
    })
  }, 1000)
  watch(
    () => props.modelValue,
    () => {
      debounceValue()
    }
  )
  onMounted(() => {
    value.value = props.modelValue
  })

  return {
    value,
    refVMdEditor,
    handleChange,
    handleUploadImage
  }
}
