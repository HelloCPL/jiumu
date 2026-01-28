<!--
  @cpl
  @create 2026-01-28 21:44:52
  @description excel 预览
-->

<template>
  <LazyLoader :preload-resources="preload">
    <Preview v-bind="$attrs"></Preview>
  </LazyLoader>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import LazyLoader from '@/components/LazyLoader/index.vue'
import { loadLuckyexcel, loadLuckysheetLinks, loadLuckysheetScripts } from '@/utils/scripts'

const Preview = defineAsyncComponent(() => import('./preview.vue'))

const preload = async () => {
  await loadLuckysheetLinks()
  await loadLuckysheetScripts()
  await loadLuckyexcel()
}
</script>
