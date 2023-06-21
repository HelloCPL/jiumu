<template>
  <IndexPreview v-if="show" v-bind="$attrs"></IndexPreview>
</template>

<script setup lang="ts">
import IndexPreview from './index2.vue'
import { ref } from 'vue'
import { useMarkdownInit } from '@/components/Editor/components/EditorMd/hooks/use-markdown-init'
import '@/assets/lib/mermaid.min.js'

const show = ref(false)

let count = 0
const judgeMermaid = async () => {
  if (window.mermaid?.initialize || count >= 50) {
    const createMermaidPlugin = await import('@kangc/v-md-editor/lib/plugins/mermaid/cdn')
    if (createMermaidPlugin && createMermaidPlugin.default) {
      useMarkdownInit(createMermaidPlugin.default)
    }
    show.value = true
  } else if (count < 50) {
    count++
    setTimeout(() => {
      judgeMermaid()
    }, 400)
  }
}
judgeMermaid()
</script>
