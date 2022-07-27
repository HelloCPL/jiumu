<!--
  @describe: 分页
  @author: cpl
  @create: 2022-07-22 10:58:00
-->

<template>
  <div class="w-full px-4 py-3 flex justify-end border-b-1 pagination-container">
    <ElPagination v-bind="$attrs" :hide-on-single-page="false" :current-page="pageNo"
      :page-size="pageSize" :background="false" :total="total" :layout="layout"
      :page-sizes="pageSizes" @update:current-page="handlePageNo" @update:page-size="handlePageSize"
      @size-change="$emit('change')" @current-change="$emit('change')" @prev-click="$emit('change')"
      @next-click="$emit('change')" />
  </div>
</template>

<script lang="ts" setup>
import { ElPagination } from 'element-plus'
import { paginationProps } from './type'
defineOptions({
  inheritAttrs: false
})

const emit = defineEmits(['update:pageNo', 'update:pageSize', 'change'])
const handlePageNo = (page: any) => {
  emit('update:pageNo', page)
}
const handlePageSize = (size: any) => {
  emit('update:pageSize', size)
}

defineProps(paginationProps)

</script>

<style lang="scss">
@import './index.scss';
</style>
