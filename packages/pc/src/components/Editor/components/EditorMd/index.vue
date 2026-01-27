<template>
  <LazyLoader :preload-resources="loadMermaid">
    <IndexEditorMd v-bind="$attrs"></IndexEditorMd>
  </LazyLoader>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import LazyLoader from '@/components/LazyLoader/index.vue'
import { loadMermaid } from '@/utils/scripts'

const IndexEditorMd = defineAsyncComponent(() => import('./index2.vue'))
</script>
