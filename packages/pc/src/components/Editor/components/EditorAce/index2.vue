<!--
  @author cpl
  @create 2026-04-10 17:00:44
  @description ace-builds 代码编辑器
-->

<template>
  <div class="w-full border-1 bg-white" :class="{ 'editor-ace-container-fullscreen': isFullScreen }">
    <AceHeader
      :lang="_lang"
      :theme="_theme"
      :is-full-screen="isFullScreen"
      :readonly="readonly"
      @changeLang="changeLang"
      @changeTheme="changeTheme"
      @beautify="beautify"
      @copy="copy(modelValue)"
      @toggleFullScreen="toggleFullScreen"
      v-if="showHeader"
    ></AceHeader>
    <VAceEditor
      :value="modelValue"
      :style="{ height: getHeight }"
      :lang="_lang"
      :theme="_theme"
      :readonly="readonly"
      :options="_options"
      @update:value="updateValue"
      @blur="blur"
      @focus="focus"
      @init="init"
      @keydown="keydown"
    >
    </VAceEditor>
  </div>
</template>

<script setup lang="ts">
import { VAceEditor } from 'vue3-ace-editor'
import { editorAceProps, editorAceEmits } from './type'
import { useIndex } from './hooks/use-index'
import { computed } from 'vue'

import AceHeader from './components/AceHeader.vue'
import { useClipboardy } from '@jiumu/utils'

defineOptions({
  name: 'EditorAceIndex2Component'
})

const props = defineProps(editorAceProps)
const emit = defineEmits(editorAceEmits)

const {
  refEditor,
  _lang,
  _theme,
  _options,
  changeLang,
  changeTheme,
  init,
  beautify,
  updateValue,
  blur,
  focus,
  keydown,
  isFullScreen,
  toggleFullScreen
} = useIndex(props, emit)

const getHeight = computed(() => {
  if (isFullScreen.value) return 'calc(100vh - 45px)'
  if (props.showHeader) {
    let h = props.height - 45
    h = h < 200 ? 200 : h
    return `${h}px`
  } else {
    let h = props.height
    h = h < 200 ? 200 : h
    return `${h}px`
  }
})

const { copy } = useClipboardy()

defineExpose({
  refEditor,
  beautify
})
</script>

<style lang="scss" scoped>
.editor-ace-container-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99999;
}
</style>
