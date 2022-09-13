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

import { IDomEditor, Toolbar, DomEditor, createEditor, createToolbar } from '@wangeditor/editor'
import { onMounted, nextTick, watch, onUnmounted } from 'vue'
import { EditorWangProps } from '../type'
import { getToolbarConfig, getEditorConfig } from './handle-editor-wang-config'

export const useEditorWang = (props: EditorWangProps, emit: any) => {
  // 获取配置
  const toolbarConfig = getToolbarConfig(props.toolbarConfig)
  const editorConfig = getEditorConfig(props)

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
    })
  }

  watch(
    () => props.modelValue,
    (val) => {
      nextTick(() => {
        if (editor) editor.setHtml(val)
      })
    }
  )

  onMounted(initEditor)
  onUnmounted(() => {
    if (editor) editor.destroy()
  })

  const onCreated = (editor: IDomEditor) => {
    console.log(props, editor)

    editor.setHtml(props.modelValue)
    const aa = editor.getMenuConfig('fontSize')
    console.log('aa', aa)
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
}
