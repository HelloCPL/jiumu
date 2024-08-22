<!--
  @describe: 所有连载管理页面
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
      <ElFormItem label="类型">
        <SelectType v-model="type" parent-code="300"></SelectType>
      </ElFormItem>
    </FilterBox
    ><!-- 列表 -->
    <Table :data="data">
      <ElTableColumn type="index" label="序号" width="60">
        <template #default="{ $index }">{{ getIndex($index, pageNo, pageSize) }}</template>
      </ElTableColumn>
      <ElTableColumn label="名称" :min-width="getPx(150)">
        <template #default="{ row }">
          <span class="cursor-pointer hover:text-primary" @click="handleShowInfo(row)">
            <GRichText :html="row.name" />
          </span>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="typeLabel" label="类型" :min-width="getPx(100)" />
      <ElTableColumn label="作者" :min-width="getPx(90)">
        <template #default="{ row }">
          <GRichText :html="row.author" />
        </template>
      </ElTableColumn>
      <ElTableColumn label="章节总数" prop="chapterCount" :width="getPx(90)"></ElTableColumn>
      <ElTableColumn label="是否置顶" :width="getPx(90)">
        <template #default="{ row }">
          <span>{{ row.isTop === '1' ? '是' : '否' }}</span>
        </template>
      </ElTableColumn>
      <ElTableColumn label="点赞" :width="getPx(70)">
        <template #default="{ row }">
          <span>{{ row.likeCount + row.chapterLikeCount }}</span>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="collectionCount" label="收藏" :width="getPx(70)">
        <template #default="{ row }">
          <span>{{ row.collectionCount + row.chapterCollectionCount }}</span>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="commentCount" label="评论" :width="getPx(70)">
        <template #default="{ row }">
          <span>{{ row.commentCount + row.chapterCommentCount }}</span>
        </template>
      </ElTableColumn>
      <ElTableColumn label="更新时间" :width="getPx(150)">
        <template #default="{ row }">
          <span>{{ formatDate(row.updateTime, 'YYYY-MM-DD HH:mm') }}</span>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="terminal" label="创建终端" :width="getPx(90)" />
      <ElTableColumn label="操作" :width="getPx(140)" fixed="right" v-if="checkPermissionByCode('super')">
        <template #default="{ row }">
          <ElButton type="primary" text size="small" @click="handleShowNovelChapter(row)">章节列表</ElButton>
          <ElButton type="primary" text size="small" @click="handleTop(row)" v-if="row.isTop === '0'">
            置顶
          </ElButton>
          <ElButton type="primary" text size="small" @click="handleTop(row)" v-else>取消置顶</ElButton>
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
import { useIndex } from './hooks/use-index'
import { useIndexInfo } from '../novel-me/hooks/use-index'
import Table from '@/components/Table/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import { formatDate } from '@jiumu/utils'
import SelectType from '@/components/SelectType/index.vue'
import { checkPermissionByCode, getIndex, getPx } from '@/utils/tools'

defineOptions({
  name: 'Article'
})

const { keyword, type, pageNo, pageSize, total, data, getDataList, handleReset } = useIndex()
const { handleTop, handleShowInfo, handleShowNovelChapter } = useIndexInfo({
  getDataList
})
</script>
