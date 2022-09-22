<!--
  @describe: 富文本编辑器
  @author: cpl
  @create: 2022-09-04 14:13:08
-->

<template>
  <div class="w-full bg-white flex editor-wang-container">
    <!-- 编辑器  -->
    <div class="flex-1">
      <!-- 工具栏 -->
      <div id="toolbar-container"></div>
      <!-- 编辑器内容 -->
      <div id="editor-container"></div>
    </div>
    <!-- 标题 -->
    <TitleCatalog :active="showCatalog" :headers="catalogHeaders" />
  </div>
</template>

<script lang="ts" setup>
import { useEditorWang } from './hooks/use-editor-wang'
import { editorWangProps } from './type'
import TitleCatalog from './components/TitleCatalog.vue'

const props = defineProps(editorWangProps)
const emit = defineEmits(['update:modelValue', 'change', 'blur', 'focus'])

const { showCatalog, catalogHeaders } = useEditorWang(props, emit)
</script>

<style lang="scss">
@import './index.scss';
</style>
