<!--
  @describe: markdown 编辑器
  @author: cpl
  @create: 2022-09-04 14:13:26
-->

<template>
  <!-- <div class="">markdown 编辑器</div> -->
  <v-md-editor
    v-model="value"
    :height="height + 'px'"
    :placeholder="placeholder"
    :toc-nav-position-right="true"
    :include-level="includeLevel"
    :left-toolbar="leftToolbar"
    :right-toolbar="rightToolbar"
    :toolbar="toolbar"
    :disabled-menus="disabledMenus"
    ref="refVMdEditor"
    @change="handleChange"
    @upload-image="handleUploadImage"
    @save="handleSave"
  ></v-md-editor>
</template>

<script lang="ts" setup>
import { useMarkdownInit } from './hooks/use-markdown-init'
import { editorMarkdownProps, editorMarkdownEmits } from './type'
import { useMarkdownIndex } from './hooks/use-markdown-index'

// useMarkdownInit()

const props = defineProps(editorMarkdownProps)
const emit = defineEmits(editorMarkdownEmits)

const { value, refVMdEditor, handleChange, handleSave, handleUploadImage } = useMarkdownIndex(props, emit)
</script>

<style lang="scss">
@import 'index.scss';
@import 'index-theme.scss';
@import 'index-mermaid.scss';
</style>
