<!--
  @describe: 标题目录预览
  @author: cpl
  @create: 2022-09-22 16:04:04
-->

<template>
  <div
    class="flex-shrink-0 overflow-hidden bg-danger-100"
    :style="{ width: catalog.width, opacity: catalog.opacity }"
  >
    <div class="h-full g-scroll-y" style="width: 220px">哈哈哈</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  active: {
    // 是否激活状态
    type: Boolean,
    default: false
  },
  headers: {
    // 标题列表
    type: Array,
    default: () => []
  }
})

const catalog = ref({
  width: 0,
  opacity: 0
})

watch(
  () => props.active,
  (val) => {
    if (val) {
      gsap.to(catalog.value, {
        width: 200,
        opacity: 1
      })
    } else {
      gsap.to(catalog.value, {
        width: 0,
        opacity: 0
      })
    }
  }
)
</script>

<style lang="scss" scoped></style>
