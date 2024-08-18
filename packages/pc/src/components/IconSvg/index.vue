<!--
  @cpl
  @create 2024-08-01 00:17:19
  @parameter iconSvg 组件
-->

<template>
  <span :class="{ 'cursor-pointer': hoverFill }" @mouseenter.prevent="mouseenter" @mouseleave="mouseleave"
    style="font-size: 0;">
    <IconSvg :name="name" :width="width" :height="height" :size="size" :fill="fill" v-if="!isHover" :key="'a' + key1">
    </IconSvg>
    <IconSvg :name="name" :width="width" :height="height" :size="size" :fill="hoverFill || fill" v-else
      :key="'b' + key2">
    </IconSvg>
  </span>
</template>

<script setup lang="ts">
import { ref, onBeforeUpdate } from 'vue'
import IconSvg from './index'
import { iconSvgProps } from './type'
import { getRandomId } from '@jiumu/utils'

defineProps(iconSvgProps)

const key1 = ref(getRandomId())
const key2 = ref(getRandomId())
onBeforeUpdate(() => {
  key1.value = getRandomId()
  key2.value = getRandomId()
})

// 鼠标经过
const isHover = ref(false)
const mouseenter = () => {
  isHover.value = true
}
const mouseleave = () => {
  isHover.value = false
}
</script>