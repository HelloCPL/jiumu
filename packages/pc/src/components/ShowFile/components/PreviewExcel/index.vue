<!--
  @cpl
  @create 2026-01-28 21:44:52
  @description excel 预览
-->

<template>
  <LazyLoader :preload-resources="preload">
    <Preview v-bind="mergeAttrs" @close="(...args) => emit('close', ...args)"></Preview>
  </LazyLoader>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, useAttrs } from 'vue'
import LazyLoader from '@/components/LazyLoader/index.vue'
import { loadLuckyexcel, loadLuckysheetLinks, loadLuckysheetScripts } from '@/utils/scripts'
import { previewExcelEmits, previewExcelProps } from './type'

const Preview = defineAsyncComponent(() => import('./preview.vue'))

const preload = async () => {
  await loadLuckysheetLinks()
  await loadLuckysheetScripts()
  await loadLuckyexcel()
}

const emit = defineEmits(previewExcelEmits)
const props = defineProps(previewExcelProps)

const attrs = useAttrs()
const mergeAttrs = computed(() => {
  return { ...attrs, ...props }
})
</script>
