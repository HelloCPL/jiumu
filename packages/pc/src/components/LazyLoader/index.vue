<!--
  @describe 路由懒加载组件
  @author cpl
  @create 2023-04-10 10:55:25
-->

<template>
  <slot v-if="isLoaded" :loading="isLoading"></slot>
  <slot name="loading" v-else-if="isLoading && showLoading">
    <LazyLoading></LazyLoading>
  </slot>
  <div v-if="!isLoaded" class="lazy-oberver" ref="observerRef"></div>
</template>

<script lang="ts" setup>
import { lazyLoaderProps } from './type'
import { useIndex } from './index'
import LazyLoading from './components/loading.vue'

const props = defineProps(lazyLoaderProps)

const { isLoaded, isLoading, observerRef, loadContent, reload } = useIndex(props)

defineExpose({
  isLoaded,
  isLoading,
  loadContent,
  reload
})
</script>

<style scoped lang="scss">
.lazy-oberver {
  min-width: 1px;
  min-height: 1px;
}
</style>
