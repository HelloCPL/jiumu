<!--
  @describe: 笔记列表页面
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
    size="35%"
    :z-index="100"
    :close-on-click-modal="false"
    title="笔记"
    custom-class="novel-note-container"
    :with-header="true"
  >
    哈哈sdfsdf是的是的
    <NoteAdd></NoteAdd>
  </ElDrawer>
</template>

<script lang="ts" setup>
import { ElButton, ElDrawer } from 'element-plus'
import { ref } from 'vue'
import NoteAdd from './NoteAdd.vue'

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
    border-bottom: 1px solid var(--jm-color-border);
    color: var(--jm-color-text);
  }
}
</style>
