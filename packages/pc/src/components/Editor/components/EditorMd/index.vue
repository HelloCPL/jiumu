<template>
  <IndexEditor v-if="show" v-bind="$attrs"></IndexEditor>
</template>

<script setup lang="ts">
import IndexEditor from './index2.vue'
import { ref } from 'vue'
import { useMarkdownInit } from '@/components/Editor/components/EditorMd/hooks/use-markdown-init'
import '@/assets/lib/mermaid.min.js'

const show = ref(false)

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
