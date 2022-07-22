<!--
  @describe: table 表格盒子
  @author: cpl
  @create: 2022-07-22 17:40:03
-->

<template>
  <div style="height: 300px">
    <ElTable v-bind="$attrs" :height="100">
      <slot></slot>
      <template #append>
        <slot name="append"></slot>
      </template>
      <template #empty>
        <slot name="empty"></slot>
      </template>
    </ElTable>
  </div>
</template>

<script lang="ts" setup>
import { ElTable } from 'element-plus'
defineOptions({
  inheritAttrs: false
})
</script>
