<!--
  @describe: 笔记关联
  @author: cpl
  @create: 2023-02-11 01:13:09
-->

<template>
  <Dialog title="笔记关联" :show-footer="false" @close="handleClose">
    <PopupTwo
      v-model:keyword="keyword"
      :more-left="total > dataList.length"
      :total="total"
      :span-left="24"
      :show-right="false"
      @search="search"
      @scroll-left="getDataList"
    >
      <!-- 左侧 -->
      <template #left>
        <div v-for="item in dataList" :key="item.id" class="pl-4">
          <ElCheckbox
            :model-value="item._checked"
            :label="item.id"
            :checked="item._checked"
            @update:model-value="changeCheck($event as boolean, item)"
          >
            <GRichText :html="item.noteTitle"></GRichText>
            <span class="text-sm text-lighter pl-4">(所属：{{ item.targetTitle }})</span>
          </ElCheckbox>
        </div>
      </template>
    </PopupTwo>
  </Dialog>
</template>

<script lang="ts" setup>
import Dialog from '@/components/Dialog/index.vue'
import PopupTwo from '@/components/PopupTwo/index.vue'
import { useRelevance } from '../hooks/use-relevance'
import { novelNoteRelevanceProps, novelNoteEmit } from '../type'
import { ElCheckbox } from 'element-plus'

const props = defineProps(novelNoteRelevanceProps)
const emit = defineEmits(novelNoteEmit)

const { keyword, total, dataList, getDataList, search, changeCheck, handleClose } = useRelevance(props, emit)
</script>
