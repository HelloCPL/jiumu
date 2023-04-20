<!--
  @describe: 富文本编辑器预览组件
  @author: cpl
  @create: 2022-10-07 19:48:52
-->

<template>
  <div class="w-full">
    <LazyLoader>
      <EditorWangPreview
        :value="value"
        :is-show-title="isShowTitle"
        v-if="type === '401'"
      ></EditorWangPreview>
      <EditorMdPreview
        :text="value"
        :is-show-title="isShowTitle"
        v-else-if="type === '402'"
      ></EditorMdPreview>
    </LazyLoader>
  </div>
</template>

<script lang="ts" setup>
import { editorPreviewProps } from './type'
import { defineAsyncComponent } from 'vue'
import LazyLoader from '@/components/LazyLoader/index.vue'

const EditorMdPreview = defineAsyncComponent(() => import('./components/EditorMdPreview/index.vue'))
const EditorWangPreview = defineAsyncComponent(() => import('./components/EditorWangPreview/index.vue'))

defineProps(editorPreviewProps)
</script>
