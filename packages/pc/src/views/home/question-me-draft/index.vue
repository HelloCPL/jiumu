<!--
  @describe: 我的问答草稿箱管理页面
  @author: cpl
  @create: 2022-07-12 14:54:30
-->

<template>
  <div class="g-container">
    <!-- 筛选框 -->
    <FilterBox @search="getDataList(1)" @reset="handleReset">
      <ElFormItem label="关键字">
        <ElInput v-model="keyword" type="text" clearable placeholder="请输入关键字"></ElInput>
      </ElFormItem>
      <ElFormItem label="标签">
        <SelectType v-model="classify" type="classify" parent-code="questionClassify"></SelectType>
      </ElFormItem>
    </FilterBox>
    <!-- 操作盒子 -->
    <FilterButton :list="btnList" @click="handleBtn"></FilterButton>
    <!-- 列表 -->
    <Table :data="data">
      <ElTableColumn prop="sort" label="排序" width="60" />
      <ElTableColumn label="标题" :min-width="getPx(150)">
        <template #default="{ row }">
          <span class="cursor-pointer hover:text-primary" @click="handleShowInfo(row)">
            <GRichText :html="row.title" />
          </span>
        </template>
      </ElTableColumn>
      <ElTableColumn label="标签" :min-width="getPx(100)">
        <template #default="{ row }">
          <span v-if="row.classify">
            <span v-for="(item, index) in row.classify" :key="item.id">
              {{ index === 0 ? '' : '、' }}
              {{ item.label }}
            </span>
          </span>
        </template>
      </ElTableColumn>
      <ElTableColumn label="更新时间" :width="getPx(150)">
        <template #default="{ row }">
          <span>{{ formatDate(row.updateTime, 'YYYY-MM-DD HH:mm') }}</span>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="terminal" label="创建终端" :width="getPx(90)" />
      <ElTableColumn label="操作" :width="getPx(100)" fixed="right">
        <template #default="{ row }">
          <ElButton type="primary" text size="small" @click="handleEdit(row)">修改</ElButton>
          <ElButton type="danger" text size="small" @click="handleDelete(row)">删除</ElButton>
        </template>
      </ElTableColumn>
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
import { ElFormItem, ElInput, ElTableColumn, ElButton } from 'element-plus'
import SelectType from '@/components/SelectType/index.vue'
import { useIndex } from './hooks/use-index'
import { useIndexInfo } from '../question-me/hooks/use-index'
import FilterButton from '@/components/FilterButton/index.vue'
import Table from '@/components/Table/index.vue'
import { formatDate } from '@jiumu/utils'
import Pagination from '@/components/Pagination/index.vue'
import { getPx } from '@/utils/tools'

defineOptions({
  name: 'QuestionMeDraft'
})

const { keyword, classify, pageNo, pageSize, total, data, getDataList, handleReset } = useIndex()

const { btnList, handleBtn, handleEdit, handleDelete, handleShowInfo } = useIndexInfo({
  getDataList
})
</script>
