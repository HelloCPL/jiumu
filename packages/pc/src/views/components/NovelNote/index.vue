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
    title="笔记"
    custom-class="novel-note-container"
    :with-header="true"
  >
    哈哈
    <NoteList></NoteList>
  </ElDrawer>
</template>

<script lang="ts" setup>
import { ElButton, ElDrawer } from 'element-plus'
import { ref } from 'vue'
import NoteList from './components/NoteList.vue'

const isShow = ref(false)
const handleShow = () => {
  isShow.value = !isShow.value
}
</script>

<style lang="scss">
.novel-note-container {
  .el-drawer__header {
    margin-bottom: 0;
    padding-bottom: var(--el-drawer-padding-primary);
    border-bottom: 1px solid var(--jm-color-border-lighter);
    color: var(--jm-color-text);
  }
}
</style>
