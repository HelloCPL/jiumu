<!--
  @describe: 筛选容器
  @author: cpl
  @create: 2022-07-21 10:07:07
-->

<template>
  <div class="w-full filter-box-container">
    <div
      class="w-full pr-4 flex border-b-1 filter-box-content"
      :class="{ 'justify-between': length > 2, 'filter-box-content-active': length > 2 && height > 62 }"
      :style="{ height: length > 2 && height > 62 && isShow ? height + 'px' : '60px' }"
    >
      <!-- 筛选项容器 -->
      <ElForm
        label-position="right"
        :label-width="83"
        :inline="true"
        class="flex-shrink-0"
        :class="{ 'flex-1': length > 2 }"
        @submit.native.prevent
      >
        <div class="w-full" ref="box">
          <slot></slot>
        </div>
      </ElForm>
      <!-- 筛选右侧按钮 -->
      <div class="pl-4 pt-0.5 flex flex-shrink0">
        <ElButton :icon="Search" type="primary" @click="$emit('search')">搜索</ElButton>
        <ElButton :icon="Brush" v-if="length > 1" @click="$emit('reset')">重置</ElButton>
        <span
          class="ml-4 h-8 flex items-center cursor-pointer text-lighter hover:text-primary"
          v-if="length > 2 && height > 62"
          @click="isShow = !isShow"
        >
          <ElIcon size="var(--jm-font-size-medium)">
            <MoreFilled v-if="isShow" />
            <More v-else />
          </ElIcon>
          <span class="pl-1 text-sm">{{ isShow ? '收起' : '更多' }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElForm, ElButton, ElIcon } from 'element-plus'
import { Search, Brush, More, MoreFilled } from '@element-plus/icons-vue'
import { ref, nextTick, onMounted, onUpdated, onUnmounted } from 'vue'
import { filterBoxEmits } from './type'

defineEmits(filterBoxEmits)

const box = ref<HTMLElement>()
const length = ref<number>(2)
const height = ref<number>(46 + 15)
const isShow = ref<boolean>(false)

const setLength = () => {
  nextTick(() => {
    length.value = (box.value as HTMLElement).children.length
    height.value = (box.value as HTMLElement).offsetHeight + 15
  })
}
onMounted(setLength)
onUpdated(setLength)
// 监听窗口变化
onMounted(() => {
  window.addEventListener('resize', setLength)
})
onUnmounted(() => {
  window.removeEventListener('resize', setLength)
})
</script>

<style lang="scss">
.filter-box-container {
  .el-form--inline .el-form-item {
    margin-right: 24px;
    margin-bottom: 14px;
    min-width: 280px;
  }

  .el-form-item__label {
    padding-right: 10px;
  }
}
</style>

<style lang="scss" scoped>
.filter-box-container {
  .filter-box-content {
    transition: height 0.5s;
    padding-top: 14px;
  }

  .filter-box-content-active {
    overflow: hidden;
  }
}
</style>
