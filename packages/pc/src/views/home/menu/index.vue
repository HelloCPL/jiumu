<!--
  @describe: 菜单管理页面
  @author: cpl
  @create: 2022-07-12 14:54:30
-->

<template>
  <div class="g-container">
    <!-- 操作盒子 -->
    <FilterButton :list="btnList" @click="handleBtn">
      <template #right>
        <Upload class="ml-3" :http-request="handleImport" accept=".json">
          <ElButton>导入</ElButton>
        </Upload>
      </template>
    </FilterButton>
    <!-- 列表 -->
    <Table :data="data" default-expand-all @selection-change="selectionChange">
      <ElTableColumn type="selection" width="55" />
      <ElTableColumn type="index" label="序号" width="60">
        <template #default="{ $index }">{{ getIndex($index) }}</template>
      </ElTableColumn>
      <ElTableColumn prop="sort" label="排序" :min-width="getPx(110)" />
      <ElTableColumn label="code" :min-width="getPx(110)">
        <template #default="{ row }">
          <span class="cursor-pointer hover:text-primary" @click="handleShowInfo(row)">{{ row.code }}</span>
        </template>
      </ElTableColumn>
      <ElTableColumn label="菜单" :min-width="getPx(120)">
        <template #default="{ row }">
          <GRichText :html="row.label" />
        </template>
      </ElTableColumn>
      <ElTableColumn prop="parentLabel" label="父级菜单" :min-width="getPx(120)" />
      <ElTableColumn label="更新时间" :width="getPx(150)">
        <template #default="{ row }">
          <span>{{ formatDate(row.updateTime, 'YYYY-MM-DD HH:mm') }}</span>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="terminal" label="创建终端" :width="getPx(100)" />
      <ElTableColumn prop="remarks" label="备注" :min-width="getPx(160)" />
      <ElTableColumn label="操作" :width="getPx(260)" fixed="right">
        <template #default="{ row }">
          <ElButton
            type="primary"
            text
            size="small"
            :disabled="row.configurable === '1' && !userStore.isSuper"
            @click="handleEdit(row)"
          >
            修改
          </ElButton>
          <ElButton type="primary" text size="small" @click="handleAddChild(row)">新增子级</ElButton>
          <ElButton
            type="danger"
            text
            size="small"
            :disabled="row.configurable === '1' && !userStore.isSuper"
            @click="handleDelete(row)"
            v-if="!(row.children && row.children.length)"
          >
            删除
          </ElButton>
          <ElButton type="primary" text size="small" @click="handleShowMenuUser(row)">查看用户</ElButton>
          <ElButton type="primary" text size="small" @click="handleShowMenuRole(row)">查看角色</ElButton>
        </template>
      </ElTableColumn>
    </Table>

    <!-- 菜单新增或编辑 -->
    <MenuAdd
      :id="state.id"
      :parent-code="state.parentCode"
      :options="data"
      v-if="state.show"
      @close="state.show = false"
      @confirm="handleConfirm"
    />
    <!-- 角色信息 -->
    <MenuInfo :id="state.id" v-if="state.showInfo" @close="state.showInfo = false"></MenuInfo>
    <!-- 查看菜单-用户关联 -->
    <MenuUser
      :id="state.id"
      :label="state.label"
      v-if="state.showMenuUser"
      @close="state.showMenuUser = false"
    ></MenuUser>
    <!-- 查看菜单-角色关联 -->
    <MenuRole
      :id="state.id"
      :label="state.label"
      v-if="state.showMenuRole"
      @close="state.showMenuRole = false"
    ></MenuRole>
  </div>
</template>

<script lang="ts" setup>
import FilterButton from '@/components/FilterButton/index.vue'
import Table from '@/components/Table/index.vue'
import { ElTableColumn, ElButton } from 'element-plus'
import { useIndex, useIndexInfo } from './hooks/use-index'
import MenuAdd from './components/MenuAdd.vue'
import MenuInfo from './components/MenuInfo.vue'
import MenuUser from './components/MenuUser.vue'
import MenuRole from './components/MenuRole.vue'
import { formatDate } from '@jiumu/utils'
import { getIndex, getPx } from '@/utils/tools'
import { useUserStore } from '@/store'
import Upload from '@/components/Upload/index.vue'

defineOptions({
  name: 'Menu'
})

const userStore = useUserStore()

const { data, getDataList } = useIndex()

// 控制新增/编辑等逻辑
const {
  state,
  btnList,
  handleBtn,
  handleShowInfo,
  handleEdit,
  handleAddChild,
  handleDelete,
  selectionChange,
  handleImport,
  handleConfirm,
  handleShowMenuUser,
  handleShowMenuRole
} = useIndexInfo({
  getDataList
})
</script>
