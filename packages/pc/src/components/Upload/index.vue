<!--
  @describe: 文件上传组件
  @author: cpl
  @create: 2022-08-05 17:08:43
-->

<template>
  <ElUpload
    ref="refUpload"
    class="inline-block"
    :class="{ 'upload-container-disabled': disabled || _limit <= 0 }"
    action="/"
    :accept="_accept"
    :show-file-list="false"
    :disabled="disabled || _limit <= 0"
    :limit="_limit"
    :multiple="multiple"
    :on-change="onChange"
    :on-exceed="onExceed"
    :before-upload="beforeUpload"
    :http-request="httpRequest"
    v-bind="$attrs"
  >
    <slot>
      <template v-if="type === 'images'">
        <div
          class="flex flex-col justify-center items-center text-lighter w-28 h-28 border border-dashed rounded-sm"
          :class="{
            'hover:text-primary': !disabled && _limit > 0,
            'hover:border-primary': !disabled && _limit > 0
          }"
        >
          <ElIcon size="var(--jm-font-size-medium)">
            <Plus />
          </ElIcon>
          <span class="mt-2 text-xs">点击上传</span>
        </div>
      </template>
      <template v-else>
        <ElButton type="primary" class="px-6" :disabled="disabled || _limit <= 0">
          <ElIcon>
            <Plus />
          </ElIcon>
          <span class="pl-1">点击上传</span>
        </ElButton>
      </template>
    </slot>
  </ElUpload>
  <UploadFilesBig></UploadFilesBig>
</template>

<script lang="ts" setup>
import { ElUpload, ElButton, ElIcon } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { uploadProps, uploadEmits } from './type'
import { useIndex } from './hooks/use-index'
import UploadFilesBig from './components/UploadFilesBig.vue'

defineOptions({
  inheritAttrs: false
})

const props = defineProps(uploadProps)
const emit = defineEmits(uploadEmits)
const { refUpload, _accept, _limit, onChange, onExceed, beforeUpload, httpRequest } = useIndex(props, emit)
</script>

<style lang="scss">
.upload-container-disabled {
  .el-upload {
    cursor: not-allowed;
  }
}
</style>
