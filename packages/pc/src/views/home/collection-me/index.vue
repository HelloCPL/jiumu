<!--
  @describe: 我的收藏管理页面
  @author: cpl
  @create: 2022-07-12 14:54:30
-->

<template>
  <div class="g-container">
    <!-- 筛选框 -->
    <FilterBox @search="getDataList(1)" @reset="handleReset">
      <ElFormItem label="类型">
        <SelectType v-model="type" parent-code="500" filter-codes="502,503,504,505,507"></SelectType>
      </ElFormItem>
    </FilterBox>
    <!-- 列表 -->
    <Table :data="data">
      <ElTableColumn type="index" label="序号" width="60">
        <template #default="{ $index }">{{ getIndex($index, pageNo, pageSize) }}</template>
      </ElTableColumn>
      <ElTableColumn label="标题" min-width="180">
        <template #default="{ row }">
          <span class="cursor-pointer hover:text-primary" @click="handleShowInfo(row)">
            <GRichText :html="row.title" />
          </span>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="typeLabel" label="收藏类型" min-width="90" />
      <ElTableColumn label="收藏时间" width="150">
        <template #default="{ row }">
          <span>{{ formatDate(row.createTime, 'YYYY-MM-DD HH:mm') }}</span>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="terminal" label="创建终端" width="90" />
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
import { ElFormItem, ElTableColumn } from 'element-plus'
import { useIndex } from './hooks/use-index'
import Table from '@/components/Table/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import { formatDate } from '@jiumu/utils'
import SelectType from '@/components/SelectType/index.vue'
import { getIndex } from '@/utils/tools'

defineOptions({
  name: 'CollectionMe'
})

const { type, pageNo, pageSize, total, data, getDataList, handleReset, handleShowInfo } = useIndex()
</script>
