<!--
  @describe 路由懒加载组件
  @author cpl
  @create 2023-04-10 10:55:25
-->

<template>
  <slot v-if="isLoad"></slot>
  <!-- 用于元素出现在可视区才加载组件 -->
  <div v-else :style="{ width, height }" ref="box"></div>
</template>

<script lang="ts" setup>
import { lazyLoaderProps } from './type'
import { useIndex } from './index'

defineProps(lazyLoaderProps)

const { isLoad, box } = useIndex()
</script>
