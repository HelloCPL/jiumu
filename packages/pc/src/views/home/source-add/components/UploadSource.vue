<!--
  @describe 外部文件/图片链接来源
  @author cpl
  @create 2023-03-08 10:54:37
-->

<template>
  <div class="w-full">
    <div class="flex pt-2 source-box" v-for="(item, index) in dataList" :key="item.id || index">
      <span class="mr-4">资源{{ toChineseNumber(index + 1) }}</span>
      <div class="g-w-280 mr-4">
        <div class="pb-4 mt-2 relative el-form-item" :class="{ 'is-error': item.titleError }">
          <ElInput type="text" placeholder="请输入标题" v-model="item.title"></ElInput>
          <span class="absolute bottom-0 left-0 text-xs text-danger" v-if="item.titleError">
            请输入资源标题
          </span>
        </div>
        <div class="pb-4 mt-2 relative el-form-item" :class="{ 'is-error': item.titleError }">
          <ElInput type="text" placeholder="请输入资源地址" v-model="item.link"></ElInput>
          <span class="absolute bottom-0 left-0 text-xs text-danger" v-if="item.titleError">
            请输入资源地址
          </span>
        </div>
      </div>
      <div class="flex items-end pb-6 text-ml text-lighter" v-if="dataList.length > 1">
        <ElIcon
          class="mr-3 cursor-pointer opacity-0 source-icon"
          color="var(--jm-color-danger)"
          @click="handleDeleteOne(index)"
        >
          <RemoveFilled />
        </ElIcon>
        <ElIcon class="mr-3 cursor-pointer opacity-0 source-icon" @click="handleMove(index, 'up')">
          <Top />
        </ElIcon>
        <ElIcon class="mr-3 cursor-pointer opacity-0 source-icon" @click="handleMove(index, 'down')">
          <Bottom />
        </ElIcon>
      </div>
    </div>
    <div class="flex pl-16">
      <span class="cursor-pointer text-primary flex items-center" @click="handleAddOne">
        <ElIcon>
          <CirclePlusFilled />
        </ElIcon>
        <span class="ml-1">新增</span>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toChineseNumber } from '@jiumu/utils'
import { ElIcon, ElInput } from 'element-plus'
import { RemoveFilled, Top, Bottom, CirclePlusFilled } from '@element-plus/icons-vue'
import { uploadSourceProps, uploadSourceEmit } from './type'
import { useUploadSource } from '../hooks/use-upload-source'

const props = defineProps(uploadSourceProps)
const emit = defineEmits(uploadSourceEmit)

const { dataList, handleAddOne, handleDeleteOne, handleMove } = useUploadSource(props, emit)
</script>

<style lang="scss" scoped>
.source-box:hover .source-icon {
  opacity: 1;
}
</style>
