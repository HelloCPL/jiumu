/**
 * 处理富文本编辑器逻辑
 */
import { IDomEditor, Toolbar, DomEditor, createEditor, createToolbar } from '@wangeditor/editor'
import { ref, onMounted, nextTick } from 'vue'
import { EditorWangProps } from '../type'
import { getToolbarConfig, getEditorConfig } from './handle-editor-wang-config'

export const useEditorWang = (props: EditorWangProps) => {
  // 获取配置
  const toolbarConfig = getToolbarConfig(props.toolbarConfig)
  const editorConfig = getEditorConfig(props.config)

  let editor: IDomEditor | null = null
  let toolbar: Toolbar | null = null

  // 初始化编辑器
  const initEditor = () => {
    nextTick(() => {
      editor = createEditor({
        selector: '#editor-container',
        html: '',
        config: editorConfig
      })
      toolbar = createToolbar({
        editor,
        selector: '#toolbar-container',
        config: toolbarConfig
      })
    })
  }

  onMounted(initEditor)

  const handleCreated = (editor: IDomEditor) => {}
  const handleChange = (editor: IDomEditor) => {
    console.log(editor.getHtml())
  }
  const handleDestoryed = (editor: IDomEditor) => {}
  const handleFocus = (editor: IDomEditor) => {}
  const handleBlur = (editor: IDomEditor) => {}
  const handleCustomAlert = (info: string) => {
    alert(info)
  }
  const handleCustomPaste = (editor: IDomEditor) => {}
}
