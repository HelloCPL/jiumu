<!--
  @describe: 章节列表
  @author: cpl
  @create: 2023-01-25 00:25:33
-->

<template>
  <div class="g-container">
    <!-- 头部信息 -->
    <div class="w-full px-6 py-2 border-b-1 relative" v-if="dataInfo">
      <img
        :src="$STATIC_URL + '/pc/icons/icon_caogao.png'"
        class="absolute top-0 right-0 w-8"
        alt=""
        v-if="dataInfo.isDraft === '1'"
      />
      <span class="text-lg">
        <span>{{ dataInfo.name }}</span>
        <ElTag class="text-sm ml-2" size="small" type="danger" effect="dark" v-if="isSelf">我的</ElTag>
      </span>
      <div class="mt-1 text-sm text-lighter flex justify-between">
        <span>
          <span>{{ dataInfo.author }}</span>
          <span class="pl-4">共 {{ total }} 章</span>
          <span class="pl-4">{{ dataInfo.typeLabel }}</span>
        </span>
        <span> 来源：{{ dataInfo.terminal }} </span>
      </div>
    </div>
    <!-- 操作盒子  -->
    <FilterButton :list="btnList" @click="handleBtn" v-if="isSelf"></FilterButton>
    <!-- 列表 -->
    <Table :data="data">
      <ElTableColumn type="index" label="序号" width="60">
        <template #default="{ $index }">{{ getIndex($index, pageNo, pageSize) }}</template>
      </ElTableColumn>
      <ElTableColumn prop="sort" label="排序" width="60" />
      <ElTableColumn prop="title" label="标题" min-width="150" />
      <ElTableColumn label="是否草稿" width="90">
        <template #default="{ row }">
          <span>{{ row.isDraft === '0' ? '是' : '否' }}</span>
        </template>
      </ElTableColumn>
      <ElTableColumn label="是否公开" width="90">
        <template #default="{ row }">
          <span>{{ row.isSecret === '0' ? '是' : '否' }}</span>
        </template>
      </ElTableColumn>
      <template v-if="!isDraft">
        <ElTableColumn prop="likeCount" label="点赞" width="70"></ElTableColumn>
        <ElTableColumn prop="collectionCount" label="收藏" width="70"></ElTableColumn>
        <ElTableColumn prop="likeCount" label="评论" width="70"></ElTableColumn>
      </template>
      <ElTableColumn label="更新时间" width="150">
        <template #default="{ row }">
          <span>{{ formatDate(row.updateTime, 'YYYY-MM-DD HH:mm') }}</span>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="terminal" label="创建终端" width="90" />
      <ElTableColumn label="操作" width="140" fixed="right" v-if="isSelf">
        <template #default="{ row }">
          <ElButton type="primary" text size="small" @click="handleEdit(row)">修改</ElButton>
          <ElButton type="danger" text size="small" @click="handleDelete(row)"> 删除 </ElButton>
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
import { useIndex } from './hooks/use-index'
import FilterButton from '@/components/FilterButton/index.vue'
import { ElTableColumn, ElButton, ElTag } from 'element-plus'
import Table from '@/components/Table/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import { formatDate } from '@jiumu/utils'
import { getIndex } from '@/utils/tools'

defineOptions({
  name: 'NovelChapter'
})

const {
  dataInfo,
  isSelf,
  isDraft,
  pageNo,
  pageSize,
  total,
  data,
  getDataList,
  btnList,
  handleBtn,
  handleEdit,
  handleDelete
} = useIndex()
</script>
