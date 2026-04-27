<!--
  @describe: 普通文本文件 预览
  @author cpl
  @update 2022-08-07 16:50:39
-->

<template>
  <div class="fixed top-0 left-0 w-screen h-screen overlay z-[999] flex items-center justify-center">
    <div style="width: 80%; height: 90%" class="bg-white border-1 shadow">
      <!-- 头部 -->
      <div class="w-full h-12 border-b-1 px-4 flex items-center justify-between" style="height: 45px">
        <span>{{ title }}</span>
        <IconSvg
          name="close"
          :size="18"
          fill="var(--jm-color-text-light)"
          hover-fill="var(--jm-color-danger)"
          class="cursor-pointer"
          @click="handleClose"
        ></IconSvg>
      </div>
      <!-- 内容区 -->
      <div class="w-full bg p-8 g-scroll-y-visible" style="height: calc(100% - 45px)">
        <div class="w-full h-full" id="preview-conent-wrapper">
          <EditorAcePreview
            :value="state.content"
            :lang="props.lang"
            :theme="props.theme"
            :height="state.height"
            :show-header="true"
            v-if="!state.error"
            class="w-full"
          ></EditorAcePreview>
          <div v-if="state.error" class="text-center text-lighter pt-10 text-xl">{{ state.error }}!</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, reactive } from 'vue'
import { getElementRect, getFileName, getFileText, getTargetElement } from '@jiumu/utils'
import { useLoading } from '@jiumu/utils'
import { useBodyLocked } from '@jiumu/utils'
import { previewCommonProps } from '../type'
import IconSvg from '../../../IconSvg/index.vue'
import EditorAcePreview from '../../../EditorPreview/components/EditorAcePreview/index.vue'
const { lockScroll } = useBodyLocked()
lockScroll()

defineOptions({
  name: 'ShowFilePreviewCommonPreviewComponent'
})

const props = defineProps(previewCommonProps)

const state = reactive({
  content: '',
  height: 520,
  error: '' // 错误提示
})

const title = computed(() => {
  let title = ''
  if (props.file?.fileName) title = props.file.fileName
  else if (props.file?.filePath) title = getFileName(props.file.filePath)
  else if (props.url) title = getFileName(props.url)
  return title + '预览'
})

const handleClose = () => {
  props.close && props.close()
}

const { showLoading, hideLoading } = useLoading()

const reloadContent = (url: string) => {
  if (url) {
    showLoading()
    getFileText(url).then((data: any) => {
      hideLoading()
      if (data) {
        state.content = data
        nextTick(() => {
          const el = getTargetElement('#preview-conent-wrapper')
          if (el) {
            const rect = getElementRect(el)
            state.height = Math.round(rect.height) || 520
          }
        })
      } else {
        state.error = '文件加载失败！'
      }
    })
  } else {
    state.error = '文件路径不存在'
  }
}
onMounted(() => {
  reloadContent(props.url || props.file?.filePath || '')
})
</script>
