/**
 * 处理富文本编辑器逻辑
 */
import { IDomEditor, DomEditor, createEditor, createToolbar } from '@wangeditor/editor'
import { ref, onMounted, nextTick } from 'vue'
import { EditorWangProps } from '../type'
import { getToolbarConfig, getEditorConfig } from './handle-editor-wang-config'

export const useEditorWang = (props: EditorWangProps) => {
  // 获取配置
  const toolbarConfig = getToolbarConfig(props.toolbarConfig)
  const editorConfig = getEditorConfig(props.config)

  const refEditor = ref<IDomEditor>()

  const value = ref('')

  const handleCreated = (editor: IDomEditor) => {
    refEditor.value = editor
  }
  onMounted(() => {
    // const editor = createEditor({
    //     selector: '#editor-container',
    //     html: '',
    //     config: editorConfig
    //   })
    //   const toolbar = createToolbar({
    //     editor,
    //     selector: '#toolbar-container',
    //     config: toolbarConfig
    //   })

    // const a = refEditor.value.getAllMenuKeys()
    // console.log('a', a)

    setTimeout(() => {
      const toolbar = DomEditor.getToolbar(refEditor.value)
      const tC = toolbar?.getConfig().toolbarKeys
      console.log('refEditor', refEditor)
      console.log('tC', tC)
    }, 3000)
  })
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

  return {
    toolbarConfig,
    editorConfig,
    refEditor,
    value,
    handleCreated,
    handleChange,
    handleDestoryed,
    handleFocus,
    handleBlur,
    handleCustomAlert,
    handleCustomPaste
  }
}
