<!--
  @describe: html 预览组件
  @author: cpl
  @create: 2022-10-07 20:21:28
-->

<template>
  <div class="bg-white w-full flex editor-wang-preiview-container">
    <div :style="{ width: contentWidth }">
      <div :id="'editor-preview-' + id" class="editor-wang-preview"></div>
    </div>
    <div
      class="affix-wang-preview-right shrink-0"
      :style="{ width: width + 'px' }"
      v-if="titleData.length > 3 && !isReload"
    >
      <ElAffix target=".affix-wang-preview-right" :offset="40">
        <div class="w-full h-full relative title-wrapper">
          <!-- 展开收起按钮 -->
          <span
            class="absolute cursor-pointer title-icon"
            :class="{ 'title-icon-arrow': width === 0 }"
            @click="handleClickArrow"
          >
            <ElIcon>
              <ArrowLeftBold></ArrowLeftBold>
            </ElIcon>
          </span>
          <!-- 目录列表 -->
          <div class="h-full overflow-hidden" :style="{ width: width + 'px' }">
            <div style="width: 220px" class="h-full flex flex-col">
              <div class="text-lg w-full h-10 pt-1 bg-white">
                <span>目录：</span>
              </div>
              <div class="flex-1 flex flex-col w-full pt-2 g-scroll-y">
                <span
                  class="cursor-pointer text-light mb-4"
                  v-for="(item, index) in titleData"
                  :key="index"
                  :style="{ 'padding-left': item.paddingLeft }"
                  @click="handleTitleItem(index)"
                >
                  {{ item.text }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </ElAffix>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { editorWangPreviewProps } from './type'
import { useIndex } from './index'
import { ElAffix, ElIcon } from 'element-plus'
import { ArrowLeftBold } from '@element-plus/icons-vue'

const props = defineProps(editorWangPreviewProps)

const { id, width, contentWidth, isReload, titleData, handleTitleItem, handleClickArrow } = useIndex(props)
</script>

<style lang="scss">
@import '@/components/Editor/components/EditorWang/index.scss';
.editor-wang-preiview-container {
  .el-affix {
    width: auto !important;
  }
}
</style>

<style lang="scss" scoped>
.editor-wang-preview {
  padding: 12px 16px;
  box-sizing: border-box;
}

.title-wrapper {
  max-height: calc(100vh - 50px);
}

.title-icon {
  right: 0px;
  top: 5px;
  transition: transform ease 0.5s;
}

.title-icon-arrow {
  transform: rotate(180deg);
}
</style>
