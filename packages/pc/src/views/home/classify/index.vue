<!--
  @describe: 所有自定义标签管理页面
  @author: cpl
  @create: 2022-07-12 14:54:30
-->

<template>
  <div class="g-container">
    <!-- 筛选框 -->
    <FilterBox @search="getDataList">
      <ElFormItem label="关键字">
        <ElInput v-model="keyword" type="text" clearable placeholder="请输入关键字"></ElInput>
      </ElFormItem>
    </FilterBox>
    <!-- 操作盒子 -->
    <FilterButton :list="btnList" @click="handleBtn"></FilterButton>
    <!-- 列表 -->
    <Table :data="data">
      <ElTableColumn type="selection" width="55" />
      <ElTableColumn prop="sort" label="排序" width="60" />
      <ElTableColumn label="描述" min-width="140">
        <template #default="{ row }">
          <GRichText :html="row.label" />
        </template>
      </ElTableColumn>
      <ElTableColumn prop="type" label="类型" min-width="120" />
      <ElTableColumn label="创建者" min-width="100">
        <template #default="{ row }">
          <span :class="{ 'text-success-500': row.isSelf === '1' }">{{ row.createUserName }}</span>
        </template>
      </ElTableColumn>
      <ElTableColumn label="更新时间" width="150">
        <template #default="{ row }">
          <span>{{ formatDate(row.updateTime, 'YYYY-MM-DD HH:mm') }}</span>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="terminal" label="创建终端" width="120" />
    </Table>
    <!-- 分页 -->
    <Pagination
      v-model:page-no="pageNo"
      v-model:page-size="pageSize"
      :total="total"
      @change="getDataList"
    ></Pagination>
  </div>
</template>

<script lang="ts" setup>
import FilterBox from '@/components/FilterBox/index.vue'
import FilterButton from '@/components/FilterButton/index.vue'
import { ElFormItem, ElInput, ElTableColumn } from 'element-plus'
import { useIndex, useIndexInfo } from './hooks/use-index'
import Table from '@/components/Table/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import { formatDate } from '@jiumu/utils'

defineOptions({
  name: 'Classify'
})

const { pageNo, pageSize, total, keyword, data, getDataList } = useIndex()
const { btnList, handleBtn } = useIndexInfo({})
</script>
