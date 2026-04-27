<!--
  @cpl
  @create 2026-04-12 14:03:22
  @description excel预览 入口
-->

<template>
  <lazy-loader :preload-resources="getJQuery">
    <Preview v-bind="mergeAttrs" />
  </lazy-loader>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, useAttrs } from 'vue'
import LazyLoader from '../../../LazyLoader/index.vue'
import { getJQuery } from './load-jquery'
import { previewProps } from '../type'

defineOptions({
  name: 'ShowFilePreviewExcelComponent'
})

const Preview = defineAsyncComponent(() => import('./preview.vue'))

const props = defineProps(previewProps)

const attrs = useAttrs()
const mergeAttrs = computed(() => {
  return { ...attrs, ...props }
})
</script>
