<!--
  @describe: markdown 编辑器
  @author: cpl
  @create: 2022-09-04 14:13:26
-->

<template>
  <!-- <div class="">markdown 编辑器</div> -->
  <v-md-editor
    v-model="text"
    :height="height + 'px'"
    :toc-nav-position-right="true"
    :placeholder="placeholder"
  ></v-md-editor>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { editorMarkdownProps } from './type'
// import { useMarkdownIndex } from './hooks/use-markdown-index'
import { handleMarkdownConfig } from './hooks/handle-markdown-config'

const props = defineProps(editorMarkdownProps)
// const { includeLevel, leftToolbar } = handleMarkdownConfig(props)

// const { includeLevel, leftToolbar } = useMarkdownIndex(props)

const text = ref('')
</script>

<style lang="scss" scoped>
@import 'index.scss';
</style>
