<!--
  @describe: markdown 预览
  @author: cpl
  @create: 2022-10-07 19:49:51
-->

<template>
  <div
    class="w-full flex relative editor-md-preiview-container"
    :class="{ 'editor-md-preview-light': isLight }"
  >
    <div :style="{ width: contentWidth }">
      <v-md-preview :text="text" ref="refPreview" @copy-code-success="handleCopySuccess"></v-md-preview>
    </div>
    <!-- 目录  -->
    <div
      class="affix-md-preview-right bg-white shrink-0 pl-2"
      :class="previewTitleClass"
      :style="{ width: width + 'px', 'z-index': 999 }"
      v-if="titleData.length > 3 && !isReload"
    >
      <ElAffix target=".affix-md-preview-right" :offset="40">
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
              <div class="text-lg w-full h-10 pt-1 preview-bg-white">
                <span>目录：</span>
              </div>
              <div class="flex-1 flex flex-col w-full pt-2 g-scroll-y">
                <GRichText
                  class="cursor-pointer mb-4 preview-text-light"
                  v-for="(item, index) in titleData"
                  :key="index"
                  :html="item.html"
                  @click="handleTitleItem(index)"
                ></GRichText>
              </div>
            </div>
          </div>
        </div>
      </ElAffix>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { editorMdPreviewProps } from './type'
import { useIndex } from './index'
import { ElAffix, ElIcon } from 'element-plus'
import { ArrowLeftBold } from '@element-plus/icons-vue'
import { useMarkdownInit } from '@/components/Editor/components/EditorMd/hooks/use-markdown-init'

useMarkdownInit()

const props = defineProps(editorMdPreviewProps)

const {
  isReload,
  refPreview,
  width,
  contentWidth,
  previewTitleClass,
  titleData,
  handleTitleItem,
  handleClickArrow,
  handleCopySuccess
} = useIndex(props)
</script>

<style lang="scss">
@forward '@/components/Editor/components/EditorMd/index.scss';
@forward '@/components/Editor/components/EditorMd/index-theme.scss';
@forward '@/components/Editor/components/EditorMd/index-mermaid.scss';
@forward './index.scss';

.editor-md-preiview-container {
  background: var(--jm-color-white);
  color: var(--jm-color-text);

  .el-affix {
    width: auto !important;
  }
}
</style>

<style lang="scss" scoped>
.title-wrapper {
  max-height: calc(100vh - 50px);
}

.title-icon {
  right: 0px;
  top: 5px;
  transition: transform ease 0.5s;
  transform: rotate(180deg);
}

.title-icon-arrow {
  transform: rotate(0deg);
}

.preview-bg-white {
  background: var(--jm-color-white);
}

.preview-text-light {
  color: var(--jm-color-text-light);
}
</style>
