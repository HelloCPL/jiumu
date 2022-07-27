<!--
  @describe: 权限管理页面
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
      <ElTableColumn label="code" min-width="150">
        <template #default="{ row }">
          <span class="cursor-pointer hover:text-primary" @click="handleShowInfo(row)">{{ row.code }}</span>
        </template>
      </ElTableColumn>
      <ElTableColumn label="权限" min-width="120">
        <template #default="{ row }">
          <GRichText :text="row.label" />
        </template>
      </ElTableColumn>
      <ElTableColumn prop="updateTime" label="更新时间" min-width="120" />
      <ElTableColumn prop="terminal" label="创建终端" min-width="80" />
      <ElTableColumn prop="remarks" label="备注" min-width="140" />
      <ElTableColumn label="操作" width="200" fixed="right">
        <template #default="{ row }">
          <ElButton type="primary" text size="small" @click="handleEdit(row)">修改</ElButton>
          <ElButton type="danger" text size="small" @click="handleDelete(row)">删除</ElButton>
          <ElButton type="primary" text size="small">查看用户</ElButton>
          <ElButton type="primary" text size="small">角色关联</ElButton>
        </template>
      </ElTableColumn>
    </Table>
    <!-- 分页 -->

    <Pagination
      v-model:pageNo="pageNo"
      v-model:pageSize="pageSize"
      :total="total"
      @change="getDataList"
    ></Pagination>
    <!-- 权限新增或编辑 -->
    <PermissionAdd :id="state.id" v-if="state.show" @close="state.show = false" @confirm="handleConfirm">
    </PermissionAdd>
    <!-- 权限信息 -->
    <PermissionInfo :id="state.id" v-if="state.showInfo" @close="state.showInfo = false"> </PermissionInfo>
  </div>
</template>

<script lang="ts" setup>
import FilterBox from '@/components/FilterBox/index.vue'
import FilterButton from '@/components/FilterButton/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import Table from '@/components/Table/index.vue'
import { ElFormItem, ElInput, ElTableColumn, ElButton } from 'element-plus'
import { useIndex, useIndexInfo } from './hooks/use-index'
import PermissionAdd from './components/PermissionAdd.vue'
import PermissionInfo from './components/PermissionInfo.vue'

defineOptions({
  name: 'Permission'
})

const { keyword, btnList, pageNo, pageSize, total, data, getDataList } = useIndex()

// 控制新增/编辑等逻辑
const { state, handleBtn, handleShowInfo, handleEdit, handleDelete, handleConfirm } = useIndexInfo({
  getDataList
})
</script>
