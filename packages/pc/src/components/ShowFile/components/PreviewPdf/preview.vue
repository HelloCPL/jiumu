<!--
  @describe: pdf 预览
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
      <div class="w-full bg py-8 g-scroll-y-visible" style="height: calc(100% - 45px)">
        <div class="w-full flex min-h-full justify-center">
          <div ref="refBox" class="bg-white flex flex-col items-center min-h-full">
            <div v-if="state.error" class="text-center text-lighter pt-10 text-xl" style="min-width: 595px">
              {{ state.error }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { previewProps } from '../type'
import { getFileName, useBodyLocked, useLoading, useWidth } from '@jiumu/utils'
import { computed, onMounted, reactive, ref } from 'vue'
import { PDFDocumentProxy } from 'pdfjs-dist'
import { nextTick } from 'vue'
import { pdfjs } from './load-pdf'
import IconSvg from '../../../IconSvg/index.vue'

const { lockScroll } = useBodyLocked()
lockScroll()

defineOptions({
  name: 'ShowFilePreviewPdfPreviewComponent'
})

const props = defineProps(previewProps)

const refBox = ref<HTMLDivElement>()

let pdfCtx: PDFDocumentProxy

const state = reactive({
  error: '', // 错误提示
  numPages: 0 // 总页数
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

const { width } = useWidth()
const getScale = () => {
  let ratio = window.devicePixelRatio || 1
  if (ratio <= 1) {
    if (width.value >= 1200) return 1.5
    else if (width.value >= 980) return 1.25
  }
  return ratio
}

// 渲染 pdf
const renderPdf = (num: number = 1) => {
  nextTick(() => {
    pdfCtx
      .getPage(num)
      .then((page) => {
        const canvas = document.createElement('canvas')
        const ctx = <CanvasRenderingContext2D>canvas.getContext('2d')
        const viewport = page.getViewport({ scale: getScale() })
        canvas.width = viewport.width
        canvas.height = viewport.height
        const box = page.render({
          canvasContext: ctx,
          viewport
        })
        box.promise
          .then(() => {
            // 在底部绘制页码
            ctx.fillStyle = '#909399'
            ctx.font = '12px Arial, sans-serif'
            ctx.textAlign = 'center'
            ctx.fillText(`${num} / ${state.numPages}`, viewport.width / 2, viewport.height - 12)
            // 绘制分割线
            ctx.beginPath()
            ctx.strokeStyle = '#DCDFE6'
            ctx.lineWidth = 1
            ctx.moveTo(0, viewport.height - 1)
            ctx.lineTo(viewport.width, viewport.height - 1)
            ctx.stroke()

            refBox.value?.appendChild(canvas)
            if (num < state.numPages) {
              setTimeout(() => {
                renderPdf(num + 1)
              }, 100)
            }
            hideLoading()
          })
          .catch(hideLoading)
      })
      .catch(hideLoading)
  })
}

// 加载 pdf 信息
const reloadPdf = (url: string) => {
  if (url) {
    showLoading()
    const loadingTask = pdfjs.getDocument(url)
    loadingTask.promise
      .then((pdf) => {
        pdfCtx = pdf
        state.numPages = pdf.numPages
        if (state.numPages >= 1) renderPdf(1)
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
  reloadPdf(props.url || props.file?.filePath || '')
})
</script>
