<template>
  <LazyLoader :preload-resources="getMermaid">
    <IndexEditorMdPreview v-bind="mergeAttrs"></IndexEditorMdPreview>
  </LazyLoader>
</template>

<script setup lang="ts">
import LazyLoader from '../../../LazyLoader/index.vue'
import { computed, defineAsyncComponent, useAttrs } from 'vue'
import { editorMdPreviewProps } from './type'
import { getMermaid } from '../../../Editor/components/EditorMd/hooks/load-mermaid'

const IndexEditorMdPreview = defineAsyncComponent(() => import('./index2.vue'))

defineOptions({
  name: 'EditorMdPreviewComponent'
})

const props = defineProps(editorMdPreviewProps)
const attrs = useAttrs()
const mergeAttrs = computed(() => {
  return { ...attrs, ...props }
})
</script>
