<!--
  @describe: 富文本编辑器 https://editor.aomao.com/zh-CN
  @author: cpl
  @create: 2022-10-07 21:24:51
-->

<template>
  <div class="w-full bg-white flex flex-col editor-aomao" style="height: 500px">
    <!-- 工具栏 -->
    <AmToolbar :engine="engine" :items="items"></AmToolbar>
    <div class="flex-1 flex w-full">
      <!-- 编辑器 -->
      <div class="flex-1 h-full bg-black-1" ref="refEditorAoMao"></div>
      <!-- 标题导航 -->
      <div class="h-full" style="width: 200px">hahah</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AmToolbar from '@aomao/toolbar-vue'
// import
import { editorAoMaoProps, editorAoMaoEmits } from './type'
import { useEditorAoMaoIndex } from './hooks/use-editor-aomao-index'
import { handleToolbarConfig } from './hooks/handle-editor-aomao-config'
const props = defineProps(editorAoMaoProps)
const emit = defineEmits(editorAoMaoEmits)

const { items } = handleToolbarConfig()

const { refEditorAoMao, engine } = useEditorAoMaoIndex(props, emit)
</script>

<style lang="scss">
@import './index.scss';
</style>
