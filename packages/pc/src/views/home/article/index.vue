<!--
  @describe: 所有文章管理页面
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
    </FilterBox>
    <!-- 列表 -->
    <Table :data="data">
      <ElTableColumn prop="sort" label="排序" width="60" />
      <ElTableColumn label="标题" min-width="150">
        <template #default="{ row }">
          <span class="cursor-pointer hover:text-primary" @click="handleShowInfo(row)">
            <GRichText :html="row.title" />
          </span>
        </template>
      </ElTableColumn>
      <ElTableColumn label="作者" min-width="100">
        <template #default="{ row }">
          <span :class="{ 'text-success': row.isSelf === '1' }" @click="handleShowInfo(row)">
            <GRichText :html="row.createUserName" />
          </span>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="typeLabel" label="文章类型" min-width="90" />
      <ElTableColumn label="封面" min-width="140">
        <template #default="{ row }">
          <ShowImage class="max-h-24" :model-value="[row.coverImg]" v-if="row.coverImg"></ShowImage>
        </template>
      </ElTableColumn>
      <ElTableColumn label="标签" min-width="100">
        <template #default="{ row }">
          <span v-if="row.classify">
            <span v-for="(item, index) in row.classify" :key="item.id">
              {{ index === 0 ? '' : '、' }}
              {{ item.label }}
            </span>
          </span>
        </template>
      </ElTableColumn>
      <ElTableColumn label="是否置顶" width="90">
        <template #default="{ row }">
          <span>{{ row.isTop === '1' ? '是' : '否' }}</span>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="likeCount" label="点赞" width="70"></ElTableColumn>
      <ElTableColumn prop="likeCount" label="收藏" width="70"></ElTableColumn>
      <ElTableColumn prop="likeCount" label="评论" width="70"></ElTableColumn>
      <ElTableColumn label="更新时间" width="150">
        <template #default="{ row }">
          <span>{{ formatDate(row.updateTime, 'YYYY-MM-DD HH:mm') }}</span>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="terminal" label="创建终端" width="90" />
      <ElTableColumn label="操作" width="80" fixed="right" v-if="checkPermissionByCode('super')">
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
import { ElFormItem, ElInput, ElTableColumn, ElButton } from 'element-plus'
import { useIndex } from './hooks/use-index'
import { useIndexInfo } from '../article-me/hooks/use-index'
import Table from '@/components/Table/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import ShowImage from '@/components/ShowImage/index.vue'
import { formatDate } from '@jiumu/utils'
import SelectType from '@/components/SelectType/index.vue'
import { checkPermissionByCode } from '@/utils/tools'

defineOptions({
  name: 'Article'
})

const { keyword, type, pageNo, pageSize, total, data, getDataList, handleReset } = useIndex()
const { handleTop, handleShowInfo } = useIndexInfo({
  getDataList
})
</script>
