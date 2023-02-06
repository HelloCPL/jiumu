<!--
  @describe: 笔记添加
  @author: cpl
  @create: 2023-02-05 23:47:03
-->

<template>
  <!-- 弹窗 -->
  <ElDrawer
    v-model="isShow"
    append-to-body
    destroy-on-close
    size="35%"
    :z-index="99"
    :close-on-click-modal="false"
    :title="id ? '笔记新增' : '笔记编辑'"
    custom-class="novel-note-container"
    :with-header="true"
    :before-close="beforeClose"
  >
    <div class="w-full flex-1 pt-4 pl-4 g-scroll-y">还是说</div>
  </ElDrawer>
</template>

<script lang="ts" setup>
import { ElDrawer, ElFormItem, ElInput, ElButton, ElTag } from 'element-plus'
import { novelNoteProps, novelNoteEmit } from '../type'
import { useAdd } from '../hooks/use-add'

const props = defineProps(novelNoteProps)
const emit = defineEmits(novelNoteEmit)

const { isShow, beforeClose } = useAdd(props, emit)
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
