<template>
  <LazyLoader :preload-resources="loadMermaid">
    <IndexEditorMd
      v-bind="mergeAttrs"
      @update:model-value="(...args) => emit('update:modelValue', ...args)"
      @change="(...args) => emit('change', ...args)"
      @save="(...args) => emit('save', ...args)"
    ></IndexEditorMd>
  </LazyLoader>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, useAttrs } from 'vue'
import LazyLoader from '@/components/LazyLoader/index.vue'
import { loadMermaid } from '@/utils/scripts'
import { editorMarkdownEmits, editorMarkdownProps } from './type'

const IndexEditorMd = defineAsyncComponent(() => import('./index2.vue'))

const emit = defineEmits(editorMarkdownEmits)
const props = defineProps(editorMarkdownProps)

const attrs = useAttrs()
const mergeAttrs = computed(() => {
  return { ...attrs, ...props }
})
</script>
