<!--
  @cpl
  @create 2024-09-01 16:10:58
  @description 笔记列表
-->

<template>
  <ElDrawer
    :model-value="true"
    append-to-body
    destroy-on-close
    :size="getSize"
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
        <ElFormItem label="查看范围">
          <SelectType v-model="scoped" :data="scopedList" :clearable="false"></SelectType>
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
      <div class="w-full flex-1 p-4 g-scroll-y">
        <div class="w-full flex flex-wrap gap-6" v-if="data.length">
          <div
            class="shadow-lg rounded bg-white relative flex flex-col pb-8 border-l-1 border-b-1 border-lighter text-sm note-list-content"
            :style="{ width: getItemWidth }"
            v-for="item in data"
            :key="item.id"
          >
            <header
              class="w-full pl-2 pr-8 relative border-b-1 border-lighter overflow-hidden flex items-center shrink-0 note-list-header"
            >
              <span class="leading-4 line-clamp-1">
                <GRichText :html="item.title" />
              </span>
              <span
                class="absolute flex justify-center items-end rotate-45 note-list-tag"
                :class="{
                  'bg-success': item.targetId === targetId,
                  'bg-danger': item.targetId !== targetId
                }"
              >
                <span class="text text-white note-list-tag-text">
                  {{ item.targetId === targetId ? '当前' : '关联' }}
                </span>
              </span>
            </header>
            <content class="w-full flex-1 g-scroll-y relative note-border-right">
              <div class="w-full pt-4 pl-4 pr-2 pb-2">
                <div class="flex flex-wrap gap-x-6 gap-y-4 mb-4" v-if="item.classify?.length">
                  <ElTag size="small" round v-for="row in item.classify" :key="row.id">{{ row.label }}</ElTag>
                </div>
                <div class="whitespace-pre-wrap mb-4">
                  <GRichText :html="item.content" />
                </div>
                <div class="text-lighter whitespace-pre-wrap mb-4" v-if="item.remarks">
                  {{ item.remarks }}
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
              class="w-full h-8 absolute left-0 bottom-0 flex items-center justify-end pr-4 border-t-1 border-lighter"
            >
              <ElButton size="small" type="primary" text @click="handleEdit(item)">修改</ElButton>
              <ElButton size="small" type="danger" text @click="handleDelete(item)">删除</ElButton>
            </footer>
          </div>
        </div>
        <ElEmpty class="mt-8" description="暂无数据" v-else></ElEmpty>
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
  </ElDrawer>
</template>

<script setup lang="ts">
import { ElDrawer, ElFormItem, ElInput, ElButton, ElTag, ElEmpty } from 'element-plus'
import { noteEmit, noteProps } from '../type'
import { useList } from '../hooks/use-list'
import FilterBox from '@/components/FilterBox/index.vue'
import FilterButton from '@/components/FilterButton/index.vue'
import SelectType from '@/components/SelectType/index.vue'
import NoteAdd from './NoteAdd.vue'
import { formatDate } from '@jiumu/utils'
import Pagination from '@/components/Pagination/index.vue'
import IconSvg from '@/components/IconSvg/index'
import { useWidth } from '@/hooks/use-width'
import { computed } from 'vue'

const props = defineProps(noteProps)
const emit = defineEmits(noteEmit)

const {
  beforeClose,
  _title,
  keyword,
  isSecret,
  classify,
  scoped,
  scopedList,
  pageNo,
  pageSize,
  total,
  data,
  getDataList,
  handleReset,
  showAdd,
  btnList,
  handleCancelAdd,
  handleConfirmAdd,
  currentId,
  handleEdit,
  handleDelete
} = useList(props, emit)

const { width } = useWidth()
const getSize = computed(() => {
  if (width.value <= 768) return '100%'
  return '80%'
})

const getItemWidth = computed(() => {
  if (width.value <= 768) return '100%'
  return '242px'
})
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
@forward './NoteList.scss';
</style>
