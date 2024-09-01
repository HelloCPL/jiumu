<!--
  @cpl
  @create 2024-09-01 18:05:12
  @description 笔记关联
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
        <div class="px-4 pt-3">
          <Card
            title="#"
            v-for="item in dataList"
            :key="item.id"
            class="mb-3"
            show-checkbox
            :model-value="item._checked"
            @update:model-value="changeCheck($event as boolean, item)"
          >
            <template #header>
              <div class="py-2 flex items-center">
                <span class="text pr-3">
                  <GRichText :html="item.title"></GRichText>
                </span>
              </div>
            </template>
            <div class="text-sm text-lighter">
              <div class="pb-2">
                <GRichText :html="item.content"></GRichText>
              </div>
              <div class="flex mb-2" v-if="item.classify">
                <span class="mr-2 text-lighter">标签</span>
                <span>
                  <ElTag size="small" round class="mr-2" v-for="row in item.classify" :key="row.id">{{
                    row.label
                  }}</ElTag>
                </span>
              </div>
              <div v-if="item.remarks" class="pb-2">
                <span>备注：</span>
                <span>{{ item.remarks }}111</span>
              </div>
            </div>
          </Card>
        </div>
      </template>
    </PopupTwo>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from '@/components/Dialog/index.vue'
import PopupTwo from '@/components/PopupTwo/index.vue'
import { useRelevance } from '../hooks/use-relevance'
import { noteProps, noteAddEmit } from '../type'
import Card from '@/components/Card/index.vue'
import { ElTag } from 'element-plus'

const props = defineProps(noteProps)
const emit = defineEmits(noteAddEmit)

const { keyword, total, dataList, getDataList, search, changeCheck, handleClose } = useRelevance(props, emit)
</script>
