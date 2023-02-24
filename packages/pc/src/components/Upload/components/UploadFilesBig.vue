<!--
  @describe: 上传大文件
  @author: cpl
  @create: 2023-02-23 23:49:38
-->

<template>
  <div class="w-full border">
    <!-- <div class="flex mt-4 pb-4 border-b-1 border-lighter">
      <FileIcon value="xxx.png" class="w-16 h-16 mr-4"></FileIcon>
      <div class="w-1/2 mr-12 big-content">
        <div>
          <div class="text-light">文件名.png</div>
          <div class="text-xs text-lighter mt-1">3.3M</div>
        </div>
        <ElProgress :text-inside="false" :stroke-width="4" :percentage="value" class="mt-2"></ElProgress>
      </div>
      <div class="pt-2">
        <ElButton type="danger">取消</ElButton>
        <ElButton type="primary">暂停上传</ElButton>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import FileIcon from '@/components/ShowFile/components/FileIcon.vue'
import { ElButton, ElProgress } from 'element-plus'
import { useUploadFilesBig } from '../hooks/use-upload-files-big'

const { handleFileUpload } = useUploadFilesBig()

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
