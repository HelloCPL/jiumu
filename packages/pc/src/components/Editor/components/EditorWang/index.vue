<template>
  <LazyLoader>
    <IndexEditorWang v-bind="$attrs"></IndexEditorWang>
  </LazyLoader>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import LazyLoader from '@/components/LazyLoader/index.vue'
const IndexEditorWang = defineAsyncComponent(() => import('./index2.vue'))
</script>
