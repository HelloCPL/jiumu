<template>
  <LazyLoader :preload-resources="loadMermaid">
    <IndexEditorMdPreview v-bind="mergeAttrs"></IndexEditorMdPreview>
  </LazyLoader>
</template>

<script setup lang="ts">
import LazyLoader from '@/components/LazyLoader/index.vue'
import { loadMermaid } from '@/utils/scripts'
import { computed, defineAsyncComponent, useAttrs } from 'vue'
import { editorMdPreviewProps } from './type'

const IndexEditorMdPreview = defineAsyncComponent(() => import('./preview.vue'))

const props = defineProps(editorMdPreviewProps)
const attrs = useAttrs()
const mergeAttrs = computed(() => {
  return { ...attrs, ...props }
})
</script>
