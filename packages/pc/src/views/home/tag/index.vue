<!--
  @describe: 系统标签管理页面
  @author: cpl
  @create: 2022-07-12 14:54:30
-->

<template>
  <div class="g-container">
    <!-- 操作盒子 -->
    <FilterButton :list="btnList" @click="handleBtn">
      <template #right>
        <Upload
          class="ml-3"
          :http-request="handleImport"
          accept=".json"
          v-if="hasPermission('pc:tag:import:btn')"
        >
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
      <ElTableColumn label="标签" :min-width="getPx(120)">
        <template #default="{ row }">
          <GRichText :html="row.label" />
        </template>
      </ElTableColumn>
      <ElTableColumn prop="parentLabel" label="父级标签" :min-width="getPx(120)" />
      <ElTableColumn label="更新时间" :width="getPx(150)">
        <template #default="{ row }">
          <span>{{ formatDate(row.updateTime, 'YYYY-MM-DD HH:mm') }}</span>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="terminal" label="创建终端" :width="getPx(90)" />
      <ElTableColumn prop="remarks" label="备注" :min-width="getPx(160)" />
      <ElTableColumn label="操作" :width="getPx(200)" fixed="right">
        <template #default="{ row }">
          <ElButton
            type="primary"
            text
            size="small"
            v-if="row.configurable !== '-1'"
            :disabled="row.configurable === '1' && !userStore.isSuper"
            @click="handleEdit(row)"
            v-permission="'pc:tag:update:btn'"
          >
            修改
          </ElButton>
          <ElButton
            type="primary"
            text
            size="small"
            @click="handleAddChild(row)"
            v-permission="'pc:tag:add:child:btn'"
            >新增子级</ElButton
          >
          <ElButton
            type="danger"
            text
            size="small"
            @click="handleDelete(row)"
            :disabled="row.configurable === '1' && !userStore.isSuper"
            v-if="!(row.children && row.children?.length) && row.configurable !== '-1'"
            v-permission="'pc:tag:delete:btn'"
          >
            删除
          </ElButton>
          <ElButton
            type="primary"
            text
            size="small"
            v-if="row.parentCode === '8888'"
            @click="handleShowTagUser(row)"
            v-permission="'pc:tag:user:relevant:btn'"
          >
            用户关联
          </ElButton>
        </template>
      </ElTableColumn>
    </Table>

    <!-- 标签新增或编辑 -->
    <TagAdd
      :id="state.id"
      :parent-code="state.parentCode"
      :options="data"
      v-if="state.show"
      @close="state.show = false"
      @confirm="handleConfirm"
    />
    <!-- 角色信息 -->
    <TagInfo :id="state.id" v-if="state.showInfo" @close="state.showInfo = false"></TagInfo>
    <!-- 角色-用户关联 -->
    <TagUser
      :id="state.id"
      :code="state.code"
      v-if="state.showTagUser"
      @close="state.showTagUser = false"
    ></TagUser>
  </div>
</template>

<script lang="ts" setup>
import FilterButton from '@/components/FilterButton/index.vue'
import Table from '@/components/Table/index.vue'
import { ElTableColumn, ElButton } from 'element-plus'
import { useIndex, useIndexInfo } from './hooks/use-index'
import TagAdd from './components/TagAdd.vue'
import TagInfo from './components/TagInfo.vue'
import TagUser from './components/TagUser.vue'
import { formatDate } from '@jiumu/utils'
import { getIndex, getPx } from '@/utils/tools'
import { useUserStore } from '@/store'
import Upload from '@/components/Upload/index.vue'
import { hasPermission } from '@/utils/permission'

defineOptions({
  name: 'Tag'
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
  handleShowTagUser
} = useIndexInfo({ getDataList })
</script>
