<!--
  @cpl
  @create 2026-04-11 21:37:27
  @description 代码编辑器预览
-->

<template>
  <IndexEditorAcePreview
    :model-value="props.value"
    v-bind="mergeAttrs"
    :readonly="true"
  ></IndexEditorAcePreview>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, useAttrs } from 'vue'
import { editorAcePreviewProps } from './type'

const IndexEditorAcePreview = defineAsyncComponent(
  () => import('../../../Editor/components/EditorAce/index.vue')
)

defineOptions({
  name: 'EditorAcePreviewComponent'
})

const props = defineProps(editorAcePreviewProps)

const attrs = useAttrs()
const mergeAttrs = computed(() => {
  return { ...attrs, ...props }
})
</script>
