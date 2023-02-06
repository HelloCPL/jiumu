<!--
  @describe: 笔记页面
  @author: cpl
  @create: 2023-02-05 19:11:35
-->

<template>
  <ElButton type="primary" size="small" text @click="handleShow">查看笔记</ElButton>
  <!-- 弹窗 -->
  <ElDrawer
    v-model="isShow"
    append-to-body
    destroy-on-close
    size="70%"
    :z-index="99"
    :close-on-click-modal="false"
    :title="_title"
    custom-class="novel-note-container"
    :with-header="true"
  >
    <NoteList :id="id"></NoteList>
  </ElDrawer>
</template>

<script lang="ts" setup>
import { ElButton, ElDrawer } from 'element-plus'
import { ref, computed } from 'vue'
import NoteList from './components/NoteList.vue'
import { novelNoteProps } from './type'

const props = defineProps(novelNoteProps)

const isShow = ref(false)
const handleShow = () => {
  isShow.value = !isShow.value
}

const _title = computed(() => {
  if (props.title) return `笔记列表(${props.title})`
  return '笔记列表'
})
</script>

<style lang="scss">
.novel-note-container {
  .el-drawer__header {
    margin-bottom: 0;
    padding-bottom: var(--el-drawer-padding-primary);
    border-bottom: 1px solid var(--jm-color-border);
    color: var(--jm-color-text);
  }

  .el-drawer__body {
    padding: 0;
    overflow: hidden;
  }
}
</style>
