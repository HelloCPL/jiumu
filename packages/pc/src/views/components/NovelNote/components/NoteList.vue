<!--
  @describe: 笔记列表页面
  @author: cpl
  @create: 2023-02-05 19:11:35
-->

<template>
  <!-- 弹窗 -->
  <ElDrawer
    v-model="isShow"
    append-to-body
    destroy-on-close
    size="70%"
    :z-index="99"
    :close-on-click-modal="false"
    :title="_title"
    custom-class="novel-note-container"
    :with-header="true"
    :before-close="beforeClose"
  >
    <div class="g-container">
      <!-- 筛选框 -->
      <FilterBox :min-length="1" @search="getDataList(1)" @reset="handleReset">
        <ElFormItem label="关键字">
          <ElInput v-model="keyword" type="text" clearable placeholder="请输入关键字"></ElInput>
        </ElFormItem>
        <ElFormItem label="标签">
          <SelectType v-model="classify" type="classify" parent-code="novelClassify"></SelectType>
        </ElFormItem>
      </FilterBox>
      <!-- 操作盒子 -->
      <FilterButton :list="btnList" @click="handleBtn"></FilterButton>
      <!-- 内容区 -->
      <div class="w-full flex-1 pt-4 pl-4 g-scroll-y">
        <div class="w-full flex flex-wrap">
          <div
            class="shadow-lg rounded mr-6 mb-4 bg-white relative flex flex-col pb-8 border-l-1 border-b-1 border-lighter text-sm note-list-content"
            v-for="(item, index) in data"
            :key="item.id"
          >
            <header
              class="w-full pl-2 pr-8 relative border-b-1 border-lighter overflow-hidden flex items-center shrink-0 note-list-header"
            >
              <span class="leading-4">
                <GRichText :html="item.title" />
              </span>
              <span class="bg-success absolute flex justify-center items-end rotate-45 note-list-tag">
                <span class="text-sm text-white note-list-tag-text">
                  笔记{{ getIndex(index, pageNo, pageSize) }}
                </span>
              </span>
            </header>
            <!-- 内容区滚动 -->
            <content class="w-full flex-1 g-scroll-y relative note-border-right">
              <div class="w-full py-2 pl-2 pr-1">
                <div class="flex mb-2" v-if="item.target">
                  <span class="mr-2 text-lighter">归属</span>
                  <span class="flex-1 flex flex-wrap">
                    <span
                      class="mr-2"
                      :class="{ 'text-warning-400': row.id === id }"
                      v-for="row in item.target"
                      :key="row.id"
                    >
                      {{ row.title }}
                    </span>
                  </span>
                </div>
                <div class="mb-2">
                  <GRichText :html="item.content" />
                </div>
                <div class="flex mb-2" v-if="item.classify">
                  <span class="mr-2 text-lighter">标签</span>
                  <span>
                    <ElTag size="small" round class="mr-2" v-for="row in item.classify" :key="row.id">{{
                      row.label
                    }}</ElTag>
                  </span>
                </div>
                <div class="flex mb-2" v-if="item.remarks">
                  <span class="mr-2 text-lighter">备注</span>
                  <span>{{ item.remarks }}</span>
                </div>
                <div class="w-full flex items-center text-xs text-lighter">
                  <span class="flex items-center mr-2">
                    <IconSvg name="time"></IconSvg>
                    <span class="ml-1">{{ formatDate(item.updateTime, 'YYYY-MM-DD') }}</span>
                  </span>
                  <span class="flex items-center">
                    <IconSvg name="source"></IconSvg>
                    <span class="ml-1">{{ item.terminal }}</span>
                  </span>
                </div>
                <div></div>
              </div>
            </content>
            <footer
              class="w-full h-8 absolute left-0 bottom-0 flex items-center justify-end pr-4 note-border-right"
            >
              <ElButton size="small" type="primary" text @click="handleEdit(item)">修改</ElButton>
              <ElButton size="small" type="danger" text @click="handleDelete(item)">删除</ElButton>
            </footer>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <Pagination
        v-model:page-no="pageNo"
        v-model:page-size="pageSize"
        :total="total"
        @change="getDataList"
      ></Pagination>
    </div>

    <!-- 笔记新增  -->
    <NoteAdd
      :id="currentId"
      :target-id="id"
      :target-type="type"
      :target-share="targetShare"
      v-if="showAdd"
      @close="handleClose"
    ></NoteAdd>
    <!-- 笔记关联 -->
    <NoteRelevance
      :target-id="id"
      :target-type="type"
      :target-share="targetShare"
      v-if="showRelevance && targetShare"
      @close="handleClose"
    ></NoteRelevance>
  </ElDrawer>
</template>

<script lang="ts" setup>
import FilterBox from '@/components/FilterBox/index.vue'
import { ElDrawer, ElFormItem, ElInput, ElButton, ElTag } from 'element-plus'
import FilterButton from '@/components/FilterButton/index.vue'
import { useList } from '../hooks/use-list'
import { novelNoteProps, novelNoteEmit } from '../type'
import SelectType from '@/components/SelectType/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import IconSvg from '@/components/IconSvg/index'
import NoteAdd from './NoteAdd.vue'
import NoteRelevance from './NoteRelevance.vue'
import { getIndex } from '@/utils/tools'
import { formatDate } from '@jiumu/utils'

const props = defineProps(novelNoteProps)
const emit = defineEmits(novelNoteEmit)

const {
  isShow,
  beforeClose,
  _title,
  targetShare,

  keyword,
  classify,
  pageNo,
  pageSize,
  total,
  data,
  getDataList,
  handleReset,
  showAdd,
  btnList,
  currentId,
  handleBtn,
  handleEdit,
  handleDelete,
  handleClose,

  showRelevance
} = useList(props, emit)
</script>

<style lang="scss">
.novel-note-container {
  .el-drawer__header {
    margin-bottom: 0;
    padding-bottom: var(--el-drawer-padding-primary);
    border-bottom: 1px solid var(--jm-color-border);
    color: var(--jm-color-text);
  }

  .el-drawer__body {
    padding: 0;
    overflow: hidden;
  }
}
</style>

<style lang="scss" scoped>
@use './NoteList.scss';
</style>
