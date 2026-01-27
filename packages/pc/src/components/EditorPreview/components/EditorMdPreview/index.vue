<template>
  <LazyLoader :preload-resources="loadMermaid">
    <IndexEditorMdPreview v-bind="$attrs"></IndexEditorMdPreview>
  </LazyLoader>
</template>

<script setup lang="ts">
import LazyLoader from '@/components/LazyLoader/index.vue'
import { loadMermaid } from '@/utils/scripts'
import { defineAsyncComponent } from 'vue'

const IndexEditorMdPreview = defineAsyncComponent(() => import('./preview.vue'))
</script>
