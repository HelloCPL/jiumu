<!--
  @describe: 仅显示人名
  @author: cpl
  @create: 2022-07-29 14:30:29
-->

<template>
  <div class="inline-block w-28">
    <span class="w-full flex justify-center items-center rounded p-1 fill-darker text-light">
      <span class="g-line-1">
        <slot></slot>
      </span>
      <ElIcon class="ml-2 cursor-pointer icon-close" v-if="isDelete">
        <CircleClose />
      </ElIcon>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { ElIcon } from 'element-plus'
import { CircleClose } from '@element-plus/icons-vue'

defineProps({
  isDelete: {
    // 是否可删除
    type: Boolean,
    default: true
  }
})
defineEmits(['delete'])
</script>

<style lang="scss" scoped>
.icon-close {
  color: var(--jm-color-info);

  &:hover {
    color: var(--jm-color-primary);
  }
}
</style>
