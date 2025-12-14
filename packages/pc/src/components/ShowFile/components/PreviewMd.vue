<!--
  @describe: md 预览
  @author: cpl
  @create: 2023-04-19 20:43:26
-->

<template>
  <teleport to="body">
    <div class="fixed top-0 left-0 w-screen h-screen overlay preview-md">
      <!-- 关闭按钮 -->
      <span
        class="absolute top-11 right-16 cursor-pointer text-basic-white flex justify-center items-center rounded-full preview-md-close"
        @click="$emit('close')"
      >
        <ElIcon>
          <Close />
        </ElIcon>
      </span>

      <!-- 底部按钮 -->
      <span
        class="g-center-x text-basic-white flex items-center justify-between preview-md-bottom select-none"
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
      <!-- 内容展示 -->
      <div class="w-full g-scroll-y preview-md-content">
        <div class="shadow-lg p-24 pt-28 preview-md-wrapper" :style="{ transform: `scale(${state.scale})` }">
          <EditorMdPreview
            :text="content"
            :is-show-title="false"
            :is-light="true"
            v-if="!isError"
          ></EditorMdPreview>
          <div v-if="isError" class="text-center text-lighter pt-10 text-xl">加载失败!</div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { ElIcon } from 'element-plus'
import { Close, ZoomOut, ZoomIn, FullScreen } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { getFileText } from '@/utils/download-file'
import { useLoading } from '@/utils/interaction'
import EditorMdPreview from '@/components/EditorPreview/components/EditorMdPreview/index.vue'
import { useBodyLocked } from '@/hooks/use-body-locked'

useBodyLocked()

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

const { showLoading, hideLoading } = useLoading()

const isError = ref(false)
const content = ref<string>('')
const getContent = () => {
  showLoading()
  getFileText(props.url, 'utf-8')
    .then((data: any) => {
      content.value = data
      hideLoading()
    })
    .catch(() => {
      isError.value = true
      hideLoading()
    })
}
getContent()

const state = reactive({
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
@use './PreviewMd.scss';
</style>
