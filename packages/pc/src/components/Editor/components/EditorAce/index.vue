<!--
  @author cpl
  @create 2026-04-10 17:00:44
  @description ace-builds 代码编辑器 入口
-->

<template>
  <LazyLoader :preload-resources="preloadResources">
    <IndexEditorAce
      ref="refEditor"
      v-bind="mergeAttrs"
      @update:model-value="(...args) => emit('update:modelValue', ...args)"
      @change="(...args) => emit('change', ...args)"
      @save="(...args) => emit('save', ...args)"
      @blur="(...args) => emit('blur', ...args)"
      @focus="(...args) => emit('focus', ...args)"
    ></IndexEditorAce>
  </LazyLoader>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, ref, useAttrs } from 'vue'
import LazyLoader from '../../../LazyLoader/index.vue'
import { editorAceProps, editorAceEmits } from './type'

defineOptions({
  name: 'EditorAceIndexComponent'
})

const IndexEditorAce = defineAsyncComponent(() => import('./index2.vue'))

const emit = defineEmits(editorAceEmits)
const props = defineProps(editorAceProps)

const preloadResources = async () => {
  const res = await import('./hooks/load-ace')
  if (res?.loadAceLang) {
    res.loadAceLang(props.lang)
  }
  if (res?.loadAceTheme) {
    res.loadAceTheme(props.theme)
  }
}

const attrs = useAttrs()
const mergeAttrs = computed(() => {
  return { ...attrs, ...props }
})

const refEditor = ref<any>(null)

defineExpose({
  get refEditor() {
    return refEditor.value?.refEditor
  },
  get beautify() {
    return refEditor.value?.beautify
  }
})
</script>

<style lang="scss" scoped></style>
