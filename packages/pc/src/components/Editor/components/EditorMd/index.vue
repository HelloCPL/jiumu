<template>
  <Index2 v-if="show" v-bind="$attrs"></Index2>
</template>

<script setup lang="ts">
import Index2 from './index2.vue'
import { ref } from 'vue'
import { useMarkdownInit } from '@/components/Editor/components/EditorMd/hooks/use-markdown-init'

const show = ref(false)

const loadMermaid = () => {
  if (window._initMarkdownMermaidStart) return
  import('../../../../assets/lib/mermaid.min.js')
  window._initMarkdownMermaidStart = '1'
}
loadMermaid()

let count = 0
const judgeMermaid = async () => {
  if (window.mermaid?.initialize) {
    const createMermaidPlugin = await import('@kangc/v-md-editor/lib/plugins/mermaid/cdn')
    if (createMermaidPlugin && createMermaidPlugin.default) {
      useMarkdownInit(createMermaidPlugin.default)
    }
    show.value = true
  } else if (count < 10) {
    count++
    setTimeout(() => {
      judgeMermaid()
    }, 200)
  }
}
judgeMermaid()
</script>
