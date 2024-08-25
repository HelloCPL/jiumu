<template>
  <IndexPreview v-if="show" v-bind="$attrs"></IndexPreview>
</template>

<script setup lang="ts">
import IndexPreview from './preview.vue'
import { ref } from 'vue'
import { useMarkdownInit } from '@/components/Editor/components/EditorMd/hooks/use-markdown-init'
import { loadMermaid } from '@/utils/scripts'
import { useLoading } from '@/utils/interaction'

const show = ref(false)

const initMermaid = async () => {
  const createMermaidPlugin = await import('@kangc/v-md-editor/lib/plugins/mermaid/cdn')
  if (createMermaidPlugin && createMermaidPlugin.default) {
    useMarkdownInit(createMermaidPlugin.default)
  }
  show.value = true
}

const { showLoading, hideLoading } = useLoading()
const load = async () => {
  if (window.mermaid?.initialize) {
    initMermaid()
  } else {
    showLoading()
    await loadMermaid()
    hideLoading()
    initMermaid()
  }
}
load()
</script>
