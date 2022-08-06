<!--
  @describe: 文件上传组件
  @author: cpl
  @create: 2022-08-05 17:08:43
-->

<template>
  <ElUpload action="/" :show-file-list="false">
    <slot> 上传 </slot>
  </ElUpload>
</template>

<script lang="ts" setup>
import { ElUpload } from 'element-plus'
import { uploadProps } from './type'

const props = defineProps(uploadProps)
</script>
