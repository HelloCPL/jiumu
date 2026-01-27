<template>
  <LazyLoader>
    <IndexEditorWangPreview v-bind="$attrs"></IndexEditorWangPreview>
  </LazyLoader>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import LazyLoader from '@/components/LazyLoader/index.vue'
const IndexEditorWangPreview = defineAsyncComponent(() => import('./index2.vue'))
</script>
