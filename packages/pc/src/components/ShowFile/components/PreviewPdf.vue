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
        class="g-center-x text-basic-white flex items-center justify-between preview-pdf-bottom select-none"
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
          {{ state.pageNum }}/{{ state.numPages }}
        </span>
        <span
          class="text-base cursor-pointer mr-4"
          :class="{ 'preview-page': state.pageNum <= 1 }"
          @click="handleLastPage"
        >上一页</span
        >
        <span
          class="text-base cursor-pointer"
          :class="{ 'preview-page': state.pageNum >= state.numPages }"
          @click="handleNextPage"
        >下一页</span
        >
      </span>
      <div class="w-full g-scroll-y-0 preview-pdf-content">
        <div ref="refBox">
          <VuePdfEmbed
            :source="state.source"
            :page="state.pageNum"
            class="vue-pdf-embed"
            :style="{ transform: `scale(${state.scale}) translateY(${state.translateY}px)` }"
          ></VuePdfEmbed>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { ElIcon } from 'element-plus'
import { Close, ZoomOut, ZoomIn, FullScreen } from '@element-plus/icons-vue'
import { usePreviewPdf } from '../hooks/use-preview-pdf'
import VuePdfEmbed from 'vue-pdf-embed'

const props = defineProps({
  url: {
    type: String,
    require: true,
    default: ''
  }
})
defineEmits({
  close: () => true
})

const { refBox, state, handleZoomOut, handleZoomIn, handleZoom, handleLastPage, handleNextPage } =
  usePreviewPdf(props)
</script>

<style lang="scss" scoped>
@import './PreviewPdf.scss';
</style>
