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
      <div class="w-full preview-excel-content">
        <!-- word 容器 -->
        <div class="preview-excel-wrapper" id="preview-excel-wrapper">
          <div v-if="isError" class="text-center text-lighter pt-10 text-xl">加载失败!</div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { ElIcon } from 'element-plus'
import { Close } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import { Message, useLoading } from '@/utils/interaction'
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

const isError = ref(false)

const { showLoading, hideLoading } = useLoading()

const getContent = () => {
  if (!window.LuckyExcel) {
    Message('luckyexcel.umd.js文件缺失')
    return
  }
  showLoading()
  window.LuckyExcel.transformExcelToLuckyByUrl(props.url, '', (json: any) => {
    if (json.sheets === null || json.sheets.length === 0) {
      isError.value = true
      hideLoading()
      Message('文件读取失败')
      return
    }
    if (!window.luckysheet) {
      isError.value = true
      hideLoading()
      Message('luckysheet.umd.js文件缺失')
      return
    }
    window.luckysheet.destroy()
    window.luckysheet.create({
      container: 'preview-excel-wrapper', // 设定DOM容器的id
      lang: 'zh',
      column: 2,
      row: 2,
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
}

onMounted(getContent)
</script>

<style lang="scss" scoped>
@forward '../PreviewTxt.scss';
</style>
