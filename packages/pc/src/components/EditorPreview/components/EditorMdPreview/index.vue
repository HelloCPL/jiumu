<!--
  @describe: markdown 预览
  @author: cpl
  @create: 2022-10-07 19:49:51
-->

<template>
  <div class="bg-white w-full flex">
    <v-md-preview :text="text" class="flex-1 shrink-0" ref="refPreview"></v-md-preview>
    <div class="affix-md-preview-right" :style="{ width: width + 'px' }" v-if="titleData.length > 3">
      <ElAffix target=".affix-md-preview-right" :offset="40">
        <div class="w-full flex flex-col g-scroll-y title-box">
          <span class="text-lg w-full py-2">目录：</span>
          <GRichText
            class="cursor-pointer text-light mb-4"
            v-for="(item, index) in titleData"
            :key="index"
            :html="item.html"
            @click="handleTitleItem(index)"
          ></GRichText>
        </div>
      </ElAffix>
    </div>
  </div>
  <div style="height: 1200px">哈哈</div>
</template>

<script lang="ts" setup>
import { editorMdPreviewProps } from './type'
import { useIndex } from './index'
import { ElAffix } from 'element-plus'

const props = defineProps(editorMdPreviewProps)

const { refPreview, width, titleData, handleTitleItem } = useIndex(props)
</script>

<style lang="scss">
@import '@/components/Editor/components/EditorMd/index.scss';
</style>

<style lang="scss" scoped>
.title-box {
  max-height: calc(100vh - 50px);
}
</style>
