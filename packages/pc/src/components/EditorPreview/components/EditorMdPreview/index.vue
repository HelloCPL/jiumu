<template>
  <IndexPreview v-if="show" v-bind="$attrs"></IndexPreview>
</template>

<script setup lang="ts">
import IndexPreview from './preview.vue'
import { ref } from 'vue'
import { useMarkdownInit } from '@/components/Editor/components/EditorMd/hooks/use-markdown-init'
import { loadMermaid } from '@/utils/scripts'

const show = ref(false)

const judgeMermaid = async () => {
  if (window.mermaid?.initialize) {
    const createMermaidPlugin = await import('@kangc/v-md-editor/lib/plugins/mermaid/cdn')
    if (createMermaidPlugin && createMermaidPlugin.default) {
      useMarkdownInit(createMermaidPlugin.default)
    }
    show.value = true
  } else {
    await loadMermaid()
    setTimeout(() => {
      judgeMermaid()
    }, 100)
  }
}
judgeMermaid()
</script>
