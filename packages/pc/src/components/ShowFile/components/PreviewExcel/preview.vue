<!--
  @describe: word 预览
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
      <div class="w-full bg-white p-8" style="height: calc(100% - 45px)">
        <div class="w-full h-full bg-white" id="preview-excel-wrapper">
          <div v-if="state.error" class="text-center text-lighter pt-10 text-xl">
            {{ state.error }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, reactive } from 'vue'
import { getFileName, Message, useLoading } from '@jiumu/utils'
import { useBodyLocked } from '@jiumu/utils'
import { Luckyexcel, Luckysheet } from './load-lucky'
import { previewProps } from '../type'
import IconSvg from '../../../IconSvg/index.vue'

const { lockScroll } = useBodyLocked()
lockScroll()

defineOptions({
  name: 'ShowFilePreviewExcelPreviewComponent'
})

const props = defineProps(previewProps)

const state = reactive({
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

let luckysheetInstance: any = null
const cleanup = () => {
  if (luckysheetInstance) {
    Luckysheet.destroy()
    luckysheetInstance = null
  }
}
onBeforeUnmount(cleanup)

const { showLoading, hideLoading } = useLoading()

const reloadExcel = (url: string) => {
  if (url) {
    showLoading()
    Luckyexcel.transformExcelToLuckyByUrl(url, '', (json: any) => {
      if (json.sheets === null || json.sheets.length === 0) {
        state.error = '文件加载失败！'
        hideLoading()
        Message('文件加载失败！')
        return
      }
      cleanup()
      luckysheetInstance = Luckysheet.create({
        container: 'preview-excel-wrapper', // 设定DOM容器的id
        lang: 'zh',
        // column: 2,
        // row: 2,
        defaultFontSize: 14,
        lintOnSave: false,
        allowCopy: false,
        showtoolbar: false, // 是否显示工具栏
        showinfobar: false, // 是否显示顶部信息栏
        // showstatisticBar: false, // 是否显示底部计数栏
        // sheetBottomConfig: false, // sheet页下方的添加行按钮和回到顶部按钮配置
        allowEdit: false, // 是否允许前台编辑
        enableAddRow: false, // 是否允许增加行
        enableAddCol: false, // 是否允许增加列
        sheetFormulaBar: false, // 是否显示公式栏
        enableAddBackTop: false, //返回头部按钮
        data: json.sheets //表格内容
      })
      hideLoading()
    })
  } else {
    state.error = '文件路径不存在'
  }
}

onMounted(() => {
  reloadExcel(props.url || props.file?.filePath || '')
})
</script>
