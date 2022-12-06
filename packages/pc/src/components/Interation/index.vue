<!--
  @describe: 点赞 收藏
  @author: cpl
  @create: 2022-12-06 16:43:18
-->

<template>
  <div>
    <ElButton color="var(--jm-success-500)">
      <ElIcon class="text-color-success-500"><Pointer /></ElIcon>
      <span>点赞</span>
    </ElButton>
    <ElButton type="primary">
      <ElIcon><Star /></ElIcon>
      <span>收藏</span>
    </ElButton>
  </div>
</template>

<script lang="ts" setup>
import { ElButton, ElIcon } from 'element-plus'
import { Star, Pointer } from '@element-plus/icons-vue'
import { interationProps, interationEmits } from './type'

const props = defineProps(interationProps)
const emit = defineEmits(interationEmits)
</script>
