<!--
  @describe: 图片预览
  @author cpl
  @update 2022-08-07 16:12:18
-->

<template>
  <ElImageViewer
    :url-list="urlList"
    :teleported="teleported"
    :infinite="infinite"
    :z-index="zIndex"
  ></ElImageViewer>
</template>

<script lang="ts" setup>
import { ElImageViewer } from 'element-plus'
import { previewImageProps } from './type'

defineProps(previewImageProps)
</script>
