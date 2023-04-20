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

import { IDomEditor, Toolbar, createEditor, createToolbar } from '@wangeditor/editor'
import { onMounted, nextTick, watch, onUnmounted, ref } from 'vue'
import { EditorWangProps, EditorWangEmits } from '../type'
import { getToolbarConfig, getEditorConfig } from './handle-editor-wang-config'
import { deleteFile } from '@/api/file'
import { debounce } from 'lodash-es'
import gsap from 'gsap'

export const useEditorWang = (props: EditorWangProps, emit: EditorWangEmits, id: string) => {
  // 获取配置
  const toolbarConfig = getToolbarConfig(props.toolbarConfig)
  const { originFiles, editorConfig } = getEditorConfig(props)

  let editor: IDomEditor | null = null
  let toolbar: Toolbar | null = null
  let value: string = ''
  const editorId = ref('')

  let _isFocus: boolean = false
  let _isLoaded: boolean = false

  // 富文本创建完成回调
  const onCreated = (editor: IDomEditor) => {
    editorId.value = editor.id
    editor.setHtml(props.modelValue)
    handleEditorEmit(editor)
    if (props.isEmitMounted) {
      emit('change', props.modelValue)
    }
    _isLoaded = true
  }
  const onChange = (editor: IDomEditor) => {
    value = editor.getHtml()
    emit('update:modelValue', value)
    emit('change', value)
    handleTitle(editor)
  }
  const onFocus = () => {
    _isFocus = true
    emit('focus', value)
  }
  const onBlur = () => {
    _isFocus = false
    emit('blur', value)
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
      if (editor) {
        try {
          editor.setHtml(value)
        } catch (e) {}
      }
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
  const catalogStyle = ref({
    width: 0,
    opacity: 0
  })
  const catalogHeaders = ref<any[]>([])
  const handleTitle = (editor: IDomEditor) => {
    catalogHeaders.value = editor.getElemsByTypePrefix('header')
  }
  const handleChangeTitle = (item: any) => {
    editor?.scrollToElem(item.id)
  }
  const isPreview = ref<boolean>(false)
  const previewStyle = ref({
    width: 0,
    opacity: 0
  })
  const isFullScreen = ref<boolean>(false)

  // 监听自定义按钮事件
  const handleEditorEmit = (editor: IDomEditor) => {
    // 监听目录导航回调
    editor.on('wang-editor-title', (active: boolean) => {
      handleTitle(editor)
      if (active) {
        showCatalog.value = active
        gsap.to(catalogStyle.value, {
          width: 200,
          opacity: 1
        })
      } else {
        gsap.to(catalogStyle.value, {
          width: 0,
          opacity: 0,
          onComplete() {
            showCatalog.value = active
          }
        })
      }
    })
    // 监听预览
    editor.on('wang-editor-preview', (active: boolean) => {
      isPreview.value = active
      if (active) {
        gsap.to(previewStyle.value, {
          width: 50,
          opacity: 1
        })
      } else {
        gsap.to(previewStyle.value, {
          width: 0,
          opacity: 0
        })
      }
    })
    // 监听全屏
    editor.on('wang-editor-fullScreen', (active: boolean) => {
      isFullScreen.value = active
    })
  }

  // 保存
  const keydown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.keyCode === 83 && _isFocus && _isLoaded) {
      e.preventDefault()
      emit('save', value)
    }
  }
  onMounted(() => {
    document.addEventListener('keydown', keydown)
  })
  onUnmounted(() => {
    document.removeEventListener('keydown', keydown)
  })

  return {
    editorId,
    showCatalog,
    catalogHeaders,
    catalogStyle,
    handleChangeTitle,
    isPreview,
    previewStyle,
    isFullScreen
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
