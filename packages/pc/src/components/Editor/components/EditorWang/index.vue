<!--
  @describe: 富文本编辑器
  @author: cpl
  @create: 2022-09-04 14:13:08
-->

<template>
  <div class="w-full bg-white flex border-1 editor-wang-container">
    <!-- 编辑器  -->
    <div class="flex-1">
      <!-- 工具栏 -->
      <div :id="'toolbar-' + id" class="toolbar-container"></div>
      <!-- 编辑器内容 -->
      <div :id="'editor-' + id" class="editor-container"></div>
    </div>
    <!-- 标题 -->
    <TitleCatalog :active="showCatalog" :headers="catalogHeaders" @change="handleChangeTitle" />
  </div>
</template>

<script lang="ts" setup>
import { useEditorWang } from './hooks/use-editor-wang'
import { editorWangProps } from './type'
import TitleCatalog from './components/TitleCatalog.vue'
import { getRandomId } from '@jiumu/utils'

const props = defineProps(editorWangProps)
const emit = defineEmits(['update:modelValue', 'change', 'blur', 'focus'])

const id = getRandomId()

const { showCatalog, catalogHeaders, handleChangeTitle } = useEditorWang(props, emit, id)
</script>

<style lang="scss">
@import './index.scss';
</style>
