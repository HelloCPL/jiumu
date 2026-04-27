<template>
  <LazyLoader :preload-resources="getMermaid">
    <IndexEditorMd
      ref="refEditor"
      v-bind="mergeAttrs"
      @update:model-value="(...args) => emit('update:modelValue', ...args)"
      @change="(...args) => emit('change', ...args)"
      @save="(...args) => emit('save', ...args)"
    ></IndexEditorMd>
  </LazyLoader>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, ref, useAttrs } from 'vue'
import LazyLoader from '../../../LazyLoader/index.vue'
import { editorMarkdownEmits, editorMarkdownProps } from './type'
import { getMermaid } from './hooks/load-mermaid'

const IndexEditorMd = defineAsyncComponent(() => import('./index2.vue'))

defineOptions({
  name: 'EditorMdIndexComponent'
})

const emit = defineEmits(editorMarkdownEmits)
const props = defineProps(editorMarkdownProps)

const attrs = useAttrs()
const mergeAttrs = computed(() => {
  return { ...attrs, ...props }
})

const refEditor = ref<any>(null)

defineExpose({
  get refEditor() {
    return refEditor.value?.refEditor
  }
})
</script>
