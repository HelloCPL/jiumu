<!--
  @cpl
  @create 2024-07-30 22:26:37
  @parameter 卡片
-->

<template>
  <div
    class="pr-4 py-2 bg-white rounded shadow relative"
    :class="[showCheckbox ? 'pl-11' : 'pl-4']"
    v-if="title || subTitle || content"
  >
    <div class="absolute top-2.5 left-4" v-if="showCheckbox">
      <ElCheckbox :model-value="modelValue" :checked="modelValue" @update:model-value="updateModelValue">
      </ElCheckbox>
    </div>
    <slot name="header">
      <div class="py-2 flex items-center">
        <span class="text pr-3">{{ title }}</span>
        <span class="sub-title"></span>
        <span class="text-lighter pl-3" v-if="subTitle">{{ subTitle }}</span>
      </div>
    </slot>
    <slot>
      <div class="text-sm text-lighter pb-2" v-if="content">{{ content }}</div>
    </slot>
    <IconSvg
      name="close"
      :size="20"
      hover-fill="var(--jm-color-primary)"
      class="absolute top-4 right-4"
      @click="handleClose"
      v-if="showClose"
    ></IconSvg>
  </div>
</template>

<script setup lang="ts">
import { cardProps, cardEmits } from './type'
import IconSvg from '../IconSvg/index.vue'
import { ElCheckbox } from 'element-plus'

defineProps(cardProps)
const emit = defineEmits(cardEmits)

const handleClose = () => {
  emit('close')
}

const updateModelValue = (val) => {
  emit('update:modelValue', val)
  emit('change', val)
}
</script>

<style lang="scss" scoped>
.sub-title {
  @apply h-3 relative top-0.5;
  width: 1px;
  background: var(--jm-color-border);
}
</style>
