<!--
  @describe: 富文本编辑器预览组件
  @author: cpl
  @create: 2022-10-07 19:48:52
-->

<template>
  <div class="w-full">
    <EditorWangPreview
      :value="value"
      :is-show-title="isShowTitle"
      v-bind="$attrs"
      v-if="type === '401'"
    ></EditorWangPreview>
    <EditorMdPreview
      :text="value"
      :is-show-title="isShowTitle"
      v-bind="$attrs"
      v-else-if="type === '402'"
    ></EditorMdPreview>
    <EditorAcePreview
      :value="value"
      :is-show-title="isShowTitle"
      v-bind="$attrs"
      v-else-if="type === '403'"
    ></EditorAcePreview>
  </div>
</template>

<script lang="ts" setup>
import { editorPreviewProps } from './type'
import EditorMdPreview from './components/EditorMdPreview/index.vue'
import EditorWangPreview from './components/EditorWangPreview/index.vue'
import EditorAcePreview from './components/EditorAcePreview/index.vue'

defineOptions({
  name: 'EditorPreviewComponent'
})

defineProps(editorPreviewProps)
</script>
