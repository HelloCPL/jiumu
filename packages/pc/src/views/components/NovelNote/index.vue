<!--
  @describe: 笔记页面
  @author: cpl
  @create: 2023-02-05 19:11:35
-->

<template>
  <ElButton type="primary" size="small" text @click="handleShow">查看笔记</ElButton>
  <NoteList :id="id" :title="title" v-if="isShow" @close="isShow = false"></NoteList>
</template>

<script lang="ts" setup>
import { ElButton } from 'element-plus'
import { ref } from 'vue'
import NoteList from './components/NoteList.vue'
import { novelNoteProps } from './type'

defineProps(novelNoteProps)

const isShow = ref(false)
const handleShow = () => {
  isShow.value = !isShow.value
}
</script>
