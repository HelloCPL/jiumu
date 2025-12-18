<!--
  @describe: 分页
  @author: cpl
  @create: 2022-07-22 10:58:00
-->

<template>
  <div class="w-full px-4 py-3 flex justify-end border-t-1 pagination-container">
    <ElPagination
      v-bind="$attrs"
      :hide-on-single-page="false"
      :current-page="pageNo"
      :page-size="pageSize"
      :background="false"
      :total="total"
      :layout="layout"
      :page-sizes="pageSizes"
      @update:current-page="handlePageNo"
      @update:page-size="handlePageSize"
      @size-change="handleChangeSize"
      @current-change="handleChange"
      @prev-click="handleChange"
      @next-click="handleChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { ElPagination } from 'element-plus'
import { paginationProps, paginationEmits } from './type'
defineOptions({
  inheritAttrs: false
})

defineProps(paginationProps)
const emit = defineEmits(paginationEmits)

const handlePageNo = (page: number) => {
  emit('update:pageNo', page)
}
const handlePageSize = (size: number) => {
  emit('update:pageSize', size)
}
const handleChange = () => {
  emit('change')
}
const handleChangeSize = (val: number) => {
  // emit('update:pageNo', 1)
  emit('update:pageSize', val)
  emit('change')
}
</script>

<style lang="scss">
@forward './index.scss';
</style>
