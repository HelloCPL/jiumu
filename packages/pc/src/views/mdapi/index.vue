<!--
  @describe marddown api 文档
  @author cpl
  @create 2023-03-29 14:49:25
-->

<template>
  <div class="w-full min-h-screen bg-white pr-6 mdapi-container">
    <!-- 目录 -->
    <div class="h-screen fixed left-0 top-0 border-r-1 border-lighter shadow-lg pt-12 mdapi-aside">
      <div
        class="absolute top-0 left-0 w-full h-12 text-xl border-b-1 border-lighter flex justify-center items-center"
      >
        API 文档
      </div>
      <div class="w-full h-full pt-2 g-scroll-y-0">
        <div
          class="p-2 pl-6 cursor-pointer hover:bg hover:text-primary g-line-1"
          :class="{ 'mdapi-active': targetIndex === index }"
          v-for="(item, index) in list"
          :key="index"
          @click="change(index)"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
    <EditorPreview type="402" :value="list[targetIndex].value"></EditorPreview>
  </div>
</template>

<script lang="ts" setup>
import EditorPreview from '@/components/EditorPreview/index.vue'
import { useIndex } from './hooks/use-index'

const { list, targetIndex, change } = useIndex()
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
