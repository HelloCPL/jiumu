<!--
  @cpl
  @create 2024-09-01 12:01:04
  @parameter 笔记组件
-->

<template>
  <Container :total="total" @open="isShow = true"></Container>
  <NoteList :root-id="rootId" :target-id="targetId" :title="title" v-if="isShow" @close="handleClose">
  </NoteList>
</template>

<script setup lang="ts">
import { noteProps } from './type'
import Container from './components/Container.vue'
import NoteList from './components/NoteList.vue'
import { onMounted, ref } from 'vue'
import { getNoteList } from '@/api/note'

const props = defineProps(noteProps)

const isShow = ref(false)

const total = ref(0)
const getTotal = async () => {
  const res = await getNoteList({
    pageNo: 1,
    pageSize: 1,
    targetId: props.targetId as string
  })
  if (res.code === 200) {
    total.value = res.total
  }
}
onMounted(getTotal)
const handleClose = () => {
  getTotal()
  isShow.value = false
}
</script>
