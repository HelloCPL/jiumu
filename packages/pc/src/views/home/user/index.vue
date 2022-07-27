<!--
  @describe: 用户页面
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
    <!-- 列表 -->
    <Table :data="data">
      <ElTableColumn type="selection" width="55" />
      <ElTableColumn type="index" label="序号" width="60" />
      <ElTableColumn label="头像" width="100">
        <template #default="{ row }">
          <ElImage class="h-10 rounded-sm" :src="row.avatar.filePath" v-if="row.avatar" />
        </template>
      </ElTableColumn>
      <ElTableColumn label="账号" min-width="120">
        <template #default="{ row }">
          <GRichText
            class="cursor-pointer hover:text-primary"
            @click="handleShowInfo(row)"
            :text="row.phone"
          />
        </template>
      </ElTableColumn>
      <ElTableColumn label="昵称" min-width="120">
        <template #default="{ row }">
          <GRichText :text="row.username" />
        </template>
      </ElTableColumn>
      <ElTableColumn prop="sexLabel" label="性别" width="60" />
      <ElTableColumn label="生日" min-width="110">
        <template #default="{ row }">
          <span>{{ formatDate(row.birthday, 'YYYY-MM-DD') }}</span>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="professional" label="职业" min-width="130" />
      <ElTableColumn prop="createTime" label="注册时间" min-width="120" />
      <ElTableColumn prop="terminal" label="注册终端" min-width="80" />
      <ElTableColumn label="操作" width="250" fixed="right">
        <template #default="{ row }">
          <ElButton type="primary" text size="small">角色关联</ElButton>
          <ElButton type="primary" text size="small">标签关联</ElButton>
          <ElButton type="primary" text size="small">查看菜单</ElButton>
          <ElButton type="primary" text size="small">查看权限</ElButton>
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

    <!-- 角色信息 -->
    <UserInfo :id="state.id" v-if="state.showInfo" @close="state.showInfo = false"></UserInfo>
  </div>
</template>

<script lang="ts" setup>
import FilterBox from '@/components/FilterBox/index.vue'
import Table from '@/components/Table/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import { ElFormItem, ElInput, ElTableColumn, ElButton, ElImage } from 'element-plus'
import { useIndex, useIndexInfo } from './hooks/use-index'
import { formatDate } from '@jiumu/utils'
import UserInfo from './components/UserInfo.vue'

defineOptions({
  name: 'User'
})

const { keyword, pageNo, pageSize, total, data, getDataList } = useIndex()

// 控制查看等逻辑
const { state, handleShowInfo } = useIndexInfo()
</script>
