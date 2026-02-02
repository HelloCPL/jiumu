<!--
  @describe: 筛选容器
  @author: cpl
  @create: 2022-07-21 10:07:07
-->

<template>
  <div class="w-full relative border-b-1 filter-box-container" :class="{ 'pt-12': isFixedFilter }">
    <div
      class="w-full pr-4 flex filter-box-content"
      :class="{
        'justify-between': length > minLength,
        'overflow-hidden': length > minLength && height > 62
      }"
      :style="{ height: length > minLength && height > 62 && isShow ? height + 'px' : '60px' }"
    >
      <!-- 筛选项容器 -->
      <ElForm
        label-position="right"
        :label-width="83"
        :inline="true"
        class="shrink-0 overflow-hidden"
        :class="{ 'flex-1': length > minLength }"
        @submit.native.prevent
        @keydown.enter="$emit('search')"
      >
        <div class="w-full" ref="box">
          <slot></slot>
        </div>
      </ElForm>

      <!-- 筛选右侧按钮 -->
      <div
        class="pt-0.5 h-10 flex"
        :style="{ width: filterBtnWidth + 'px' }"
        :class="{ absolute: isFixedFilter, 'top-4': isFixedFilter, 'left-8': isFixedFilter }"
      >
        <ElButton :icon="Search" type="primary" @click="$emit('search')">搜索</ElButton>
        <ElButton :icon="Brush" v-if="length > 1" @click="$emit('reset')">重置</ElButton>
        <span
          class="ml-4 h-8 flex items-center cursor-pointer text-lighter hover:text-primary"
          v-if="length > minLength && height > 62"
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
import { ref, nextTick, onMounted, onUpdated, onUnmounted, computed } from 'vue'
import { filterBoxProps, filterBoxEmits } from './type'
import { useWidth } from '@/hooks/use-width'
import { getPx } from '@/utils/tools'

const props = defineProps(filterBoxProps)
defineEmits(filterBoxEmits)

const box = ref<HTMLElement>()
const length = ref<number>(0)
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

const { width } = useWidth()

const filterBtnWidth = computed(() => {
  const w1 = 88
  let w2 = 0
  if (length.value > 1) {
    w2 = 92
  }
  let w3 = 0
  if (length.value > props.minLength && height.value > 62) {
    w3 = 58
  }
  return getPx(w1 + w2 + w3)
})

const isFixedFilter = computed(() => {
  const flag1 = width.value <= 768 && length.value > 1
  if (flag1 || width.value < 440) return true
  return false
})
</script>

<style lang="scss">
.filter-box-container {
  .el-form--inline .el-form-item {
    margin-right: 24px;
    margin-bottom: 14px;
    width: 280px;
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
