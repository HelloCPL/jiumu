<!--
  @describe: 图片预览
  @author cpl
  @update 2022-08-07 16:12:18
-->

<template>
  <ElImageViewer :url-list="urlList" :z-index="99999" @close="handleClose"></ElImageViewer>
</template>

<script lang="ts" setup>
import { ElImageViewer } from 'element-plus'
import { previewProps } from '../type'
import { computed } from 'vue'

defineOptions({
  name: 'ShowFilePreviewImagePreviewComponent'
})

const props = defineProps(previewProps)

const urlList = computed(() => {
  if (props.url) return [props.url]
  else if (props.file?.filePath) return [props.file.filePath]
  return []
})

const handleClose = () => {
  props.close && props.close()
}
</script>
