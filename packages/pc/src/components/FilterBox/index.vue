<!--
  @describe: 筛选容器
  @author: cpl
  @create: 2022-07-21 10:07:07
-->

<template>
  <div class="w-full">
    <p class="px-4 py-3 border-b-1">筛选</p>
    <div class="w-full px-4 py-3 flex border-b-1" :class="{ 'justify-between': length > 2 }">
      <ElForm
        label-position="right"
        :label-width="85"
        :inline="true"
        class="flex-shrink-0"
        :class="{ 'flex-1': length > 2 }"
      >
        <div class="w-full flex-shrink-0" ref="box">
          <slot></slot>
        </div>
      </ElForm>
      <div class="pl-4 flex-shrink0">
        <ElButton :icon="Search" type="primary">搜索</ElButton>
        <ElButton :icon="Brush">重置</ElButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElForm, ElButton } from 'element-plus'
import { Search, Brush } from '@element-plus/icons-vue'
import { ref, onMounted, onUpdated } from 'vue'

const box = ref<HTMLElement>()
const length = ref<number>(3)

const setLength = () => {
  length.value = (box.value as HTMLElement).children.length
}
onMounted(setLength)
onUpdated(setLength)
</script>

<style>
.el-form-item__label {
  background: red;
  /* padding-right: 0; */
}
</style>
