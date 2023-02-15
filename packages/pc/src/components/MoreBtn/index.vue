<!--
  @describe: 更多按钮
  @author cpl
  @update 2022-07-23 13:49:45
-->

<template>
  <div class="flex items-center justify-center my-2 text-sm">
    <span class="w-14 text-primary-8 cursor-pointer hover:text-primary" v-if="show" @click="$emit('click')">
      <ElIcon size="var(--jm-font-size)">
        <CaretBottom />
      </ElIcon>
      <span class="pl-1">更多</span>
    </span>
    <span class="text-lighter" v-else-if="!show && isMounted">没有更多了...</span>
  </div>
</template>

<script lang="ts" setup>
import { ElIcon } from 'element-plus'
import { CaretBottom } from '@element-plus/icons-vue'
import { moreBtnProps, moreBtnEmits } from './type'
import { ref } from 'vue'

defineProps(moreBtnProps)

defineEmits(moreBtnEmits)

const isMounted = ref<boolean>(false)

setTimeout(() => {
  isMounted.value = true
}, 1000)
</script>

<style lang="scss" scoped></style>
