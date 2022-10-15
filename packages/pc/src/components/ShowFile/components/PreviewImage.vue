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
import { PropType } from 'vue'

defineProps({
  // 其他参数与ElImageViewer保持一致
  urlList: {
    type: Array as PropType<string[]>,
    require: true,
    default: () => []
  },
  teleported: {
    type: Boolean,
    default: true
  },
  infinite: {
    type: Boolean,
    default: false
  },
  zIndex: {
    type: Number,
    default: 999
  }
})
</script>
