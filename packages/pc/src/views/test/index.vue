<template>
  <div class="box">
    <FilterBox @click="handleClick">
      <ElFormItem label="哈哈">
        <ElInput></ElInput>
      </ElFormItem>
      <ElFormItem label="哈哈哈哈哈">
        <ElInput></ElInput>
      </ElFormItem>
      <ElFormItem label="哈哈哈哈">
        <ElInput></ElInput>
      </ElFormItem>
      <ElFormItem label="哈哈哈哈哈哈">
        <ElInput></ElInput>
      </ElFormItem>
      <ElFormItem label="哈哈哈">
        <ElInput></ElInput>
      </ElFormItem>
      <ElFormItem label="哈哈哈">
        <ElInput></ElInput>
      </ElFormItem>
      <ElFormItem label="哈哈哈">
        <ElInput></ElInput>
      </ElFormItem>
      <ElFormItem label="哈哈哈">
        <ElInput></ElInput>
      </ElFormItem>
    </FilterBox>
  </div>
</template>

<script setup lang="ts">
import FilterBox from '@/components/FilterBox/index.vue'
import { ElForm, ElFormItem, ElInput} from 'element-plus'
import {ref} from 'vue'

const handleClick = (item) => {
  console.log(item);
}

</script>

<style lang="scss" scoped>
</style>