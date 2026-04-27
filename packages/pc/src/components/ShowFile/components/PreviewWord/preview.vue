<!--
  @describe: word 预览
  @author cpl
  @update 2022-08-07 16:50:39
-->

<template>
  <div
    class="fixed top-0 left-0 w-screen h-screen overlay z-[999] flex items-center justify-center preview-word-container"
  >
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
      <div class="w-full bg py-8 g-scroll-y-visible" style="height: calc(100% - 45px)">
        <div class="w-full flex min-h-full justify-center">
          <div ref="refContent" class="bg-white flex flex-col items-center min-h-full">
            <div v-if="state.error" class="text-center text-lighter pt-10 text-xl" style="min-width: 794px">
              {{ state.error }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, nextTick, onMounted } from 'vue'
import { getFileBlod, getFileName } from '@jiumu/utils'
import { renderAsync } from 'docx-preview'
import { useLoading } from '@jiumu/utils'
import { useBodyLocked } from '@jiumu/utils'
import { previewProps } from '../type'
import IconSvg from '../../../IconSvg/index.vue'
import { computed } from 'vue'

const { lockScroll } = useBodyLocked()
lockScroll()

defineOptions({
  name: 'ShowFilePreviewWordPreviewComponent'
})

const props = defineProps(previewProps)

const state = reactive({
  error: ''
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

const refContent = ref<HTMLDivElement>()
const reloadWord = (url: string) => {
  if (url) {
    showLoading()
    getFileBlod(url).then((data: any) => {
      nextTick(() => {
        renderAsync(data, refContent.value as HTMLDivElement)
          .then(() => {
            hideLoading()
          })
          .catch(() => {
            state.error = '文件加载失败！'
            hideLoading()
          })
      })
    })
  } else {
    state.error = '文件路径不存在'
  }
}
onMounted(() => {
  reloadWord(props.url || props.file?.filePath || '')
})
</script>

<style lang="scss">
.preview-word-container {
  .docx-wrapper {
    background: var(--jm-color-bg);
    padding: 0;
  }

  .docx-wrapper > section.docx {
    box-shadow: none;
    margin-bottom: 0;
  }
}
</style>
