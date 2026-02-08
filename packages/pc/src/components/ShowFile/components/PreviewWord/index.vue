<!--
  @cpl
  @create 2026-01-28 21:44:52
  @description word 预览
-->

<template>
  <LazyLoader>
    <Preview v-bind="mergeAttrs" @close="(...args) => emit('close', ...args)"></Preview>
  </LazyLoader>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, useAttrs } from 'vue'
import LazyLoader from '@/components/LazyLoader/index.vue'
import { previewWordEmits, previewWordProps } from './type'

const Preview = defineAsyncComponent(() => import('./preview.vue'))

const emit = defineEmits(previewWordEmits)
const props = defineProps(previewWordProps)

const attrs = useAttrs()
const mergeAttrs = computed(() => {
  return { ...attrs, ...props }
})
</script>
