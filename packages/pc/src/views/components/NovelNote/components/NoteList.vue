<!--
  @describe: 笔记列表页面
  @author: cpl
  @create: 2023-02-05 19:11:35
-->

<template>
  <div class="g-container" style="width: 100%">
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
    <div class="w-full flex-1 py-4 pl-4 g-scroll-y">
      <div class="w-full flex flex-wrap">
        <div
          class="shadow-lg rounded mr-4 mb-4 bg-white relative note-list-content"
          v-for="index in 50"
          :key="index"
        >
          <header
            class="w-full pl-2 pr-6 relative border-l-1 border-b-1 border-lighter overflow-hidden flex items-center note-list-header"
          >
            <span class="text-lg leading-5">标题标题标题标题标题</span>
            <span class="bg-success absolute flex justify-center items-end rotate-45 note-list-tag">
              <span class="text-sm text-white note-list-tag-text">笔记100</span>
            </span>
          </header>
          <!-- 内容区滚动 -->
          <content class="border-lighter border-l-1 border-r-1 border-b-1">
            <div>
              <span>所属目标：</span>
              <span>哈哈</span>
              <span>哈哈</span>
            </div>
            <div>
              <span>备注：</span>
              <span>哈哈哈</span>
            </div>
          </content>
          <footer
            class="border-lighter border-l-1 border-r-1 border-b-1 absolute left-0 bottom-0 note-list-footer"
          >
            <span>张三</span>
            <span>
              <span>2022</span>
              <span>管理端</span>
            </span>
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
</template>

<script lang="ts" setup>
import FilterBox from '@/components/FilterBox/index.vue'
import { ElDrawer, ElFormItem, ElInput, ElButton } from 'element-plus'
import FilterButton from '@/components/FilterButton/index.vue'
import NoteAdd from './NoteAdd.vue'
import { useList } from '../hooks/use-list'
import { novelNoteProps, novelNoteEmit } from '../type'
import SelectType from '@/components/SelectType/index.vue'
import Pagination from '@/components/Pagination/index.vue'

const props = defineProps(novelNoteProps)
const emit = defineEmits(novelNoteEmit)

const {
  isShow,
  currentId,
  keyword,
  classify,
  pageNo,
  pageSize,
  total,
  data,
  getDataList,
  handleReset,
  btnList,
  handleBtn,
  handleEdit,
  handleDelete
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
@import './NoteList.scss';
</style>
