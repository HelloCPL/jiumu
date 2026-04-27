<!--
  @describe: md 预览
  @author: cpl
  @create: 2023-04-19 20:43:26
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
        <div class="w-full flex min-h-full justify-center">
          <EditorMdPreview
            :text="state.content"
            :is-show-title="false"
            :is-light="true"
            :is-init="false"
            v-if="!state.error"
            class="w-full"
          ></EditorMdPreview>
          <div v-if="state.error" class="text-center text-lighter pt-10 text-xl">{{ state.error }}!</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive } from 'vue'
import { getFileName, getFileText } from '@jiumu/utils'
import { useLoading } from '@jiumu/utils'
import EditorMdPreview from '../../../EditorPreview/components/EditorMdPreview/index.vue'
import { useBodyLocked } from '@jiumu/utils'
import { previewProps } from '../type'
import IconSvg from '../../../IconSvg/index.vue'

const { lockScroll } = useBodyLocked()
lockScroll()

defineOptions({
  name: 'ShowFilePreviewMdPreviewComponent'
})

const props = defineProps(previewProps)

const { showLoading, hideLoading } = useLoading()

const state = reactive({
  error: '', // 错误提示
  content: ''
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

const reloadMarkdown = (url: string) => {
  if (url) {
    showLoading()
    getFileText(url)
      .then((data: any) => {
        state.content = data
        hideLoading()
      })
      .catch(() => {
        state.error = '文件加载失败！'
        hideLoading()
      })
  } else {
    state.error = '文件路径不存在'
  }
}
onMounted(() => {
  reloadMarkdown(props.url || props.file?.filePath || '')
})
</script>
