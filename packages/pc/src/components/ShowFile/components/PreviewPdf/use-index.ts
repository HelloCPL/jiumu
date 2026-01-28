/**
 * pdf 预览处理逻辑
 */

import { ref, reactive, nextTick, watch } from 'vue'
import { useLoading } from '@/utils/interaction'
import { PreviewPdfProps } from '../../components/type'
import * as pdfjs from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'
import { PDFDocumentProxy } from 'pdfjs-dist'

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker

export const usePreviewPdf = (props: PreviewPdfProps) => {
  // 动态计算pdf容器高度
  const refBox = ref<HTMLDivElement>()

  const { showLoading, hideLoading } = useLoading()

  let pdfCtx: PDFDocumentProxy
  const state = reactive<any>({
    isError: false, // 是否出错
    scale: 1,
    numPages: 0
  })

  // 缩小
  const handleZoomOut = () => {
    const s = state.scale - 0.1
    state.scale = s < 0.5 ? 0.5 : s
  }
  // 放大
  const handleZoomIn = () => {
    const s = state.scale + 0.1
    state.scale = s > 2.5 ? 2.5 : s
  }
  // 恢复缩放
  const handleZoom = () => {
    state.scale = 1
  }

  // 加载 pdf 信息
  const resolvePdf = (url: string) => {
    showLoading()
    const loadingTask = pdfjs.getDocument(url)
    loadingTask.promise
      .then((pdf) => {
        pdfCtx = pdf
        state.numPages = pdf.numPages
        if (state.numPages >= 1) renderPdf(1)
      })
      .catch(() => {
        state.isError = true
        hideLoading()
      })
  }

  let i = 0
  const renderPdf = (num: number = 1) => {
    setTimeout(() => {
      if (refBox.value) {
        _renderPdf(num)
      } else if (i < 5) {
        i++
        renderPdf(num)
      }
    }, 0)
  }

  // 渲染 pdf
  const _renderPdf = (num: number = 1) => {
    nextTick(() => {
      pdfCtx
        .getPage(num)
        .then((page) => {
          const canvas = document.createElement('canvas')
          const ctx = <CanvasRenderingContext2D>canvas.getContext('2d')
          const viewport = page.getViewport({ scale: 1 })
          canvas.width = viewport.width
          canvas.height = viewport.height
          const box = page.render({
            canvasContext: ctx,
            viewport
          })
          box.promise
            .then(() => {
              refBox.value?.appendChild(canvas)
              if (num < state.numPages) {
                setTimeout(() => {
                  _renderPdf(num + 1)
                }, 100)
              }
              hideLoading()
            })
            .catch(hideLoading)
        })
        .catch(hideLoading)
    })
  }
  watch(
    () => props.url,
    (val) => {
      if (val) {
        resolvePdf(val)
      }
    },
    { immediate: true }
  )

  return {
    refBox,
    state,
    handleZoomOut,
    handleZoomIn,
    handleZoom,
    renderPdf
  }
}
