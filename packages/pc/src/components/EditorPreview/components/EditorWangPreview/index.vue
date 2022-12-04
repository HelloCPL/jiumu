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
import { nextTick, onUnmounted, watch } from 'vue'
const props = defineProps({
  value: {
    type: String,
    default: ''
  }
})
let id = getRandomId()
let editor: IDomEditor | null = null

const destroyEditor = () => {
  if (editor) {
    editor.destroy()
    editor = null
    id = getRandomId()
  }
}
// 初始化预览组件
const initEditorPreview = (html: string) => {
  nextTick(() => {
    destroyEditor()
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

watch(
  () => props.value,
  (val) => {
    initEditorPreview(val)
  },
  { immediate: true }
)
onUnmounted(() => {
  destroyEditor
})
</script>

<style lang="scss">
@import '@/components/Editor/components/EditorWang/index.scss';
.editor-wang-preview {
  padding: 12px 16px;
  box-sizing: border-box;
}
</style>
