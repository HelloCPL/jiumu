<!--
  @describe: 角色页面
  @author: cpl
  @create: 2022-07-04 17:20:19
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
      <ElTableColumn label="code" min-width="100">
        <template #default="{ row }">
          <span class="cursor-pointer hover:text-primary" @click="handleShowInfo(row)">{{ row.code }}</span>
        </template>
      </ElTableColumn>
      <ElTableColumn label="角色" min-width="120">
        <template #default="{ row }">
          <GRichText :html="row.label" />
        </template>
      </ElTableColumn>
      <ElTableColumn prop="updateTime" label="更新时间" min-width="120" />
      <ElTableColumn prop="terminal" label="创建终端" min-width="80" />
      <ElTableColumn prop="remarks" label="备注" min-width="140" />
      <ElTableColumn label="操作" width="255" fixed="right">
        <template #default="{ row }">
          <ElButton type="primary" text size="small" @click="handleEdit(row)">修改</ElButton>
          <ElButton type="danger" text size="small" @click="handleDelete(row)">删除</ElButton>
          <ElButton type="primary" text size="small" @click="handleShowRoleInfo(row)">用户关联</ElButton>
          <ElButton type="primary" text size="small" @click="handleShowRoleMenu(row)">菜单关联</ElButton>
          <ElButton type="primary" text size="small" @click="handleShowRolePermission(row)"
            >权限关联</ElButton
          >
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

    <!-- 角色新增或编辑 -->
    <RoleAdd :id="state.id" v-if="state.show" @close="state.show = false" @confirm="handleConfirm"> </RoleAdd>
    <!-- 角色信息 -->
    <RoleInfo :id="state.id" v-if="state.showInfo" @close="state.showInfo = false"></RoleInfo>
    <!-- 角色-用户关联 -->
    <RoleUser :id="state.id" v-if="state.showRoleUser" @close="state.showRoleUser = false"></RoleUser>
    <!-- 角色-用户关联 -->
    <RoleMenu :id="state.id" v-if="state.showRoleMenu" @close="state.showRoleMenu = false"></RoleMenu>
    <!-- 角色-权限关联 -->
    <RolePermission
      :id="state.id"
      v-if="state.showRolePermission"
      @close="state.showRolePermission = false"
    ></RolePermission>
  </div>
</template>

<script lang="ts" setup>
import FilterBox from '@/components/FilterBox/index.vue'
import FilterButton from '@/components/FilterButton/index.vue'
import Table from '@/components/Table/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import { ElFormItem, ElInput, ElTableColumn, ElButton } from 'element-plus'
import { useIndex, useIndexInfo } from './hooks/use-index'
import RoleAdd from './components/RoleAdd.vue'
import RoleInfo from './components/RoleInfo.vue'
import RoleUser from './components/RoleUser.vue'
import RoleMenu from './components/RoleMenu.vue'
import RolePermission from './components/RolePermission.vue'

defineOptions({
  name: 'Role'
})

const { keyword, btnList, pageNo, pageSize, total, data, getDataList } = useIndex()

// 控制新增/编辑等逻辑
const {
  state,
  handleBtn,
  handleShowInfo,
  handleEdit,
  handleDelete,
  handleConfirm,
  handleShowRoleInfo,
  handleShowRoleMenu,
  handleShowRolePermission
} = useIndexInfo({
  getDataList
})
</script>
