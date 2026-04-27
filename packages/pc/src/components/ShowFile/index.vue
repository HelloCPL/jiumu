<!--
  @describe: 文件列表展示组件
  @author cpl
  @update 2022-08-07 01:10:59
-->

<template>
  <div class="w-full">
    <div
      class="w-full flex items-center py-2 mb-4 hover:bg show-file-wrapper"
      v-for="(item, index) in modelValue"
      :key="item.id"
    >
      <span class="flex items-center">
        <FileIcon :value="item.filePath" />
        <span class="pl-4">{{ item.fileName }}</span>
        <span class="pl-4 text-sm text-lighter pt-0.5">{{ formatFileSize(item.fileSize) }}</span>
      </span>
      <!-- 操作按钮 -->
      <div class="flex gap-x-4 ml-8" :class="showClass">
        <span
          class="flex items-center cursor-pointer text-sm text-lighter hover:text-primary"
          @click="previewFile({ file: item })"
          v-if="showPreView(item.suffix)"
        >
          <ElIcon>
            <View />
          </ElIcon>
          <span class="pl-1">预览</span>
        </span>
        <span
          class="flex items-center cursor-pointer text-sm text-lighter hover:text-primary"
          @click="downloadFile(item)"
          v-if="isDownload"
        >
          <ElIcon>
            <Download />
          </ElIcon>
          <span class="pl-1">下载</span>
        </span>
        <span
          class="flex items-center cursor-pointer text-sm text-lighter hover:text-primary"
          @click="handleDelete(item, index)"
          v-if="isDelete"
        >
          <ElIcon>
            <Delete />
          </ElIcon>
          <span class="pl-1">删除</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { showFileProps, showFileEmits } from './type'
import { ElIcon } from 'element-plus'
import { View, Download, Delete } from '@element-plus/icons-vue'
import FileIcon from './components/FileIcon/index.vue'
import { Confirm, downloadFile } from '@jiumu/utils'
import { useWidth, formatFileSize } from '@jiumu/utils'
import { computed } from 'vue'
import { getPreviewFileType } from './hooks/utils'
import { previewFile } from './hooks/preview-file'
import { deleteFile } from '../../api/file'

defineOptions({
  name: 'ShowFileComponent'
})

const props = defineProps(showFileProps)
const emit = defineEmits(showFileEmits)

const computedDeleteFileApi = computed(() => props.deleteFileApi || deleteFile)
const handleDelete = (file: DataBaseFile, index: number) => {
  Confirm('确定删除这个文件吗？').then(async () => {
    await computedDeleteFileApi.value(file.id, false)
    const arr = props.modelValue
    const item = arr.splice(index, 1)
    emit('update:modelValue', arr)
    emit('change', arr, item)
  })
}

const { width } = useWidth()
const showClass = computed(() => {
  if (width.value <= 768) return ''
  return 'show-file-box'
})

const showPreView = (suffix: string) => {
  return !!getPreviewFileType(suffix)
}
</script>

<style lang="scss" scoped>
.show-file-box {
  visibility: hidden;
}
.show-file-wrapper:hover .show-file-box {
  visibility: visible;
}
</style>
