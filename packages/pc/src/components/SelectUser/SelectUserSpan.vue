<!--
  @describe: 仅显示人名
  @author: cpl
  @create: 2022-07-29 14:30:29
-->

<template>
  <div class="inline-block max-w- py-1 px-2 rounded p-1 fill-darker text-light user-span">
    <span class="flex justify-center items-center">
      <span class="g-line-1">
        <slot></slot>
      </span>
      <ElIcon class="ml-2 cursor-pointer icon-close" v-if="isDelete" @click="$emit('delete')">
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
.user-span {
  max-width: 180px;

  .icon-close {
    color: var(--jm-color-info);

    &:hover {
      color: var(--jm-color-primary);
    }
  }
}
</style>
