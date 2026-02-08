<template>
  <LazyLoader>
    <IndexEditorWangPreview v-bind="mergeAttrs"></IndexEditorWangPreview>
  </LazyLoader>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, useAttrs } from 'vue'
import LazyLoader from '@/components/LazyLoader/index.vue'
import { editorWangPreviewProps } from './type'
const IndexEditorWangPreview = defineAsyncComponent(() => import('./index2.vue'))

const props = defineProps(editorWangPreviewProps)

const attrs = useAttrs()
const mergeAttrs = computed(() => {
  return { ...attrs, ...props }
})
</script>
