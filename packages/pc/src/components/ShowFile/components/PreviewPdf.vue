<!--
  @describe: pdf 预览
  @author cpl
  @update 2022-08-07 16:50:39
-->

<template>
  <teleport to="body">
    <div class="fixed top-0 left-0 w-screen h-screen preview-pdf">
      <!-- 关闭按钮 -->
      <span
        class="absolute top-11 right-16 cursor-pointer text-basic-white flex justify-center items-center rounded-full preview-pdf-close"
        @click="$emit('close')"
      >
        <ElIcon>
          <Close />
        </ElIcon>
      </span>
      <!-- 底部按钮 -->
      <span
        class="g-center-x text-basic-white flex items-center justify-between select-none preview-pdf-bottom"
      >
        <ElIcon class="mr-4 cursor-pointer" @click="handleZoomOut">
          <ZoomOut />
        </ElIcon>
        <ElIcon class="mr-4 cursor-pointer" @click="handleZoomIn">
          <ZoomIn />
        </ElIcon>
        <ElIcon class="cursor-pointer" @click="handleZoom">
          <FullScreen />
        </ElIcon>
        <span class="text-base flex-1 flex justify-center items-center">
          <span>共</span>
          <span class="px-1">{{ state.numPages }}</span>
          <span>页</span>
        </span>
      </span>
      <div class="w-full g-scroll-y preview-pdf-content">
        <LazyLoader>
          <div
            ref="refBox"
            class="flex flex-col preview-pdf-wrapper"
            :style="{ transform: `scale(${state.scale}) ` }"
          >
            <div v-if="state.isError" class="text-center text-lighter pt-10 text-xl">加载失败!</div>
          </div>
        </LazyLoader>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { ElIcon } from 'element-plus'
import { Close, ZoomOut, ZoomIn, FullScreen } from '@element-plus/icons-vue'
import { usePreviewPdf } from '../hooks/use-preview-pdf'
import LazyLoader from '@/components/LazyLoader/index.vue'
import { previewPdfProps, previewPdfEmit } from './type'
import { useBodyLocked } from '@/hooks/use-body-locked'

useBodyLocked()

const props = defineProps(previewPdfProps)

defineEmits(previewPdfEmit)

const { refBox, state, handleZoomOut, handleZoomIn, handleZoom } = usePreviewPdf(props)
</script>

<style lang="scss" scoped>
@import './PreviewPdf.scss';
</style>
