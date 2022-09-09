<!--
  @describe: 富文本编辑器
  @author: cpl
  @create: 2022-09-04 14:13:08
-->

<template>
  <div class="bg-white flex flex-col editor-wang-container">
    <!-- 工具栏 -->
    <div id="toolbar-container"></div>
    <!-- 编辑器内容 -->
    <div id="editor-container"></div>
  </div>
</template>

<script lang="ts" setup>
import { useEditorWang } from './hooks/use-editor-wang'
import { editorWangProps } from './type'
const props = defineProps(editorWangProps)

useEditorWang(props)
</script>

<style lang="scss">
@import './index.scss';
</style>
