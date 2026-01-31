/*
 * markdown 编辑器逻辑处理
 */
import { debounce, isArray } from 'lodash-es'
import { nextTick, ref, watch, onMounted, onUnmounted } from 'vue'
import { EditorMarkdownProps, EditorMarkdownEmits } from '../type'
import { uploadFile, deleteFile } from '@/api/file'
import { useMarkdownKeydown } from './use-markdown-keydown'

type insertFnParams = {
  url: string
  desc?: string
  width?: string
  height?: string
}
type insertFn = (obj: insertFnParams) => void

export const useMarkdownIndex = (props: EditorMarkdownProps, emit: EditorMarkdownEmits) => {
  let _isLoaded = false

  const value = ref<string>('')
  const refVMdEditor = ref<any>()

  // 改变
  const handleChange = (text: string) => {
    if (!_isLoaded) return
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
    _isLoaded = true
    if (props.modelValue === '<p><br></p>') {
      handleChange('')
    } else {
      value.value = props.modelValue.replace(/<\/p><p>/g, '</p>\n<p>')
      if (props.isEmitMounted) {
        setTimeout(() => {
          emit('change', value.value)
        }, 1000)
      }
    }
  })

  // 保存
  const handleSave = (text: string) => {
    emit('save', text)
  }
  // 处理键盘快捷键
  const { ctrlEnter, ctrlX, ctrlC, ctrlV, _tab, _enter, shiftTab } = useMarkdownKeydown()
  const keydown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.keyCode === 83) {
      // ctrl + s
      e.preventDefault()
    } else if (e.ctrlKey && e.keyCode === 13) {
      ctrlEnter(e, refVMdEditor, value.value)
    } else if (e.ctrlKey && e.keyCode === 88) {
      ctrlX(e, refVMdEditor, value.value)
    } else if (e.ctrlKey && e.keyCode === 67) {
      ctrlC(e, refVMdEditor, value.value)
    } else if (e.ctrlKey && e.keyCode === 86) {
      ctrlV(e, refVMdEditor, value.value)
    } else if (e.shiftKey && e.keyCode === 9) {
      shiftTab(e, refVMdEditor, value.value)
    } else if (e.keyCode === 9) {
      _tab(e, refVMdEditor, value.value)
    } else if (e.keyCode === 13) {
      _enter(e, refVMdEditor, value.value)
    }
  }
  onMounted(() => {
    document.addEventListener('keydown', keydown)
  })
  onUnmounted(() => {
    document.removeEventListener('keydown', keydown)
  })

  return {
    value,
    refVMdEditor,
    handleChange,
    handleSave,
    handleUploadImage
  }
}
