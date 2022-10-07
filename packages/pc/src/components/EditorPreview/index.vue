<!--
  @describe: 富文本编辑器预览组件
  @author: cpl
  @create: 2022-10-07 19:48:52
-->

<template>
  <div class="w-full">
    <EditorWangPreview :value="value" v-if="type === '401'"></EditorWangPreview>
    <EditorMdPreview :text="value" v-else-if="type === '402'"></EditorMdPreview>
  </div>
</template>

<script lang="ts" setup>
import EditorMdPreview from './components/EditorMdPreview/index.vue'
import EditorWangPreview from './components/EditorWangPreview/index.vue'
import { editorPreviewProps } from './type'
defineProps(editorPreviewProps)
</script>
