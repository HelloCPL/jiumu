<!--
  @describe: 文本编辑器
  @author: cpl
  @create: 2022-09-04 13:59:40
-->

<template>
  <EditorWang :toolbar-config="{}" v-if="type === '401'"></EditorWang>
  <EditorMd v-else></EditorMd>
</template>

<script lang="ts" setup>
import EditorWang from './components/EditorWang/index.vue'
import EditorMd from './components/EditorMd.vue'
import { editorProps } from './type'
defineProps(editorProps)
</script>
