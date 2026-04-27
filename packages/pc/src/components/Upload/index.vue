<!--
  @describe: 文件上传组件
  @author: cpl
  @create: 2022-08-05 17:08:43
-->

<template>
  <ElUpload
    v-bind="mergeProps($attrs, props)"
    ref="refUpload"
    class="custom-upload-container"
    :class="{
      'upload-container-disabled': disabled || _limit <= 0,
      'inline-block': !drag,
      'w-full': drag
    }"
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
  >
    <slot>
      <template v-if="drag">
        <div class="w-full h-28 flex flex-col items-center justify-center text-lighter hover:text-primary">
          <el-icon size="var(--jm-font-size-large)"><UploadFilled /></el-icon>
          <span class="mt-2 text-xs">拖拽或点击上传</span>
          <span class="mt-2 text-xs text-lighter g-line-2" v-if="placeholder">{{ placeholder }}</span>
        </div>
      </template>
      <template v-else-if="type === 'images'">
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
          <span class="mt-2 text-xs text-lighter g-line-1" v-if="placeholder">{{ placeholder }}</span>
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
  <UploadFilesBig
    ref="refUploadFilesBig"
    :type="type"
    :add-file-chunk-api="props.addFileChunkApi"
    :merge-file-chunk-api="props.mergeFileChunkApi"
    :verify-file-chunk-api="props.verifyFileChunkApi"
    :delete-file-chunk-api="props.deleteFileChunkApi"
    @change="handleChangeFilesBig"
    v-if="uploadType === 'files_big' || uploadType === 'auto'"
  ></UploadFilesBig>
  <LazyLoader>
    <Cropper
      v-if="cropperState.show"
      :file="cropperState.file"
      :config="cropperConfig"
      @close="cropperState.show = false"
      @confirm="confirmCropper"
    ></Cropper>
  </LazyLoader>
</template>

<script lang="ts" setup>
import { ElUpload, ElButton, ElIcon } from 'element-plus'
import { Plus, UploadFilled } from '@element-plus/icons-vue'
import { uploadProps, uploadEmits } from './type'
import { useIndex } from './hooks/use-index'
import UploadFilesBig from './components/UploadFilesBig.vue'
import { defineAsyncComponent, mergeProps } from 'vue'
import LazyLoader from '../LazyLoader/index.vue'

const Cropper = defineAsyncComponent(() => import('./components/Cropper.vue'))

defineOptions({
  name: 'UploadComponent',
  inheritAttrs: false
})

const props = defineProps(uploadProps)
const emit = defineEmits(uploadEmits)
const {
  refUpload,
  refUploadFilesBig,
  _accept,
  _limit,
  cropperState,
  confirmCropper,
  onChange,
  onExceed,
  beforeUpload,
  httpRequest
} = useIndex(props, emit)

const handleChangeFilesBig = (files: DataBaseFile[]) => {
  emit('change', files)
}
</script>

<style lang="scss">
.upload-container-disabled {
  .el-upload {
    cursor: not-allowed;
  }
}

.custom-upload-container {
  .el-upload-dragger {
    padding: 0;
  }
}
</style>
