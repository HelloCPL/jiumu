<!--
  @describe: word 预览
  @author cpl
  @update 2022-08-07 16:50:39
-->

<template>
  <teleport to="body">
    <div class="fixed top-0 left-0 w-screen h-screen overflow-hidden preview-txt">
      <!-- 关闭按钮 -->
      <span
        class="absolute top-11 right-16 cursor-pointer text-basic-white flex justify-center items-center rounded-full preview-txt-close"
        @click="$emit('close')"
      >
        <ElIcon>
          <Close />
        </ElIcon>
      </span>
      <!-- 底部按钮 -->
      <span
        class="g-center-x text-basic-white flex items-center justify-between preview-txt-bottom select-none"
      >
        <ElIcon class="cursor-pointer" @click="handleZoomOut">
          <ZoomOut />
        </ElIcon>
        <ElIcon class="cursor-pointer" @click="handleZoomIn">
          <ZoomIn />
        </ElIcon>
        <ElIcon class="cursor-pointer" @click="handleZoom">
          <FullScreen />
        </ElIcon>
      </span>
      <div class="w-full g-scroll-y preview-txt-content">
        <!-- word 容器 -->
        <div class="preview-word-wrapper" :style="{ transform: `scale(${state.scale}) ` }" ref="refContent">
          <div v-if="isError" class="text-center text-lighter pt-10 text-xl">加载失败!</div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { ElIcon } from 'element-plus'
import { Close, ZoomOut, ZoomIn, FullScreen } from '@element-plus/icons-vue'
import { reactive, ref, nextTick } from 'vue'
import { getFileBlod } from '@/utils/download-file'
import { renderAsync } from 'docx-preview'
import { useLoading } from '@/utils/interaction'
import { useBodyLocked } from '@/hooks/use-body-locked'
import { previewWordEmits, previewWordProps } from './type'

useBodyLocked()

const props = defineProps(previewWordProps)
defineEmits(previewWordEmits)

const isError = ref(false)

const { showLoading, hideLoading } = useLoading()

const refContent = ref<HTMLDivElement>()
const getContent = () => {
  showLoading()
  getFileBlod(props.url).then((data: any) => {
    nextTick(() => {
      renderAsync(data, refContent.value as HTMLDivElement)
        .then(() => {
          hideLoading()
        })
        .catch(() => {
          isError.value = true
          hideLoading()
        })
    })
  })
}
getContent()

const state = reactive({
  translateY: 0,
  scale: 1
})

// 缩小
const handleZoomOut = () => {
  const s = state.scale - 0.1
  state.scale = s < 0.5 ? 0.5 : s
}
// 恢复缩放
const handleZoom = () => {
  state.scale = 1
}
// 放大
const handleZoomIn = () => {
  const s = state.scale + 0.1
  state.scale = s > 2.5 ? 2.5 : s
}
</script>

<style lang="scss" scoped>
@forward '../PreviewTxt.scss';
</style>
