<!--
  @describe: 富文本编辑器
  @author: cpl
  @create: 2022-09-04 14:13:08
-->

<template>
  <div class="w-full border-1" :style="{ height: height + 'px' }">
    <div
      class="w-full h-full bg-white flex editor-wang-container"
      :class="{ 'editor-wang-container-fullscreen': isFullScreen }"
      :data-id="editorId"
    >
      <div class="flex-1 shrink-0 flex flex-col">
        <!-- 工具栏 -->
        <div :id="'toolbar-' + id" class="w-full border-b-1 toolbar-container"></div>
        <div class="w-full flex-1 overflow-hidden flex">
          <!-- 编辑器内容 -->
          <div :id="'editor-' + id" class="h-full flex-1 editor-container"></div>
          <!-- 预览 -->
          <div
            class="h-full border-l-1"
            :style="{ width: previewStyle.width + '%', opacity: previewStyle.opacity }"
          ></div>
        </div>
      </div>
      <!-- 标题 -->
      <div
        class="overflow-hidden"
        :style="{ width: catalogStyle.width + 'px', opacity: catalogStyle.opacity }"
      >
        <TitleCatalog :headers="catalogHeaders" @change="handleChangeTitle" v-if="showCatalog" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { initEditorWangCustomMenus } from './hooks/editor-wang-custom-menus'
import { useEditorWang } from './hooks/use-editor-wang'
import { editorWangProps, editorWangEmits } from './type'
import TitleCatalog from './components/TitleCatalog.vue'
import { getRandomId } from '@jiumu/utils'

initEditorWangCustomMenus()

const props = defineProps(editorWangProps)
const emit = defineEmits(editorWangEmits)

const id = getRandomId()
const { editorId, showCatalog, catalogHeaders, catalogStyle, handleChangeTitle, previewStyle, isFullScreen } =
  useEditorWang(props, emit, id)
</script>

<style lang="scss">
@import './index.scss';
</style>
