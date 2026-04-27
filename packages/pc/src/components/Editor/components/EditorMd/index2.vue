<!--
  @describe: markdown 编辑器
  @author: cpl
  @create: 2022-09-04 14:13:26
-->

<template>
  <v-md-editor
    v-model="value"
    mode="edit"
    :height="height + 'px'"
    :placeholder="placeholder"
    :toc-nav-position-right="true"
    :left-toolbar="leftToolbar"
    :right-toolbar="rightToolbar"
    :toolbar="toolbar"
    ref="refEditor"
    v-bind="customConfig"
    @change="handleChange"
    @upload-image="handleUploadImage"
    @save="handleSave"
  ></v-md-editor>
</template>

<script lang="ts" setup>
import { useMarkdownInit } from './hooks/use-markdown-init'
import { editorMarkdownProps, editorMarkdownEmits } from './type'
import { useMarkdownIndex } from './hooks/use-markdown-index'
import { computed } from 'vue'
import { app } from '@/app'

defineOptions({
  name: 'EditorMdIndex2Component'
})

useMarkdownInit(app)

const props = defineProps(editorMarkdownProps)
const emit = defineEmits(editorMarkdownEmits)

const { value, refEditor, handleChange, handleSave, handleUploadImage } = useMarkdownIndex(props, emit)

const customConfig = computed(() => {
  const obj = {
    includeLevel: [1, 2, 3, 4, 5],
    disabledMenus: []
  }
  if (props.config) {
    Object.assign(obj, props.config)
  }
  return obj
})

defineExpose({
  refEditor
})
</script>

<style lang="scss">
@forward 'index.scss';
@forward 'index-theme.scss';
@forward 'index-mermaid.scss';
</style>
