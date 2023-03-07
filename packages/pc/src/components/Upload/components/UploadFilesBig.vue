<!--
  @describe: 上传大文件
  @author: cpl
  @create: 2023-02-23 23:49:38
-->

<template>
  <div class="w-full border">
    <div class="flex mt-4 pb-4 border-b-1 border-lighter" v-for="(item, index) in task" :key="item.id">
      <FileIcon :value="item.file.name" class="w-16 h-16 mr-4"></FileIcon>
      <div class="w-1/2 mr-12 big-content">
        <div>
          <div class="text-light">{{ item.file.name }}</div>
          <div class="text-xs text-lighter mt-1">{{ getFileSize(item.file.size) }}</div>
        </div>
        <ElProgress
          :text-inside="false"
          :stroke-width="4"
          :percentage="item.percent"
          class="mt-2"
        ></ElProgress>
      </div>
      <div class="pt-2">
        <ElButton type="danger" @click="handleCancel(item)">取消</ElButton>
        <ElButton type="primary" @click="handleUpload(item)">
          {{ item.status === '1' ? '暂停上传' : '继续上传' }}
        </ElButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import FileIcon from '@/components/ShowFile/components/FileIcon.vue'
import { ElButton, ElProgress } from 'element-plus'
import { useUploadFilesBig } from '../hooks/use-upload-files-big'
import { uploadFilesBigProps, uploadEmits } from '../type'
import { getFileSize } from '@/components/ShowFile/hooks/use-index'

const props = defineProps(uploadFilesBigProps)
const emit = defineEmits(uploadEmits)

const { task, handleFileUpload, handleCancel, handleUpload } = useUploadFilesBig(props, emit)

// 暴露方法
defineExpose({
  handleFileUpload
})
</script>

<style lang="scss">
.big-content {
  .el-progress__text {
    color: var(--jm-color-text-lighter);
    font-size: 12px;
  }
}
</style>
