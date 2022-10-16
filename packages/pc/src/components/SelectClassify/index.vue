<!--
  @describe: 自定义标签选择组件
  @author: cpl
  @create: 2022-10-16 20:17:58
-->

<template>
  <div class="flex flex-wrap select-classify-container">
    <ElTag
      v-for="item in classifyList"
      :key="item.id"
      round
      :type="item.checked ? '' : 'info'"
      class="mr-3 mb-2 cursor-pointer bg-danger"
      @click="handleClick(item)"
    >
      {{ item.label }}
    </ElTag>
    <!-- 新增标签 -->
    <ElButton class="select-classify-btn" size="small" @click="handleShowInput" v-if="!showInput">
      + 新建
    </ElButton>
    <ElInput
      v-model="inputValue"
      class="select-classify-input"
      ref="inputRef"
      size="small"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
      v-else
    ></ElInput>
  </div>
</template>

<script lang="ts" setup>
import { selectClassifyProps, selectClassifyEmits } from './type'
import { useIndex } from './index'
import { ElTag, ElButton, ElInput } from 'element-plus'

const props = defineProps(selectClassifyProps)
const emit = defineEmits(selectClassifyEmits)
const { classifyList, handleClick, showInput, handleShowInput, inputValue, inputRef, handleInputConfirm } =
  useIndex(props, emit)
</script>

<style lang="scss">
.select-classify-container {
  .el-tag:hover {
    background-color: var(--jm-color-primary-50);
    border-color: var(--jm-color-primary-100);
    color: var(--jm-color-primary);
  }

  .select-classify-btn {
    width: 88px;
    border-radius: 12px;
  }

  .select-classify-input {
    width: 88px;
    height: 24px;

    .el-input__wrapper {
      border-radius: 12px;
    }
  }
}
</style>
