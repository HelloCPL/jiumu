<!--
  @describe: 搜索输入框盒子
  @author: cpl
  @create: 2022-07-29 17:18:42
-->

<template>
  <ElInput
    :type="type"
    :placeholder="placeholder"
    :size="size"
    :model-value="modelValue"
    :clearable="clearable"
    @update:model-value="$emit('update:model-value', $event)"
    @keyup.enter.native="$emit('search', modelValue)"
  >
    <template #append>
      <ElButton :icon="Search" @click="$emit('search', modelValue)"></ElButton>
    </template>
  </ElInput>
</template>

<script lang="ts" setup>
import { ElInput, ElButton } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { searchProps, searchEmits } from './type'

defineProps(searchProps)
defineEmits(searchEmits)
</script>

<style lang="scss">
html {
  .el-input-group--append .el-button {
    padding-top: 0;
    padding-bottom: 0;
    background-color: var(--jm-color-primary) !important;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;

    .el-icon {
      color: var(--jm-color-basic-white);
    }
  }
}
</style>
