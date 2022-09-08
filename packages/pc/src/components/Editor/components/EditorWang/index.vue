<!--
  @describe: 富文本编辑器
  @author: cpl
  @create: 2022-09-04 14:13:08
-->

<template>
  <div class="bg-white flex flex-col editor-wang-container" v-if="editorConfig && toolbarConfig">
    <!-- 工具栏 -->
    <!-- <div id="toolbar-container"></div>
    <div id="editor-container"></div> -->
    <Toolbar
      class="shrink-0 w-full"
      :editor="refEditor"
      :default-config="toolbarConfig"
      v-if="refEditor"
    ></Toolbar>
    <!-- 编辑器内容 -->
    <Editor
      class="flex-1 editor-wang-content"
      :default-config="editorConfig"
      v-model="value"
      @onCreated="handleCreated"
      @onChange="handleChange"
      @onDestoryed="handleDestoryed"
      @onFocus="handleFocus"
      @onBlur="handleBlur"
      @customAlert="handleCustomAlert"
      @customPaste="handleCustomPaste"
    ></Editor>
    <!-- <div style="margin-top: 10px">
      <textarea v-model="value" readonly style="width: 100%; height: 200px; outline: none"></textarea>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { useEditorWang } from './hooks/use-editor-wang'
import { editorWangProps } from './type'
const props = defineProps(editorWangProps)
const {
  toolbarConfig,
  editorConfig,
  refEditor,
  value,
  handleCreated,
  handleChange,
  handleDestoryed,
  handleFocus,
  handleBlur,
  handleCustomAlert,
  handleCustomPaste
} = useEditorWang(props)
</script>

<style lang="scss">
@import './index.scss';
</style>
