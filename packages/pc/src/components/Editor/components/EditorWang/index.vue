<template>
  <LazyLoader>
    <IndexEditorWang
      v-bind="mergeAttrs"
      @update:model-value="(...args) => emit('update:modelValue', ...args)"
      @change="(...args) => emit('change', ...args)"
      @save="(...args) => emit('save', ...args)"
      @blur="(...args) => emit('blur', ...args)"
      @focus="(...args) => emit('focus', ...args)"
    ></IndexEditorWang>
  </LazyLoader>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, useAttrs } from 'vue'
import LazyLoader from '@/components/LazyLoader/index.vue'
import { editorWangEmits, editorWangProps } from './type'
const IndexEditorWang = defineAsyncComponent(() => import('./index2.vue'))

const emit = defineEmits(editorWangEmits)
const props = defineProps(editorWangProps)

const attrs = useAttrs()
const mergeAttrs = computed(() => {
  return { ...attrs, ...props }
})
</script>
