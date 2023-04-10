<!--
  @describe: markdown 预览
  @author: cpl
  @create: 2022-10-07 19:49:51
-->

<template>
  <v-md-preview :text="text" class="bg-white"></v-md-preview>
</template>

<script lang="ts" setup>
import { useMarkdownInit } from '@/components/Editor/components/EditorMd/hooks/use-markdown-init'

useMarkdownInit()

defineProps({
  text: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss">
@import '@/components/Editor/components/EditorMd/index.scss';
</style>
