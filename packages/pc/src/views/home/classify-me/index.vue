<!--
  @describe: 我的自定义标签管理页面
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
      <ElFormItem label="标签类型">
        <ElSelect v-model="type" placeholder="请选择标签类型" clearable>
          <ElOption v-for="(item, index) in typeList" :key="index" :value="item.type"></ElOption>
        </ElSelect>
      </ElFormItem>
    </FilterBox>
    <!-- 操作盒子 -->
    <FilterButton :list="btnList" @click="handleBtn"></FilterButton>
    <!-- 列表 -->
    <Table :data="data">
      <ElTableColumn type="selection" width="55" />
      <ElTableColumn type="index" label="序号" width="60">
        <template #default="{ $index }">{{ getIndex($index, pageNo, pageSize) }}</template>
      </ElTableColumn>
      <ElTableColumn prop="sort" label="排序" :width="getPx(60)" />
      <ElTableColumn label="标签" :min-width="getPx(140)">
        <template #default="{ row }">
          <span class="cursor-pointer hover:text-primary" @click="handleShowInfo(row)">
            <GRichText :html="row.label" />
          </span>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="type" label="类型" :min-width="getPx(140)" />
      <ElTableColumn label="更新时间" :width="getPx(150)">
        <template #default="{ row }">
          <span>{{ formatDate(row.updateTime, 'YYYY-MM-DD HH:mm') }}</span>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="terminal" label="创建终端" :width="getPx(100)" />
      <ElTableColumn label="操作" :width="getPx(100)" :fixed="tableFixed">
        <template #default="{ row }">
          <ElButton
            type="primary"
            text
            size="small"
            @click="handleEdit(row)"
            v-permission="'pc:classify:me:update:btn'"
            >修改</ElButton
          >
          <ElButton
            type="danger"
            text
            size="small"
            @click="handleDelete(row)"
            v-permission="'pc:classify:me:delete:btn'"
            >删除</ElButton
          >
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

    <!-- 自定义标签新增 -->
    <ClassifyMeAdd :id="state.id" v-if="state.show" @close="state.show = false" @confirm="handleConfirm">
    </ClassifyMeAdd>
    <!-- 自定义标签详情 -->
    <ClassifyMeInfo :id="state.id" v-if="state.showInfo" @close="state.showInfo = false"></ClassifyMeInfo>
  </div>
</template>

<script lang="ts" setup>
import FilterBox from '@/components/FilterBox/index.vue'
import FilterButton from '@/components/FilterButton/index.vue'
import { useIndex, useIndexInfo } from './hooks/use-index'
import { ElFormItem, ElInput, ElSelect, ElOption, ElTableColumn, ElButton } from 'element-plus'
import Table from '@/components/Table/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import { formatDate } from '@jiumu/utils'
import ClassifyMeAdd from './components/ClassifyMeAdd.vue'
import ClassifyMeInfo from './components/ClassifyMeInfo.vue'
import { getIndex, getPx } from '@/utils/tools'
import { useWidth } from '@/hooks/use-width'

defineOptions({
  name: 'ClassifyMe'
})

const { keyword, type, typeList, getTypeList, pageNo, pageSize, total, data, getDataList, handleReset } =
  useIndex()
const { state, btnList, handleBtn, handleEdit, handleDelete, handleConfirm, handleShowInfo } = useIndexInfo({
  getDataList,
  getTypeList
})
const { tableFixed } = useWidth()
</script>
