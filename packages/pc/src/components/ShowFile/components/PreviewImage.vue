<!--
  @describe: 图片预览
  @author cpl
  @update 2022-08-07 16:12:18
-->

<template>
  <ElImageViewer :url-list="urlList" :teleported="teleported" :infinite="infinite"></ElImageViewer>
</template>

<script lang="ts" setup>
import { ElImageViewer } from 'element-plus'
import { PropType } from 'vue'

defineProps({
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
  }
})
</script>
