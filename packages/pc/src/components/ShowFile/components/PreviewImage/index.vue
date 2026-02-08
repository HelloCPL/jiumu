<!--
  @cpl
  @create 2026-01-28 21:44:52
  @description 图片 预览
-->

<template>
  <LazyLoader>
    <Preview v-bind="mergeAttrs"></Preview>
  </LazyLoader>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, useAttrs } from 'vue'
import LazyLoader from '@/components/LazyLoader/index.vue'
import { previewImageProps } from './type'

const Preview = defineAsyncComponent(() => import('./preview.vue'))

const props = defineProps(previewImageProps)

const attrs = useAttrs()
const mergeAttrs = computed(() => {
  return { ...attrs, ...props }
})
</script>
