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
import { onMounted, nextTick, watch, onUnmounted, ref } from 'vue'
import { EditorWangProps } from '../type'
import { getToolbarConfig, getEditorConfig } from './handle-editor-wang-config'
import { deleteFile } from '@/api/file'
import { debounce } from 'lodash-es'

export const useEditorWang = (props: EditorWangProps, emit: any, id: string) => {
  // 获取配置
  const toolbarConfig = getToolbarConfig(props.toolbarConfig, id)
  const { originFiles, editorConfig } = getEditorConfig(props)

  let editor: IDomEditor | null = null
  let toolbar: Toolbar | null = null
  let value: string = ''

  // 富文本创建完成回调
  const onCreated = (editor: IDomEditor) => {
    editor.setHtml(props.modelValue)
    handleEditorEmit(editor)
  }
  const onChange = (editor: IDomEditor) => {
    value = editor.getHtml()
    emit('update:modelValue', value)
    emit('change', value)
    handleTitle(editor)
  }
  const onFocus = () => {
    emit('focus', value)
  }
  const onBlur = () => {
    emit('blur', value)
  }

  // 设置编辑器高度
  const setEditorHeight = () => {
    nextTick(() => {
      const tDiv: HTMLDivElement = <HTMLDivElement>document.getElementById(`toolbar-${id}`)
      const eDiv: HTMLDivElement = <HTMLDivElement>document.getElementById(`editor-${id}`)
      if (tDiv && eDiv) {
        const h = props.height - tDiv.clientHeight
        if (h > 0) eDiv.style.height = h + 'px'
      }
    })
  }

  // 初始化编辑器
  const initEditor = () => {
    nextTick(() => {
      editor = createEditor({
        selector: `#editor-${id}`,
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
        selector: `#toolbar-${id}`,
        config: toolbarConfig
      })
      setEditorHeight()
    })
  }

  // 初始化和销毁操作
  onMounted(initEditor)
  onUnmounted(() => {
    if (editor) editor.destroy()
  })

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

  // 自定义按钮监听逻辑
  const showCatalog = ref<boolean>(false)
  const catalogHeaders = ref<any[]>([])
  const handleTitle = (editor: IDomEditor) => {
    if (showCatalog.value) {
      catalogHeaders.value = editor.getElemsByTypePrefix('header')
    }
  }
  const handleChangeTitle = (item: any) => {
    editor?.scrollToElem(item.id)
  }

  const handleEditorEmit = (editor: IDomEditor) => {
    editor.on('wang-editor-title', (active: boolean) => {
      showCatalog.value = active
      handleTitle(editor)
    })
    editor.on('wang-editor-fullScreen', (active: boolean) => {
      if (active) editor.fullScreen()
      else editor.unFullScreen()
    })
  }

  return {
    showCatalog,
    catalogHeaders,
    handleChangeTitle
  }
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
