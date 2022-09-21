/**
 * 处理富文本编辑器逻辑
 */

/*
* 1. 设置高度配置（点击下方空白聚焦）
5. 增加预览，查看标题列表自定义按钮，处理配置
3. 增加图片上传
4. 增加视频上传
6. 增加标题联动
7. 增加预览显示
*/

import {
  IDomEditor,
  Toolbar,
  DomEditor,
  createEditor,
  createToolbar,
  IEditorConfig
} from '@wangeditor/editor'
import { onMounted, nextTick, watch, onUnmounted } from 'vue'
import { EditorWangProps } from '../type'
import { getToolbarConfig, getEditorConfig } from './handle-editor-wang-config'
import { deleteFile } from '@/api/file'
import { debounce } from 'lodash-es'

export const useEditorWang = (props: EditorWangProps, emit: any) => {
  // 获取配置
  const toolbarConfig = getToolbarConfig(props.toolbarConfig)
  const { originFiles, editorConfig } = getEditorConfig(props)

  let editor: IDomEditor | null = null
  let toolbar: Toolbar | null = null
  let value: string = ''

  // 初始化编辑器
  const initEditor = () => {
    nextTick(() => {
      editor = createEditor({
        selector: '#editor-container',
        html: '',
        config: {
          ...editorConfig,
          onCreated,
          onChange,
          onFocus,
          onBlur
        }
      })
      toolbar = createToolbar({
        editor,
        selector: '#toolbar-container',
        config: toolbarConfig
      })
      setEditorHeight()
    })
  }

  // 设置编辑器高度 如果滚动设置高度 如果不滚动设置最小高度
  const setEditorHeight = () => {
    nextTick(() => {
      const tDiv: HTMLDivElement = <HTMLDivElement>document.getElementById('toolbar-container')
      const eDiv: HTMLDivElement = <HTMLDivElement>document.getElementById('editor-container')
      if (tDiv && eDiv) {
        const h = props.height - tDiv.clientHeight
        if (h > 0) eDiv.style.height = h + 'px'
      }
    })
  }

  // 监听modelValue 同时做防抖处理
  const debounceValue = debounce(() => {
    nextTick(() => {
      if (editor) editor.setHtml(value)
    })
  }, 1000)
  watch(
    () => props.modelValue,
    (val) => {
      value = val
      debounceValue()
    }
  )

  // 初始化和销毁操作
  onMounted(initEditor)
  onUnmounted(() => {
    if (editor) editor.destroy()
  })

  const onCreated = (editor: IDomEditor) => {
    editor.setHtml(props.modelValue)
  }
  const onChange = (editor: IDomEditor) => {
    value = editor.getHtml()
    emit('update:modelValue', value)
    emit('change', value)
  }
  const onFocus = () => {
    emit('focus', value)
  }
  const onBlur = () => {
    emit('blur', value)
  }

  // 销毁时删除富文本已删除的在线图片或视频
  const removeFile = () => {
    const imageList = editor?.getElemsByType('image') || []
    const videoList = editor?.getElemsByType('video') || []
    const arr = [...imageList, ...videoList]
    const idsList: string[] = []
    originFiles.forEach((file) => {
      if (!findFileId(arr, file.filePath)) {
        idsList.push(file.id)
      }
    })
    const ids = idsList.join(',')
    if (ids) deleteFile(ids)
  }
  onUnmounted(removeFile)
}

function findFileId(files: any[], url: string): boolean {
  let flag = false
  files.find((file) => {
    if (file.src === url) {
      flag = true
      return flag
    }
  })
  return flag
}
