<!--
  @describe: word 预览
  @author cpl
  @update 2022-08-07 16:50:39
-->

<template>
  <teleport to="body">
    <div class="fixed top-0 left-0 w-screen h-screen preview-txt">
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
      <div class="w-full g-scroll-y-0 preview-txt-content">
        <div ref="refBox">
          <!-- word 容器 -->
          <div
            class="preview-word-wrapper"
            :style="{ transform: `scale(${state.scale}) translateY(${state.translateY}px)` }"
            ref="refContent"
          ></div>
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

const refContent = ref<HTMLDivElement>()
const getContent = () => {
  getFileBlod(props.url).then((data: any) => {
    nextTick(() => {
      renderAsync(data, refContent.value as HTMLDivElement)
    })
  })
}
getContent()

// 动态计算pdf容器高度
const refBox = ref<HTMLDivElement>()
const boxH = ref<number>(0)
const setBox = (s: number) => {
  nextTick(() => {
    if (!refBox.value) return
    if (!boxH.value) boxH.value = refBox.value.offsetHeight || refBox.value.clientHeight
    state.translateY = boxH.value * (s - 1) * (0.5 / s)
  })
}

const state = reactive({
  translateY: 0,
  scale: 1
})

// 缩小
const handleZoomOut = () => {
  const s = state.scale - 0.1
  state.scale = s < 0.5 ? 0.5 : s
  setBox(state.scale)
}
// 恢复缩放
const handleZoom = () => {
  state.scale = 1
  setBox(state.scale)
}
// 放大
const handleZoomIn = () => {
  const s = state.scale + 0.1
  state.scale = s > 2.5 ? 2.5 : s
  setBox(state.scale)
}
</script>

<style lang="scss" scoped>
@import './PreviewTxt.scss';
</style>
