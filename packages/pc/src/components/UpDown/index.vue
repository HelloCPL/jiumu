<!--
  @describe: 展开收起组件
  @author cpl
  @update 2022-07-30 15:22:22
-->

<template>
  <div class="w-full">
    <div
      class="duration-500"
      :class="{ 'overflow-hidden': height > minHeight }"
      :style="{
        height: height > minHeight ? (modelValue ? height + 'px' : minHeight + 'px') : 'auto'
      }"
    >
      <div ref="box">
        <slot></slot>
      </div>
    </div>

    <div
      class="w-full h-8 flex items-center justify-center relative"
      :class="{ 'updown-btn': !modelValue }"
      v-if="height > minHeight"
    >
      <span class="text-sm text-primary flex items-center cursor-pointer" @click="handleClick">
        <ElIcon class="duration-500" :class="{ 'rotate-180': modelValue }"><ArrowDownBold /></ElIcon>
        <span class="pl-1">{{ modelValue ? '收起' : '展开' }}</span>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { upDownProps } from './type'
import { ref } from 'vue'
import { useElementSize } from '@vueuse/core'
import { ElIcon } from 'element-plus'
import { ArrowDownBold } from '@element-plus/icons-vue'

const props = defineProps(upDownProps)
const emit = defineEmits(['update:modelValue', 'change'])

const box = ref<HTMLElement>()
const { height } = useElementSize(box)

const handleClick = () => {
  emit('update:modelValue', !props.modelValue)
  emit('change', !props.modelValue)
}
</script>

<style lang="scss" scoped>
.updown-btn::before {
  content: '';
  width: 100%;
  height: 14px;
  position: absolute;
  left: 0;
  top: -14px;
  background: -webkit-linear-gradient(to top, var(--jm-color-white-2), var(--jm-color-white-1));
  background: -o-linear-gradient(to top, var(--jm-color-white-2), var(--jm-color-white-1));
  background: -moz-linear-gradient(to top, var(--jm-color-white-2), var(--jm-color-white-1));
  background: linear-gradient(to top, var(--jm-color-white-2), var(--jm-color-white-1));
}
</style>
