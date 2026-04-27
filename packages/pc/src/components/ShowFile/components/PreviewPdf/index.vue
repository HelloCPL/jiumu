<!--
  @cpl
  @create 2026-01-28 21:44:52
  @description pdf 预览
-->

<template>
  <LazyLoader>
    <Preview v-bind="mergeAttrs"></Preview>
  </LazyLoader>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, useAttrs } from 'vue'
import LazyLoader from '../../../LazyLoader/index.vue'
import { previewProps } from '../type'

defineOptions({
  name: 'ShowFilePreviewPdfComponent'
})

const Preview = defineAsyncComponent(() => import('./preview.vue'))

const props = defineProps(previewProps)

const attrs = useAttrs()
const mergeAttrs = computed(() => {
  return { ...attrs, ...props }
})
</script>
