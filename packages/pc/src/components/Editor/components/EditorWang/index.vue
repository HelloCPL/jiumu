<template>
  <LazyLoader>
    <IndexEditorWang
      ref="refEditor"
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
import { computed, defineAsyncComponent, ref, useAttrs } from 'vue'
import LazyLoader from '../../../LazyLoader/index.vue'
import { editorWangEmits, editorWangProps } from './type'

const IndexEditorWang = defineAsyncComponent(() => import('./index2.vue'))

defineOptions({
  name: 'EditorWangIndexComponent'
})

const emit = defineEmits(editorWangEmits)
const props = defineProps(editorWangProps)

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
