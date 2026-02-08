<!--
  @cpl
  @create 2026-01-28 21:44:52
  @description md 预览
-->

<template>
  <LazyLoader>
    <Preview v-bind="mergeAttrs" @close="(...args) => emit('close', ...args)"></Preview>
  </LazyLoader>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, useAttrs } from 'vue'
import LazyLoader from '@/components/LazyLoader/index.vue'
import { previewMdEmits, previewMdProps } from './type'

const Preview = defineAsyncComponent(() => import('./preview.vue'))

const emit = defineEmits(previewMdEmits)
const props = defineProps(previewMdProps)

const attrs = useAttrs()
const mergeAttrs = computed(() => {
  return { ...attrs, ...props }
})
</script>
