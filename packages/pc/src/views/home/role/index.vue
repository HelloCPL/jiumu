<!--
  @describe: 角色页面
  @author: cpl
  @create: 2022-07-04 17:20:19
-->

<template>
  <div class="g-container">
    <!-- 筛选框 -->
    <FilterBox>
      <ElFormItem label="关键字">
        <ElInput v-model="keyword"></ElInput>
      </ElFormItem>
      <ElFormItem label="关键字">
        <ElInput v-model="keyword"></ElInput>
      </ElFormItem>
      <ElFormItem label="关键字">
        <ElInput v-model="keyword"></ElInput>
      </ElFormItem>
      <ElFormItem label="关键字">
        <ElInput v-model="keyword"></ElInput>
      </ElFormItem>
      <ElFormItem label="关键字">
        <ElInput v-model="keyword"></ElInput>
      </ElFormItem>
    </FilterBox>
    <!-- 操作盒子 -->
    <FilterButton :list="btnList"></FilterButton>
    <!-- 列表 -->
    <Table :data="data" @cell-click="cellClick">
      <ElTableColumn prop="date" label="Date" />
      <ElTableColumn prop="name" label="Name" />
      <ElTableColumn prop="address" label="Name" />
    </Table>
    <!-- 分页 -->
    <Pagination v-model:pageNo="pageNo" v-model:pageSize="pageSize" :total="total"></Pagination>
  </div>
</template>

<script lang="ts" setup>
import FilterBox from '@/components/FilterBox/index.vue'
import FilterButton from '@/components/FilterButton/index.vue'
import Table from '@/components/Table/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import { ElFormItem, ElInput, ElTableColumn } from 'element-plus'
import { ref, reactive } from 'vue'

const keyword = ref<string>('')
const btnList = [
  { name: '新增', key: 'add', type: 'primary' },
  { name: '导出', key: 'export' }
]
const pageNo = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(100)

const data = reactive([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
])

const cellClick = (a, b) => {
  console.log(a, b)
}
</script>
