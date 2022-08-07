/**
 * pdf 预览处理逻辑
 */

import { ref, reactive, onMounted, nextTick } from 'vue'
import { createLoadingTask } from 'vue3-pdfjs'

export const usePreviewPdf = (props: any) => {
  // 动态计算pdf容器高度
  const refBox = ref<HTMLDivElement>()
  const boxH = ref<number>(0)
  const setBox = (s: number) => {
    nextTick(() => {
      if (!refBox.value) return
      if (!boxH.value) boxH.value = refBox.value.offsetHeight || refBox.value.clientHeight
      // if (s >= 1) {
      state.translateY = boxH.value * (s - 1) * (0.53 / s)
      // }
    })
  }

  const state = reactive({
    source: props.url,
    pageNum: 1, // 当前页
    scale: 1,
    translateY: 0,
    numPages: 0
  })

  // 缩小
  const handleZoomOut = () => {
    const s = state.scale - 0.1
    state.scale = s < 0.5 ? 0.5 : s
    setBox(state.scale)
  }
  // 放大
  const handleZoomIn = () => {
    const s = state.scale + 0.1
    state.scale = s > 2.5 ? 2.5 : s
    setBox(state.scale)
  }
  // 恢复缩放
  const handleZoom = () => {
    state.scale = 1
    setBox(state.scale)
  }
  // 上一页
  const handleLastPage = () => {
    if (state.pageNum <= 1) return
    state.pageNum -= 1
  }
  // 下一页
  const handleNextPage = () => {
    if (state.pageNum >= state.numPages) return
    state.pageNum += 1
  }

  // 获取总页数
  const getTotal = () => {
    const loadingTask = createLoadingTask(state.source)
    loadingTask.promise.then((pdf) => {
      state.numPages = pdf.numPages
    })
  }
  onMounted(getTotal)

  return {
    refBox,
    state,
    handleZoomOut,
    handleZoomIn,
    handleZoom,
    handleLastPage,
    handleNextPage
  }
}
