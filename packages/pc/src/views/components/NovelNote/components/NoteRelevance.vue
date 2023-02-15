<!--
  @describe: 笔记关联
  @author: cpl
  @create: 2023-02-11 01:13:09
-->

<template>
  <Dialog :show-footer="false">
    <!-- 自定义头部 -->
    <template #header>
      <ElRow class="h-12">
        <ElCol
          :span="12"
          class="flex items-center pl-4 cursor-pointer border-r-1 text-lg"
          :class="{ 'role-permission-active': active === 0 }"
          @click="handleActive(0)"
        >
          <span class="g-line-1">已关联笔记</span>
        </ElCol>
        <ElCol
          :span="12"
          class="flex items-center pl-4 cursor-pointer text-lg"
          :class="{ 'role-permission-active': active === 1 }"
          @click="handleActive(1)"
        >
          可关联笔记
        </ElCol>
      </ElRow>
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import Dialog from '@/components/Dialog/index.vue'
import { useRelevance } from '../hooks/use-relevance'
import { novelNoteRelevanceProps, novelNoteEmit } from '../type'

const props = defineProps(novelNoteRelevanceProps)
const emit = defineEmits(novelNoteEmit)

const {} = useRelevance(props, emit)
</script>
