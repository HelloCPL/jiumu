<!--
  @describe: html 预览组件
  @author: cpl
  @create: 2022-10-07 20:21:28
-->

<template>
  <div class="bg-white editor-wang-container editor-wang-preview" :id="'editor-preview-' + id"></div>
</template>

<script lang="ts" setup>
import { getRandomId } from '@jiumu/utils'
import { createEditor, IDomEditor } from '@wangeditor/editor'
import { nextTick, onMounted, onUnmounted } from 'vue'
const props = defineProps({
  value: {
    type: String,
    default: ''
  }
})
const id = getRandomId()
let editor: IDomEditor | null = null
// 初始化预览组件
const initEditorPreview = (html: string) => {
  nextTick(() => {
    editor = createEditor({
      selector: `#editor-preview-${id}`,
      html,
      config: {
        readOnly: true,
        autoFocus: false
      }
    })
  })
}
onMounted(() => {
  initEditorPreview(props.value)
})
onUnmounted(() => {
  if (editor) editor.destroy()
})
</script>

<style lang="scss">
@import '@/components/Editor/components/EditorWang/index.scss';
.editor-wang-preview {
  padding: 12px 16px;
  box-sizing: border-box;
}
</style>
