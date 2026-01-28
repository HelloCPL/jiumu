<!--
  @cpl
  @create 2026-01-28 21:44:52
  @description pdf 预览
-->

<template>
  <LazyLoader>
    <Preview v-bind="$attrs"></Preview>
  </LazyLoader>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import LazyLoader from '@/components/LazyLoader/index.vue'

const Preview = defineAsyncComponent(() => import('./preview.vue'))
</script>
