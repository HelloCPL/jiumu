<!--
  @cpl
  @create 2026-01-28 21:44:52
  @description pdf 预览
-->

<template>
  <LazyLoader>
    <Preview v-bind="mergeAttrs" @close="(...args) => emit('close', ...args)"></Preview>
  </LazyLoader>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, useAttrs } from 'vue'
import LazyLoader from '@/components/LazyLoader/index.vue'
import { previewPdfEmit, previewPdfProps } from './type'

const Preview = defineAsyncComponent(() => import('./preview.vue'))

const emit = defineEmits(previewPdfEmit)
const props = defineProps(previewPdfProps)

const attrs = useAttrs()
const mergeAttrs = computed(() => {
  return { ...attrs, ...props }
})
</script>
