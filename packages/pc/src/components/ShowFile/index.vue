<!--
  @describe: 文件列表展示组件
  @author cpl
  @update 2022-08-07 01:10:59
-->

<template>
  <div class="w-full">
    <div class="w-full flex items-center mb-3" v-for="(item, index) in modelValue" :key="item.id">
      <span class="flex items-center mr-3 text-light">
        <FileIcon :value="item.filePath" />
        <span class="pl-2">{{ item.fileName }}</span>
        <span class="pl-2 text-sm text-lighter">{{ getFileSize(item.fileSize) }}</span>
      </span>
      <span
        class="flex items-center cursor-pointer mr-3 text-sm text-lighter hover:text-primary"
        @click="handlePreview(item)"
      >
        <ElIcon>
          <View />
        </ElIcon>
        <span>预览</span>
      </span>
      <span
        class="flex items-center cursor-pointer mr-3 text-sm text-lighter hover:text-primary"
        @click="downloadFile(item)"
      >
        <ElIcon>
          <Download />
        </ElIcon>
        <span>下载</span>
      </span>
      <span
        class="flex items-center cursor-pointer mr-3 text-sm text-lighter hover:text-primary"
        @click="handleDelete(item, index)"
      >
        <ElIcon>
          <Delete />
        </ElIcon>
        <span>删除</span>
      </span>
    </div>

    <!-- 图片预览 -->
    <PreviewImage
      :url-list="[state.urlImage]"
      v-if="state.showImage"
      @close="state.showImage = false"
    ></PreviewImage>
    <!-- pdf 预览 -->
    <PreviewPdf :url="state.urlPdf" v-if="state.showPdf" @close="state.showPdf = false"></PreviewPdf>
    <!-- txt 预览 -->
    <PreviewTxt :url="state.urlTxt" v-if="state.showTxt" @close="state.showTxt = false"></PreviewTxt>
  </div>
</template>

<script lang="ts" setup>
import { showFileProps } from './type'
import { ElIcon } from 'element-plus'
import { View, Download, Delete } from '@element-plus/icons-vue'
import FileIcon from './components/FileIcon.vue'
import { useIndex, getFileSize } from './hooks/use-index'
import { downloadFile } from '@/utils/download-file'
import PreviewImage from './components/PreviewImage.vue'
import PreviewPdf from './components/PreviewPdf.vue'
import PreviewTxt from './components/PreviewTxt.vue'

const props = defineProps(showFileProps)
const emit = defineEmits(['update:modelValue'])
const { state, handlePreview, handleDelete } = useIndex(props, emit)
</script>

<style lang="scss" scoped></style>
