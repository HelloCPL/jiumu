<!--
  @describe: 问答管理页面
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
    </FilterBox>
    <!-- 列表 -->
    <Table :data="data">
      <ElTableColumn type="index" label="序号" width="60">
        <template #default="{ $index }">{{ getIndex($index, pageNo, pageSize) }}</template>
      </ElTableColumn>
      <ElTableColumn label="标题" :min-width="getPx(150)">
        <template #default="{ row }">
          <span class="cursor-pointer hover:text-primary" @click="handleShowInfo(row)">
            <GRichText :html="row.title" />
          </span>
        </template>
      </ElTableColumn>
      <ElTableColumn label="标签" :min-width="getPx(110)">
        <template #default="{ row }">
          <span v-if="row.classify">
            <span v-for="(item, index) in row.classify" :key="item.id">
              {{ index === 0 ? '' : '、' }}
              {{ item.label }}
            </span>
          </span>
        </template>
      </ElTableColumn>
      <ElTableColumn label="是否置顶" :width="getPx(90)">
        <template #default="{ row }">
          <ElTag :type="row.isTop === '1' ? 'success' : 'danger'">
            <span>{{ row.isTop === '1' ? '是' : '否' }}</span>
          </ElTag>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="likeCount" label="点赞" :width="getPx(70)"></ElTableColumn>
      <ElTableColumn prop="collectionCount" label="收藏" :width="getPx(70)"></ElTableColumn>
      <ElTableColumn prop="commentCount" label="评论" :width="getPx(70)"></ElTableColumn>
      <ElTableColumn label="更新时间" :width="getPx(150)">
        <template #default="{ row }">
          <span>{{ formatDate(row.updateTime, 'YYYY-MM-DD HH:mm') }}</span>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="terminal" label="创建终端" :width="getPx(90)" />
      <ElTableColumn label="操作" :width="getPx(80)" :fixed="tableFixed" v-if="isSuper()">
        <template #default="{ row }">
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
import { ElFormItem, ElInput, ElTableColumn, ElButton, ElTag } from 'element-plus'
import Table from '@/components/Table/index.vue'
import { formatDate } from '@jiumu/utils'
import Pagination from '@/components/Pagination/index.vue'
import { useIndex } from './hooks/use-index'
import { useIndexInfo } from '../question-me/hooks/use-index'
import { getIndex, getPx } from '@/utils/tools'
import { isSuper } from '@/utils/permission'
import { useWidth } from '@/hooks/use-width'

defineOptions({
  name: 'Question'
})

const { keyword, pageNo, pageSize, total, data, getDataList, handleReset } = useIndex()

const { handleShowInfo, handleTop } = useIndexInfo({
  getDataList
})
const { tableFixed } = useWidth()
</script>
