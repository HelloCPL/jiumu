<!--
  @cpl
  @create 2024-09-01 12:01:04
  @parameter 笔记组件
-->

<template>
  <Container :total="10" @open="isShow = true"></Container>
  <NoteList :root-id="rootId" :target-id="targetId" :title="title" v-if="isShow" @close="isShow = false">
  </NoteList>
</template>

<script setup lang="ts">
import { noteProps } from './type'
import Container from './components/Container.vue'
import NoteList from './components/NoteList.vue'
import { ref } from 'vue'

defineProps(noteProps)

const isShow = ref(false)
</script>

