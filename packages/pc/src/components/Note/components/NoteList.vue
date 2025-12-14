<!--
  @cpl
  @create 2024-09-01 16:10:58
  @description 笔记列表
-->

<template>
  <div></div>
  <ElDrawer
    :model-value="true"
    append-to-body
    destroy-on-close
    size="70%"
    :z-index="99"
    :close-on-click-modal="false"
    :title="_title"
    class="note-container"
    :with-header="true"
    :before-close="beforeClose"
  >
    <div class="g-container">
      <!-- 筛选框 -->
      <FilterBox :min-length="1" @search="getDataList(1)" @reset="handleReset">
        <ElFormItem label="关键字">
          <ElInput v-model="keyword" type="text" clearable placeholder="请输入关键字"></ElInput>
        </ElFormItem>
        <ElFormItem label="是否公开" prop="isSecret" class="g-w-280 mr-6">
          <SelectType v-model="isSecret" type="isSecret"></SelectType>
        </ElFormItem>
        <ElFormItem label="标签">
          <SelectType v-model="classify" type="classify" :parent-code="rootId"></SelectType>
        </ElFormItem>
      </FilterBox>
      <!-- 操作盒子 -->
      <FilterButton :list="btnList"></FilterButton>
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
            <content class="w-full flex-1 g-scroll-y relative note-border-right">
              <div class="w-full py-2 pl-2 pr-1">
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
      :root-id="rootId"
      :target-id="targetId"
      v-if="showAdd"
      @cancel="handleCancelAdd"
      @confirm="handleConfirmAdd"
    ></NoteAdd>
    <!-- 笔记关联  -->
    <NoteRelevance
      :root-id="rootId"
      :target-id="targetId"
      v-if="showRelevance"
      @cancel="handleCancelRelevance"
      @confirm="handleConfirmRelevance"
    ></NoteRelevance>
  </ElDrawer>
</template>

<script setup lang="ts">
import { ElDrawer, ElFormItem, ElInput, ElButton, ElTag } from 'element-plus'
import { noteEmit, noteProps } from '../type'
import { useList } from '../hooks/use-list'
import FilterBox from '@/components/FilterBox/index.vue'
import FilterButton from '@/components/FilterButton/index.vue'
import SelectType from '@/components/SelectType/index.vue'
import NoteAdd from './NoteAdd.vue'
import NoteRelevance from './NoteRelevance.vue'
import { getIndex } from '@/utils/tools'
import { formatDate } from '@jiumu/utils'
import Pagination from '@/components/Pagination/index.vue'
import IconSvg from '@/components/IconSvg/index'

const props = defineProps(noteProps)
const emit = defineEmits(noteEmit)

const {
  beforeClose,
  _title,
  keyword,
  isSecret,
  classify,
  pageNo,
  pageSize,
  total,
  data,
  getDataList,
  handleReset,
  showAdd,
  showRelevance,
  btnList,
  handleCancelAdd,
  handleConfirmAdd,
  handleCancelRelevance,
  handleConfirmRelevance,
  currentId,
  handleEdit,
  handleDelete
} = useList(props, emit)
</script>

<style lang="scss">
.note-container {
  .el-drawer__header {
    margin-bottom: 0;
    padding-bottom: 1rem;
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
