<!--
  @cpl
  @create 2026-04-13 22:59:31
  @description 普通文本文件 预览入口
-->

<template>
  <LazyLoader>
    <Preview v-bind="mergeAttrs"></Preview>
  </LazyLoader>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, useAttrs } from 'vue'
import LazyLoader from '../../../LazyLoader/index.vue'
import { previewCommonProps } from '../type'

defineOptions({
  name: 'ShowFilePreviewCommonComponent'
})

const Preview = defineAsyncComponent(() => import('./preview.vue'))

const props = defineProps(previewCommonProps)

const attrs = useAttrs()
const mergeAttrs = computed(() => {
  return { ...attrs, ...props }
})
</script>
